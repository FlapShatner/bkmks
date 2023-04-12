import s from './DeleteConfirm.module.css'
import { useAtomContext } from '../state/atomContext'
import useAdjustedPoints from '../hooks/usePoints'
import { useEffect, forwardRef } from 'react'
import { atom, useAtom } from 'jotai'

const titleAtom = atom('')

const DeleteConfirm = forwardRef(function DeleteConfirm({ onDelete }, deleteConfirmRef) {
  const [title, setTitle] = useAtom(titleAtom)
  const { updateId, setDeleteConfirm, setClicked } = useAtomContext()
  const { x, y } = useAdjustedPoints(deleteConfirmRef)

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
    setDeleteConfirm(false)
    setClicked(false)
  }

  return (
    <div ref={deleteConfirmRef} style={{ top: y, left: x }} className={s.wrapper}>
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
