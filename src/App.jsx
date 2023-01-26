import { useEffect, useState } from 'react'
import './App.css'


function Node({ bookmark }) {
  const [show, setShow] = useState(true)

  const {id, title, url, children} = bookmark
  const isFolder = children && children.length > 0

  return (   

    <div id={id} key={id} className='child'>
      {isFolder ?
        <div className='folder'>
      <h2>{title}</h2>  
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && bookmark.children.map((child) => {
        return <Node bookmark={child} /> 
      })}
      </div>:
    <div className='bookmark'>
      <h3>{title}</h3>
    </div>
    }

    </div>
  )
}

function App() { 
  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
    chrome.bookmarks.getTree((bookmarks) => {
      setBookmarks(bookmarks[0].children)
    })
  }, [])


  return (
    
      <div>
        <h1>BKMKS</h1>
        {bookmarks.map((bookmark) => {
          return (
            <Node bookmark={bookmark} />
          )
        })}
      </div>
    
  )
}

export default App
