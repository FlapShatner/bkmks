import { useEffect, useState } from 'react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import s from './Sidebar.module.css'

function Folder({ bookmark, folderClick }) {
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
  }

  return (
    <div onClick={handleClick} id={id} className={s.folder}>
      {children && (
        <div>
          <div className={s.title}>
            {bookmark.hasFolders && <div onClick={() => setShow(!show)}>
            <div className={s.caret}>
            {show ?            
            <AiFillCaretDown /> : <AiFillCaretRight />            
            }
            </div>
            </div>}

            <h2>{title}</h2>
          </div>
          {show &&
            children.map((child) => {
              return <Folder key={child.id} folderClick={folderClick} bookmark={child} />
            })}
        </div>
      )}
    </div>
  )
}

function Sidebar({ bookmarks, onFolderClick }) {
 

  return (
    <div className={s.sidebar}>
      

      <div className={s.list}>
        {bookmarks.map((bookmark) => {
          return <Folder folderClick={onFolderClick} key={bookmark.id} bookmark={bookmark} />
        })}
      </div>
    </div>
  )
}

export default Sidebar
