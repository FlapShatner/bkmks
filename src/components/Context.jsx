import { forwardRef, useEffect, useMemo } from 'react'
import s from './Context.module.css'
import { TbEdit, TbTrash, TbExternalLink } from 'react-icons/tb'
import { FaFolderOpen } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { pointsAtom, folderIdAtom, updateIdAtom, deleteConfirmAtom, renameAtom, clickedAtom, isFolderAtom, editAtom, currentAtom } from '../state/atoms'

const Context = forwardRef(function Context({ onEdit }, ctxRef) {
  const [points] = useAtom(pointsAtom)
  const [, setRename] = useAtom(renameAtom)
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [, setFolderId] = useAtom(folderIdAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [isFolder] = useAtom(isFolderAtom)
  const [edit, setEdit] = useAtom(editAtom)
  const [current, setCurrent] = useAtom(currentAtom)

  useEffect(() => {
    setEdit(false)
  }, [])

  useEffect(() => {
    chrome.bookmarks.get(updateId, (bookmark) => {
      if (bookmark[0]) {
        setCurrent(bookmark[0])
      }
    })
  }, [])

  function handleDelete() {
    setDeleteConfirm(true)
  }

  function handleRename() {
    setRename(true)
    setClicked(false)
  }

  function handleEdit(e) {
    e.preventDefault()
    onEdit({ title: current.title, url: current.url })
  }

  function navigate() {
    chrome.bookmarks.get(updateId, (bookmark) => {
      if (bookmark[0].url) {
        chrome.tabs.create({ url: bookmark[0].url })
      }
      setClicked(false)
    })
  }

  const display = deleteConfirm ? 'none' : 'block'

  return (
    <div ref={ctxRef} style={{ top: points.y, left: points.x }} className={s.wrapper}>
      <div style={{ display: display }} className={s.container}>
        {!edit ? (
          <div>
            {isFolder ? (
              <span onClick={handleRename}>
                <TbEdit /> Rename
              </span>
            ) : (
              <span onClick={() => setEdit(true)}>
                <TbEdit /> Edit
              </span>
            )}

            <span onClick={handleDelete}>
              <TbTrash /> Delete
            </span>
            <span className={s.rule}></span>
            {isFolder ? (
              <span onClick={() => setFolderId(updateId)}>
                <FaFolderOpen /> Explore
              </span>
            ) : (
              <span onClick={navigate}>
                <TbExternalLink /> Open in new tab
              </span>
            )}
          </div>
        ) : (
          <div className={s.edit}>
            <form>
              <div>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' id='title' value={current.title} onChange={(e) => setCurrent({ ...current, title: e.target.value })} />
              </div>
              <div>
                <label htmlFor='url'>URL</label>
                <input
                  type='url'
                  name='url'
                  id='url'
                  value={current.url}
                  onChange={(e) => setCurrent({ ...current, url: e.target.value })}
                  pattern='https://.*'
                />
              </div>
              <button onClick={handleEdit}>Done</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
})

export default Context
