import { useEffect, useState } from 'react'
import s from './App.module.css'
import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'


function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [folderId, setFolderId] = useState('1')
  const [curFolder, setCurFolder] = useState({})
  const [curChildren, setCurChildren] = useState([])
  useEffect(() => {
    chrome.bookmarks.getTree((bookmarks) => {      
      setBookmarks(bookmarks[0].children)
    })
  }, [])
  console.log("bookmarks: ", bookmarks)

  function getBookmark(id) {
    chrome.bookmarks.get(id, (bookmark) => {      
      setCurFolder(bookmark)
    })
  }

  function getChildren(id) {
    chrome.bookmarks.getChildren(id, (children) => {
      setCurChildren(children)
    })
  }

  


  useEffect(() => {
    
    getBookmark(folderId)
    getChildren(folderId)    
    console.log("curFolder: ", curFolder)
  },[folderId])

  async function onFolderClick(id) {
    console.log("id: ", id)
   setFolderId(id)
  }
  



  return (
    <div className={s.container}>
    
      <Sidebar onFolderClick={(id) => onFolderClick(id)} bookmarks={bookmarks} />
       <Window curChildren={curChildren} curFolder={curFolder} />
    </div>
  )
}

export default App
