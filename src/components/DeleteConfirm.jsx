import s from './DeleteConfirm.module.css'

import { useEffect, useMemo } from 'react'
import { atom, useAtom } from 'jotai'

import { pointsAtom, updateIdAtom } from '../state/atoms'

const titleAtom = atom('')

function DeleteConfirm({ onDelete }) {
  const [points] = useAtom(pointsAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [title, setTitle] = useAtom(titleAtom)

  useEffect(() => {
    chrome.bookmarks.get(updateId, (result) => {
      setTitle(result[0].title)
    })
  }, [])

  return (
    <div style={{ top: points.y, left: points.x }} className={s.wrapper}>
      <div className={s.container}>
        <h3>Are you sure you want to delete the folder</h3>
        <h3>{title} ?</h3>
        <p>Warning: This action is not reversible!</p>
        <div className={s.btns}>
          <button onClick={onDelete}>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
