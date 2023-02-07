import { forwardRef } from 'react'
import s from './FolderContext.module.css'
import { TbEdit, TbTrash } from 'react-icons/tb'
import { FaFolderOpen } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { pointsAtom, folderIdAtom, updateIdAtom, deleteConfirmAtom, clickedAtom } from '../state/atoms'

const FolderContext = forwardRef(function FolderContext(props, ctxRef) {
  const [points] = useAtom(pointsAtom)
  const [ ,setClicked] = useAtom(clickedAtom)
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [, setFolderId] = useAtom(folderIdAtom)
  const [updateId] = useAtom(updateIdAtom)

  function handleClick(){
    setDeleteConfirm(true)
  }

  const display = deleteConfirm ? "none" : "block"

  return (
    <div ref={ctxRef} style={{ top: points.y, left: points.x }} className={s.wrapper}>
      <div style={{display: display}} className={s.container}>
        
          <div>
            <span>
              <TbEdit /> Rename
            </span>
            <span onClick={handleClick}>
              <TbTrash /> Delete
            </span>
            <span className={s.rule}></span>
            <span onClick={() => setFolderId(updateId)}>             
              <FaFolderOpen /> Explore
            </span>
          </div>
        
      </div>
    </div>
  )
})

export default FolderContext
