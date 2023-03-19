import s from './CreateFolder.module.css'
import { FaFolderPlus } from 'react-icons/fa'
import { forwardRef } from 'react'

const CreateFolder = forwardRef(function CreateFolder(props, createFolderRef) {
  return (
    <div ref={createFolderRef} className={s.wrapper}>
      <form>
        <h3>
          <FaFolderPlus /> New Folder
        </h3>

        <div>
          <label htmlFor='parent'>Parent Folder</label>
          <input type='text' name='parent' id='parent' />
        </div>
        <div>
          <label htmlFor='title'>New Folder Name</label>
          <input type='text' name='title' id='title' />
        </div>
        <button>Done</button>
      </form>
    </div>
  )
})

export default CreateFolder
