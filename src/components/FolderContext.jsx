import {useState} from 'react'
import s from './FolderContext.module.css'
import { TbEdit, TbTrash } from 'react-icons/tb'


function FolderContext({points, onDelete, onRename}) {



  return (    
    <div style={{"top": points.y, "left": points.x}} className={s.wrapper}>
      <div className={s.container}>       
        <span onClick={onRename}>
          <TbEdit /> Rename
        </span>
        <span >
          <TbTrash /> Delete
        </span>
       
      </div>
    </div> 
  )
}

export default FolderContext
