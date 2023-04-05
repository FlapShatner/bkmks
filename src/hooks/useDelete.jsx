import { useAtom } from 'jotai'
import { deleteConfirmAtom, clickedAtom, isFolderAtom, updateIdAtom } from '../state/atoms'
import { useBookmarks } from './useBookmarks'
import { useSubTree } from './useSubTree'

export function useDelete() {
  const [, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [isFolder] = useAtom(isFolderAtom)

  const onDelete = () => {
    if (isFolder) {
      chrome.bookmarks.removeTree(updateId, () => {
        setDeleteConfirm(false)
        setClicked(false)
      })
    } else {
      chrome.bookmarks.remove(updateId, () => {
        setDeleteConfirm(false)
        setClicked(false)
      })
    }
  }

  return onDelete
}
