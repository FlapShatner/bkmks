import { forwardRef } from 'react'
import s from './FolderContext.module.css'
import { TbEdit, TbTrash } from 'react-icons/tb'
import { FaFolderOpen } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { pointsAtom, folderIdAtom, updateIdAtom, deleteConfirmAtom, renameAtom, clickedAtom} from '../state/atoms'

const FolderContext = forwardRef(function FolderContext(props, ctxRef) {
  const [points] = useAtom(pointsAtom)
  const [rename, setRename] = useAtom(renameAtom)
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [, setFolderId] = useAtom(folderIdAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [clicked, setClicked] = useAtom(clickedAtom)

  function handleDelete(){
    setDeleteConfirm(true)
  }

  function handleRename(){
    setRename(true)
    setClicked(false)
    
  }

  const display = deleteConfirm ? "none" : "block"

  return (
    <div ref={ctxRef} style={{ top: points.y, left: points.x }} className={s.wrapper}>
      <div style={{display: display}} className={s.container}>
        
          <div>
            <span onClick={handleRename}>
              <TbEdit /> Rename
            </span>
            <span onClick={handleDelete}>
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
