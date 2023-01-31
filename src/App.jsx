import { useEffect, useState } from 'react'
import s from './App.module.css'
import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [folderId, setFolderId] = useState('1')
  const [subTree, setSubTree] = useState([])

  useEffect(() => {
    chrome.bookmarks.getTree((bookmarks) => {
      setBookmarks(bookmarks[0].children)
    })
    
  }, [])

  function getSubTree(id) {
    chrome.bookmarks.getSubTree(id, (subTree) => {
      setSubTree(subTree[0])
    })
    console.log('subTree: ', subTree)
  }

  useEffect(() => {
    getSubTree(folderId)
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

  return (
    <div className={s.container}>
      <Sidebar onFolderClick={(id) => onFolderClick(id)} bookmarks={bookmarks} />
      <Window subTree={subTree} />
    </div>
  )
}

export default App
