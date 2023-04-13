import { createContext, useContext } from 'react'
import { useAtom } from 'jotai'
import {
  bookmarksAtom,
  folderIdAtom,
  subTreeAtom,
  parentsAtom,
  updateIdAtom,
  showAtom,
  clickedAtom,
  pointsAtom,
  modalAtom,
  deleteConfirmAtom,
  renameAtom,
  expandAtom,
  bmArrayAtom,
  dragAtom,
  isFolderAtom,
  editAtom,
  currentAtom,
  newFolderAtom,
  previewAtom,
  isPreviewAtom,
  linkUrlsAtom,
} from './store'

const AtomContext = createContext()

export const useAtomContext = () => useContext(AtomContext)

export const AtomProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)
  const [folderId, setFolderId] = useAtom(folderIdAtom)
  const [subTree, setSubTree] = useAtom(subTreeAtom)
  const [parents, setParents] = useAtom(parentsAtom)
  const [updateId, setUpdateId] = useAtom(updateIdAtom)
  const [show, setShow] = useAtom(showAtom)
  const [clicked, setClicked] = useAtom(clickedAtom)
  const [points, setPoints] = useAtom(pointsAtom)
  const [modal, setModal] = useAtom(modalAtom)
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [rename, setRename] = useAtom(renameAtom)
  const [expand, setExpand] = useAtom(expandAtom)
  const [bmArray, setBmArray] = useAtom(bmArrayAtom)
  const [drag, setDrag] = useAtom(dragAtom)
  const [isFolder, setIsFolder] = useAtom(isFolderAtom)
  const [edit, setEdit] = useAtom(editAtom)
  const [current, setCurrent] = useAtom(currentAtom)
  const [newFolder, setNewFolder] = useAtom(newFolderAtom)
  const [preview, setPreview] = useAtom(previewAtom)
  const [isPreview, setIsPreview] = useAtom(isPreviewAtom)
  const [linkUrls, setLinkUrls] = useAtom(linkUrlsAtom)

  return (
    <AtomContext.Provider
      value={{
        bookmarks,
        setBookmarks,
        folderId,
        setFolderId,
        subTree,
        setSubTree,
        parents,
        setParents,
        updateId,
        setUpdateId,
        show,
        setShow,
        clicked,
        setClicked,
        points,
        setPoints,
        modal,
        setModal,
        deleteConfirm,
        setDeleteConfirm,
        rename,
        setRename,
        expand,
        setExpand,
        bmArray,
        setBmArray,
        drag,
        setDrag,
        isFolder,
        setIsFolder,
        edit,
        setEdit,
        current,
        setCurrent,
        newFolder,
        setNewFolder,
        preview,
        setPreview,
        isPreview,
        setIsPreview,
        linkUrls,
        setLinkUrls,
      }}>
      {children}
    </AtomContext.Provider>
  )
}
