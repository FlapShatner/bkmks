import { forwardRef, useRef } from 'react'
import s from './CreateFolder.module.css'
import { FaFolderPlus } from 'react-icons/fa'
import { useBookmarks } from '../hooks/useBookmarks'
import { useSubTree } from '../hooks/useSubTree'
import { useAtomContext } from '../state/atomContext'
import { useCurrentFolder } from '../hooks/useCurrentFolder'

const CreateFolder = forwardRef(function CreateFolder(props, createFolderRef) {
  const { folderId, setNewFolder } = useAtomContext()

  const [bookmarks, bookmarksCb] = useBookmarks()
  const subTreeCb = useSubTree()

  const inputRef = useRef()

  const currentFolder = useCurrentFolder()

  function onSubmit(e) {
    e.preventDefault()
    const title = inputRef.current.value
    chrome.bookmarks.create({ parentId: folderId, title: title })
    setNewFolder(false)
    bookmarksCb()
    subTreeCb()
  }

  return (
    <div ref={createFolderRef} className={s.wrapper}>
      <form onSubmit={onSubmit}>
        <h3>
          <FaFolderPlus /> New Folder
        </h3>

        <div>
          <p>Inside parent: {currentFolder.title}</p>
        </div>
        <div>
          <label htmlFor='title'>New Folder Name</label>
          <input ref={inputRef} type='text' name='title' id='title' />
        </div>
        <button>Done</button>
      </form>
    </div>
  )
})

export default CreateFolder
