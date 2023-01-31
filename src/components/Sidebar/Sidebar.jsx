import { useEffect, useState } from 'react'
import {BiSubdirectoryRight} from 'react-icons/bi'
import {AiFillCaretDown,AiFillCaretRight } from 'react-icons/ai'
import s from './Sidebar.module.css'

function Folder({ bookmark }) {
  const [show, setShow] = useState(false)
  const { id, title, children } = bookmark
  useEffect(() => {
    if(bookmark.parentId == "0"){
      setShow(true)
    }
  }, [])
  return (
    <div id={id} className={s.folder}>
    
      {children && (
        <div>
        <div onClick={() => setShow(!show)} className={s.title}>
        {bookmark.hasFolders && (show ? <AiFillCaretDown /> : <AiFillCaretRight />)} 
          <h2>{title}</h2>
          </div>
          {show && children.map((child) => {
            return (
              <Folder key={child.id} bookmark={child} />
              )
          })}
          
        </div>
      )}
    </div>
  )
}

function Sidebar({ bookmarks }) {

  function addHasFolders(bookmarks) {
    bookmarks.forEach((bookmark) => {
      bookmark.children && bookmark.children.some((child) => child.children) ? (bookmark.hasFolders = true) : (bookmark.hasFolders = false)
      bookmark.children &&
      addHasFolders(bookmark.children)
    })
    
  }
  
  useEffect(() => {
    addHasFolders(bookmarks)
  }, [bookmarks])

  console.log(bookmarks)
 
  return (
    <div className={s.sidebar}>
      <h1>BKMKS</h1>
      <div className={s.list}>
      {bookmarks.map((bookmark) => {
        return <Folder key={bookmark.id} bookmark={bookmark} />
      })}
      </div>
    </div>
  )
}

export default Sidebar
