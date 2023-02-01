import s from './Window.module.css'
import { useState, useEffect } from 'react'

function Window({ subTree, onFolderClick }) {
 
  
  const { title, children, parentId } = subTree

 

  

  if (!subTree.children) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  const folders = children.filter((child) => child.children)
  const links = children.filter((child) => !child.children)

  function handleClick(id) {
    onFolderClick(id)
  }
  
  return (
    <div className={s.window}>
      <div className={s.bookmarks}>
        
        <h2>{title}</h2>
        {folders.length > 0 &&
          folders.map((folder) => (
            <div className={s.folder} key={folder.id}>
              <h3 onClick={() => handleClick(folder.id)}>{folder.title}</h3>
            </div>
          ))}
        {links.map((child) => (
          <div className={s.link} key={child.id}>
            <a href={child.url}>{child.title}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Window
