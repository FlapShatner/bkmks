import { useEffect, useState } from 'react'
import { BiSubdirectoryRight } from 'react-icons/bi'
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
            {show ? <AiFillCaretDown /> : <AiFillCaretRight />}
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
  // function addHasFolders(bookmarks) {
  //   bookmarks.forEach((bookmark) => {
  //     bookmark.children && bookmark.children.some((child) => child.children) ? (bookmark.hasFolders = true) : (bookmark.hasFolders = false)
  //     bookmark.children && addHasFolders(bookmark.children)
  //   })
  // }

  // useEffect(() => {
  //   addHasFolders(bookmarks)
  // }, [bookmarks])

  return (
    <div className={s.sidebar}>
      <h1>BKMKS</h1>

      <div className={s.list}>
        {bookmarks.map((bookmark) => {
          return <Folder folderClick={onFolderClick} key={bookmark.id} bookmark={bookmark} />
        })}
      </div>
    </div>
  )
}

export default Sidebar
