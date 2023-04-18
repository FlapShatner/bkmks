import { useEffect, useRef } from 'react'
import s from './App.module.css'
import { ReactQueryDevtools } from 'react-query/devtools'

import { useClickOutside } from './hooks/useClickOutside'
import { useBookmarks } from './hooks/useBookmarks'
import { useSubTree } from './hooks/useSubTree'
import { useFindParents } from './hooks/useFindParents'

import { useDelete } from './hooks/useDelete'
import { useRename } from './hooks/useRename'
import { useEdit } from './hooks/useEdit'

import { useAtomContext } from './state/atomContext'

import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'
import Context from './components/Context'
import CreateFolder from './components/CreateFolder'
import Preview from './components/Preview'
import DeleteConfirm from './components/DeleteConfirm'

function App() {
  const { deleteConfirm, setDeleteConfirm, folderId, clicked, setClicked, newFolder, setNewFolder, isPreview, setIsPreview, setPreview } = useAtomContext()

  const ctxRef = useRef(null)
  const deleteConfirmRef = useRef(null)
  const createFolderRef = useRef(null)
  const previewRef = useRef(null)

  useClickOutside(ctxRef, () => setClicked(false))
  useClickOutside(deleteConfirmRef, () => {
    setDeleteConfirm(false)
    setClicked(false)
  })
  useClickOutside(createFolderRef, () => setNewFolder(false))
  useClickOutside(previewRef, () => {
    setPreview({
      title: 'Error',
      description: 'Error',
    })
    setIsPreview(false)
  })

  const [bookmarks, bookmarksCb] = useBookmarks()
  const findParents = useFindParents()
  const subTreeCb = useSubTree()

  const onDelete = useDelete()
  const onRename = useRename()
  const onEdit = useEdit()

  useEffect(() => {
    bookmarksCb()
    subTreeCb()
    findParents(folderId)
  }, [folderId])

  function deleteItem() {
    onDelete()
    bookmarksCb()
    subTreeCb()
  }

  function renameItem(newName) {
    onRename(newName)
    bookmarksCb()
    subTreeCb()
  }

  function editItem(newInfo) {
    onEdit(newInfo)
    bookmarksCb()
    subTreeCb()
  }

  return (
    <div className={s.main}>
      <div className={s.container}>
        <Sidebar onRename={renameItem} />
        <Window onRename={renameItem} />
      </div>
      {clicked && <Context onEdit={editItem} ref={ctxRef} />}
      {deleteConfirm && <DeleteConfirm ref={deleteConfirmRef} onDelete={deleteItem} />}
      {newFolder && <CreateFolder ref={createFolderRef} />}
      {isPreview && <Preview ref={previewRef} />}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </div>
  )
}

export default App
