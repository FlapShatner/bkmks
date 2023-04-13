import { forwardRef } from 'react'
import s from './CreateFolder.module.css'
import { FaFolderPlus } from 'react-icons/fa'
import { useAtomContext } from '../state/atomContext'

const CreateFolder = forwardRef(function CreateFolder(props, createFolderRef) {
  const { folderId } = useAtomContext()

  return (
    <div ref={createFolderRef} className={s.wrapper}>
      <form>
        <h3>
          <FaFolderPlus /> New Folder
        </h3>

        <div>
          <p>New folder in </p>
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
