import { useEffect, useCallback, useRef } from 'react'
import s from './App.module.css'
import { useAtom } from 'jotai'
import { bookmarksAtom, folderIdAtom, subTreeAtom, parentsAtom, updateIdAtom, clickedAtom, deleteConfirmAtom } from './state/atoms'
import Window from './components/Window/Window'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header'
import FolderContext from './components/FolderContext'
import DeleteConfirm from './components/DeleteConfirm'

function App() {
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)
  const [folderId] = useAtom(folderIdAtom)
  const [, setSubTree] = useAtom(subTreeAtom)
  const [, setParents] = useAtom(parentsAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [clicked, setClicked] = useAtom(clickedAtom)

  const ctxRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ctxRef.current && !ctxRef.current.contains(e.target)) {
        setClicked(false)
        if (deleteConfirm) {
          setDeleteConfirm(false)
        }
      }
    }
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [ctxRef, setClicked, deleteConfirm, setDeleteConfirm])

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
    chrome.bookmarks.removeTree(updateId, () => {
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

  return (
    <div className={s.main}>
      {/* <Header /> */}
      <div className={s.container}>
        <Sidebar onRename={onRename} />
        <Window onRename={onRename} />
      </div>
      {clicked && <FolderContext onRename={onRename} ref={ctxRef} />}
      {deleteConfirm && <DeleteConfirm onDelete={onDelete} />}
    </div>
  )
}

export default App
