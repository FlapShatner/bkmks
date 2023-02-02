import { useEffect, useState } from 'react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'

import s from './Sidebar.module.css'

function Folder({ bookmark, folderClick, click }) {
  const [show, setShow] = useState(false)
  const { id, title, children } = bookmark
  useEffect(() => {
    if (bookmark.parentId == '0') {
      setShow(true)
    }
  }, [])

  function handleClick(e) {
    e.stopPropagation()
    folderClick(id)
    setShow(!show)
  }

  function onRightClick(e) {
    e.preventDefault()
    e.stopPropagation()
    click({ x: e.clientX, y: e.clientY, id: e.currentTarget.id } )
  }

  return (
    <div  className={s.folder}>
      <div id={id} onContextMenu={onRightClick} onClick={handleClick} className={s.title}>
        {bookmark.hasFolders && (
          <div onClick={folderClick}>
            <div className={s.caret}>{show ? <AiFillCaretDown /> : <AiFillCaretRight />}</div>
          </div>
        )}

        <h2>{title}</h2>
      </div>
      {show &&
        children.map((child) => {
          if (child.children) return <Folder key={child.id} click={click} folderClick={folderClick} bookmark={child} />
        })}
    </div>
  )
}

function Sidebar({ bookmarks, onFolderClick, click }) {

  return (
    <div className={s.sidebar}>
      <div className={s.list}>
        {bookmarks.map((bookmark) => {
          if (bookmark.children) {
            return <Folder folderClick={onFolderClick} key={bookmark.id} bookmark={bookmark} click={click} />
          } else {
            return
          }
        })}
      </div>
    </div>
  )
}

export default Sidebar
