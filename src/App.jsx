import { useEffect, useState } from 'react'
import s from './App.module.css'
import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'


function App() {
  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
    chrome.bookmarks.getTree((bookmarks) => {
      setBookmarks(bookmarks[0].children)
    })
  }, [])

  return (
    <div className={s.container}>
      <Sidebar bookmarks={bookmarks} />
      <Window />
    </div>
  )
}

export default App
