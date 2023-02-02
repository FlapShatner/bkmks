import s from './Window.module.css'
import { TbCaretRight,TbLink } from 'react-icons/tb'
import {FaFolderOpen,FaFolder} from 'react-icons/fa'


function Window({ subTree, onFolderClick, parents }) {
  const { id, title, children, parentId } = subTree

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
        <div className={s.crumbs}>
          {parents.map((parent, i) => (
            <div className={s.crumb}>
              {i !== parents.length - 1 &&  <TbCaretRight /> }
              <p onClick={() => handleClick(parent.id)} key={parent.id}>{parent.title}</p>
            </div>
          ))}
        </div>
        
        
        <h2><FaFolderOpen />{title}</h2>
        
      </div>
      {id != '1' &&
        folders.length > 0 &&
        folders.map((folder) => (
          <div className={s.folder} key={folder.id}>
            <h3 onClick={() => handleClick(folder.id)}><FaFolder size=".75rem" /> {folder.title}</h3>
          </div>
        ))}
        
      {links.map((child) => (
        <div className={s.link} key={child.id}>
       
          <a href={child.url}> <TbLink /> {child.title} </a>
        </div>
      ))}
      
    </div>
  )
}

export default Window
