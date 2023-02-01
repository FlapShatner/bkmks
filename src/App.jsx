import { useEffect, useState } from 'react'
import s from './App.module.css'
import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'
import Breadcrumbs from './components/Breadcrumbs'

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [folderId, setFolderId] = useState('1') 
  const [subTree, setSubTree] = useState([])
  const [parents, setParents] = useState([])
  const parentsArr = []
  

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
    getParents(folderId)
  }, [folderId])

  function getParents(id){
    chrome.bookmarks.get(id, (parent) => {
      parentsArr.push({id: parent[0].id, title: parent[0].title, parentId: parent[0].parentId})    
      setParents(parentsArr) 
      parent[0].parentId && getParents(parent[0].parentId)
   })
  }

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
      <div className={s.window}>
      <Window onFolderClick={(id) => onFolderClick(id)}  subTree={subTree} />
      <Breadcrumbs parents={parents} subTree={subTree} />
      </div>
    </div>
  )
}

export default App
