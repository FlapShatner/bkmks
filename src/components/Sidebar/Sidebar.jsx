import { useEffect, useMemo, useRef } from 'react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { BiCheckSquare, BiCheck } from 'react-icons/bi'
import { atom, useAtom } from 'jotai'
import { bookmarksAtom, folderIdAtom, clickedAtom, updateIdAtom, pointsAtom, renameAtom, isFolderAtom } from '../../state/atoms'

import s from './Sidebar.module.css'

function Folder({ bookmark, onRename }) {
  const showAtom = useMemo(() => (bookmark.id === '1' ? atom(true) : atom(false)), [bookmark.id])
  const newNameAtom = useMemo(() => atom(bookmark.title), [bookmark.title])
  const [show, setShow] = useAtom(showAtom)
  const [, setFolderId] = useAtom(folderIdAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [, setUpdateId] = useAtom(updateIdAtom)
  const [, setPoints] = useAtom(pointsAtom)
  const [rename, setRename] = useAtom(renameAtom)
  const [newName, setNewName] = useAtom(newNameAtom)
  const [, setIsFolder] = useAtom(isFolderAtom)

  const { id, title, children } = bookmark

  function handleClick(e) {
    e.stopPropagation()
    setFolderId(id)
  }

  function handleCaretClick(e) {
    e.stopPropagation()
    setShow(!show)
  }

  function onRightClick(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsFolder(true)
    setClicked(true)
    setUpdateId(e.currentTarget.id)
    setPoints({ x: e.clientX, y: e.clientY })
  }

  function handleRename(e) {
    e.preventDefault()
    onRename(newName)
    setRename(false)
  }

  const isRename = rename && updateId === id

  return (
    <div className={s.folder}>
      <div id={id} onContextMenu={onRightClick} onClick={!isRename && handleClick} className={s.title}>
        {bookmark.hasFolders && (
          <div>
            <div onClick={handleCaretClick} className={s.caret}>
              {show ? <AiFillCaretDown /> : <AiFillCaretRight />}
            </div>
          </div>
        )}
        {isRename ? (
          <form onSubmit={handleRename} className={s.rename}>
            <input autoFocus onChange={(e) => setNewName(e.target.value)} onBlur={() => setRename(false)} value={newName} type='text' />
            <button type='submit'>
              <BiCheck size={'2rem'} />
            </button>
          </form>
        ) : (
          <h2>{title}</h2>
        )}
      </div>
      {show &&
        children.map((child) => {
          if (child.children) return <Folder key={child.id} onRename={onRename} bookmark={child} />
        })}
    </div>
  )
}

function Sidebar({ onRename }) {
  const [bookmarks] = useAtom(bookmarksAtom)

  return (
    <div className={s.sidebar}>
      <div className={s.logo}>
        <h1>BKMKS</h1>
      </div>
      <div className={s.list}>
        {bookmarks.map((bookmark) => {
          if (bookmark.children) {
            return <Folder key={bookmark.id} onRename={onRename} bookmark={bookmark} />
          } else {
            return
          }
        })}
      </div>
    </div>
  )
}

export default Sidebar
