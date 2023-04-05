import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { folderIdAtom, subTreeAtom } from '../state/atoms'

export const useSubTree = () => {
  const [folderId] = useAtom(folderIdAtom)
  const [, setSubTree] = useAtom(subTreeAtom)

  const subTreeCb = useCallback(() => {
    chrome.bookmarks.getSubTree(folderId, (subTree) => {
      setSubTree(subTree[0])
    })
  }, [folderId, setSubTree])

  return subTreeCb
}
