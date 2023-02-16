import { forwardRef } from 'react'
import s from './Context.module.css'
import { TbEdit, TbTrash, TbExternalLink } from 'react-icons/tb'
import { FaFolderOpen } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { pointsAtom, folderIdAtom, updateIdAtom, deleteConfirmAtom, renameAtom, clickedAtom, isFolderAtom } from '../state/atoms'

const Context = forwardRef(function Context(onDelete, ctxRef) {
  const [points] = useAtom(pointsAtom)
  const [rename, setRename] = useAtom(renameAtom)
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [, setFolderId] = useAtom(folderIdAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [clicked, setClicked] = useAtom(clickedAtom)
  const [isFolder] = useAtom(isFolderAtom)

  function handleDelete() {
    setDeleteConfirm(true)
  }

  function handleRename() {
    setRename(true)
    setClicked(false)
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
        <div>
          <span onClick={handleRename}>
            <TbEdit /> {isFolder ? 'Rename' : 'Edit'}
          </span>
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
      </div>
    </div>
  )
})

export default Context
