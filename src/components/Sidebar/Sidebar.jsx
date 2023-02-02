import { useEffect, useMemo } from 'react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { atom, useAtom } from 'jotai'
import { bookmarksAtom, folderIdAtom, clickedAtom, updateIdAtom, pointsAtom } from '../../state/atoms'

import s from './Sidebar.module.css'

function Folder({ bookmark }) {
  const showAtom = useMemo(() => (bookmark.id === '1' ? atom(true) : atom(false)), [bookmark.id])
  const [show, setShow] = useAtom(showAtom)
  const [, setFolderId] = useAtom(folderIdAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [, setUpdateId] = useAtom(updateIdAtom)
  const [points, setPoints] = useAtom(pointsAtom)

  const { id, title, children } = bookmark

  function handleClick(e) {
    e.stopPropagation()
    setFolderId(id)
    setShow(!show)
  }

  function onRightClick(e) {
    e.preventDefault()
    e.stopPropagation()
    setClicked(true)
    setUpdateId(e.currentTarget.id)
    setPoints({ x: e.clientX, y: e.clientY })
    console.log(points)
  }

  return (
    <div className={s.folder}>
      <div id={id} onContextMenu={onRightClick} onClick={handleClick} className={s.title}>
        {bookmark.hasFolders && (
          <div>
            <div className={s.caret}>{show ? <AiFillCaretDown /> : <AiFillCaretRight />}</div>
          </div>
        )}

        <h2>{title}</h2>
      </div>
      {show &&
        children.map((child) => {
          if (child.children) return <Folder key={child.id} bookmark={child} />
        })}
    </div>
  )
}

function Sidebar() {
  const [bookmarks] = useAtom(bookmarksAtom)
  return (
    <div className={s.sidebar}>
      <div className={s.list}>
        {bookmarks.map((bookmark) => {
          if (bookmark.children) {
            return <Folder key={bookmark.id} bookmark={bookmark} />
          } else {
            return
          }
        })}
      </div>
    </div>
  )
}

export default Sidebar
