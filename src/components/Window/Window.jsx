import s from './Window.module.css'
import { useState, useEffect } from 'react'

function Window({ subTree, onFolderClick }) {
  const { id, title, children, parentId } = subTree
  const [prevFolder, setPrevFolder] = useState({})

  useEffect(() => {
  parentId && chrome.bookmarks.get(parentId, (parent) => {
    setPrevFolder(parent[0])
  })}, [parentId])

  console.log('prevFolder: ', prevFolder)
  

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
      
      <div className={s.header}>
        <h2>{title}</h2>

      {prevFolder.id!== '0'&& <button onClick={() => handleClick(prevFolder.id)}>Back To {prevFolder.title}</button>}

      </div>
      {id != "1" && folders.length > 0 &&
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
  )
}

export default Window
