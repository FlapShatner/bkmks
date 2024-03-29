import { useEffect, useCallback, useRef } from 'react'
import s from './App.module.css'
import { useAtom } from 'jotai'
import { useClickOutside } from './hooks/useClickOutside'
import {
  bookmarksAtom,
  folderIdAtom,
  subTreeAtom,
  parentsAtom,
  updateIdAtom,
  clickedAtom,
  deleteConfirmAtom,
  isFolderAtom,
  newFolderAtom,
  isPreviewAtom,
} from './state/atoms'
import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'
import Context from './components/Context'
import CreateFolder from './components/CreateFolder'
import Preview from './components/Preview'

import DeleteConfirm from './components/DeleteConfirm'

function App() {
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)
  const [folderId] = useAtom(folderIdAtom)
  const [, setSubTree] = useAtom(subTreeAtom)
  const [, setParents] = useAtom(parentsAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [clicked, setClicked] = useAtom(clickedAtom)
  const [isFolder] = useAtom(isFolderAtom)
  const [newFolder, setNewFolder] = useAtom(newFolderAtom)
  const [isPreview, setIsPreview] = useAtom(isPreviewAtom)

  const ctxRef = useRef(null)
  const deleteConfirmRef = useRef(null)
  const createFolderRef = useRef(null)
  const previewRef = useRef(null)

  useClickOutside(ctxRef, () => setClicked(false))
  useClickOutside(deleteConfirmRef, () => setDeleteConfirm(false))
  useClickOutside(createFolderRef, () => setNewFolder(false))
  useClickOutside(previewRef, () => setIsPreview(false))

  const bookmarksCb = useCallback(() => {
    chrome.bookmarks.getTree((bookmarks) => {
      setBookmarks(bookmarks[0].children)
      addHasFolders(bookmarks[0].children)
    })
  })

  const subTreeCb = useCallback(() => {
    chrome.bookmarks.getSubTree(folderId, (subTree) => {
      setSubTree(subTree[0])
    })
  }, [folderId])

  const parentCb = useCallback((bookmarks, id) => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].id == id) {
        return bookmarks[i]
      } else if (bookmarks[i].children != null) {
        let result = parentCb(bookmarks[i].children, id)
        if (result != null) {
          return result
        }
      }
    }
    return null
  })

  useEffect(() => {
    bookmarksCb()
    subTreeCb()
    findParents(folderId)
  }, [folderId])

  function addHasFolders(bookmarks) {
    try {
      bookmarks.forEach((bookmark) => {
        if (bookmark.children) {
          if (bookmark.children.some((child) => child.children)) {
            bookmark.hasFolders = true
          } else {
            bookmark.hasFolders = false
          }
          addHasFolders(bookmark.children)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    addHasFolders(bookmarks)
  }, [bookmarks])

  const parentsArr = []

  function findParents(id) {
    const parent = parentCb(bookmarks, id)
    if (parent?.id) {
      parentsArr.push({ id: parent.id, title: parent.title })
      setParents(parentsArr)
      findParents(parent.parentId)
    }
  }

  function onDelete() {
    console.log(updateId)
    isFolder
      ? chrome.bookmarks.removeTree(updateId, () => {
          setDeleteConfirm(false)
          setClicked(false)
          bookmarksCb()
          subTreeCb()
        })
      : chrome.bookmarks.remove(updateId, () => {
          setDeleteConfirm(false)
          setClicked(false)
          bookmarksCb()
          subTreeCb()
        })
  }

  function onRename(newName) {
    chrome.bookmarks.update(updateId, { title: newName }, () => {
      setClicked(false)
      bookmarksCb()
      subTreeCb()
    })
  }

  function onEdit(newInfo) {
    chrome.bookmarks.update(updateId, { title: newInfo.title, url: newInfo.url }, () => {
      setClicked(false)
      bookmarksCb()
      subTreeCb()
    })
  }

  return (
    <div className={s.main}>
      <div className={s.container}>
        <Sidebar onRename={onRename} />
        <Window bookmarksCb={bookmarksCb} onRename={onRename} />
      </div>
      {clicked && <Context onEdit={onEdit} ref={ctxRef} />}
      {deleteConfirm && <DeleteConfirm onDelete={onDelete} ref={deleteConfirmRef} />}
      {newFolder && <CreateFolder ref={createFolderRef} />}
      {isPreview && <Preview ref={previewRef} />}
    </div>
  )
}

export default App
