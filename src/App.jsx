import { useEffect, useState, useCallback } from 'react'
import s from './App.module.css'
import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header'
import FolderContext from './components/FolderContext'
import useContextMenu from './hooks/useContextMenu'

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [folderId, setFolderId] = useState('1')
  const [subTree, setSubTree] = useState([])
  const [parents, setParents] = useState([])
  const[updateId, setUpdateId] = useState('')
 const { clicked, setClicked, points, setPoints } = useContextMenu()

  const bookmarksCb = useCallback(() => {
    chrome.bookmarks.getTree((bookmarks) => {
      setBookmarks(bookmarks[0].children)
      addHasFolders(bookmarks[0].children)
    })
  })

  const subTreeCb = useCallback(() => {
    chrome.bookmarks.getSubTree(folderId, (subTree) => {
      setSubTree(subTree[0])
    })
  }, [folderId])

  const parentCb = useCallback((bookmarks, id) => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].id == id) {
        return bookmarks[i]
      } else if (bookmarks[i].children != null) {
        let result = parentCb(bookmarks[i].children, id)
        if (result != null) {
          return result
        }
      }
    }
    return null
  })

  // console.log("parentCb: ", parentCb(bookmarks, folderId))

  useEffect(() => {
    bookmarksCb()
    subTreeCb()
    findParents(folderId)
  }, [folderId])

  function onFolderClick(id) {
    setFolderId(id)
  }

  function addHasFolders(bookmarks) {
    bookmarks.forEach((bookmark) => {
      bookmark.children && bookmark.children.some((child) => child.children) ? (bookmark.hasFolders = true) : (bookmark.hasFolders = false)
      bookmark.children && addHasFolders(bookmark.children)
    })
  }

  useEffect(() => {
    addHasFolders(bookmarks)
  }, [bookmarks])


  const parentsArr = []

  function findParents(id) {    
    const parent = parentCb(bookmarks, id)
    if (parent?.id) {
     parentsArr.push( { id: parent.id, title: parent.title })
     setParents(parentsArr)
      findParents(parent.parentId)
    }    
  }

  function click(points){
  setClicked(true)
  setPoints({x: points.x, y: points.y})
  setUpdateId(points.id.toString()) 
  console.log("updateId: ", updateId)
  }

  function onDelete(){
    chrome.bookmarks.remove(updateId, () => {
      setClicked(false)
      bookmarksCb()
      subTreeCb()
    })
  }
  
  return (
    <div className={s.main}>
      <Header />
      <div className={s.container}>
        <Sidebar onFolderClick={(id) => onFolderClick(id)} bookmarks={bookmarks}  click={(points) => click(points)}/>
        <Window onFolderClick={(id) => onFolderClick(id)} subTree={subTree} parents={parents} />
      </div>
      {clicked && <FolderContext onDelete={onDelete} points={points} />}
    </div>
  )
}

export default App
