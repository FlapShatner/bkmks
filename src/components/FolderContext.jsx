
import s from './FolderContext.module.css'
import { TbEdit, TbTrash } from 'react-icons/tb'
import{FaFolderOpen} from 'react-icons/fa'
import { useAtom } from 'jotai'
import { pointsAtom, folderIdAtom, updateIdAtom, deleteConfirmAtom} from '../state/atoms'


function FolderContext({ onRename}) {
  const [points] = useAtom(pointsAtom)
  const [,setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [,setFolderId] = useAtom(folderIdAtom)
  const [updateId] = useAtom(updateIdAtom)




  return (    
    <div style={{"top": points.y, "left": points.x}} className={s.wrapper}>
      <div className={s.container}>       
        <span onClick={onRename}>
          <TbEdit /> Rename
        </span>
        <span >
          <TbTrash onClick={() => setDeleteConfirm(true)}/> Delete
        </span>
       <span className={s.rule}></span>
       <span onClick={() => setFolderId(updateId)}> <FaFolderOpen/> Explore</span>
      </div>
    </div> 
  )
}

export default FolderContext
