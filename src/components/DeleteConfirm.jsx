import s from './DeleteConfirm.module.css'
import {TbTrash} from 'react-icons/tb'

function DeleteConfirm() {
  return (
    <div className={s.wrapper}>
    <div className={s.container}>
       <h3><TbTrash/> Delete?</h3> 
        <div className={s.btns}>
        <button>Yes</button>
        <button>No</button>        
        </div>
    </div>
    </div>
  )
}

export default DeleteConfirm