import s from './DeleteConfirm.module.css'

import { useEffect, useMemo, forwardRef } from 'react'
import { atom, useAtom } from 'jotai'

import { pointsAtom, updateIdAtom, deleteConfirmAtom, clickedAtom } from '../state/atoms'

const titleAtom = atom('')

const DeleteConfirm = forwardRef(function DeleteConfirm({ onDelete }, deleteConfirmRef) {
  const [points] = useAtom(pointsAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [title, setTitle] = useAtom(titleAtom)
  const [, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [, setClicked] = useAtom(clickedAtom)

  useEffect(() => {
    chrome.bookmarks.get(updateId, (result) => {
      setTitle(result[0].title)
    })
  }, [])

  function handleDelete() {
    console.log('from delete confirm: ' + updateId)
    onDelete()
  }

  function handleClose() {
    setClicked(false)
    setDeleteConfirm(false)
  }

  return (
    <div ref={deleteConfirmRef} style={{ top: points.y, left: points.x }} className={s.wrapper}>
      <div className={s.container}>
        <h3>Are you sure you want to delete the item</h3>
        <h3>{title} ?</h3>
        <p>Warning: This action is not reversible!</p>
        <div className={s.btns}>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  )
})

export default DeleteConfirm
