import { useState } from 'react'
import s from './Sidebar.module.css'

function Folder({ bookmark }) {
  const { id, title, children } = bookmark
  return (
    <div id={id} className={s.folder}>
      {children && (
        <div>        
          <h2>{title}</h2>
          {children.map((child) => {
            return <Folder bookmark={child} />
          })}
          
        </div>
      )}
    </div>
  )
}

function Sidebar({ bookmarks }) {
  return (
    <div className={s.sidebar}>
      <h1>BKMKS</h1>
      {bookmarks.map((bookmark) => {
        return <Folder key={bookmark.id} bookmark={bookmark} />
      })}
    </div>
  )
}

export default Sidebar
