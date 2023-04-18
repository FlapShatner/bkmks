import { useAtomContext } from '../state/atomContext'
import { useEffect, useState } from 'react'

export function useCurrentFolder() {
  const { folderId } = useAtomContext()
  const [currentFolder, setCurrentFolder] = useState({})

  function getCurrentFolder() {
    chrome.bookmarks.get(folderId, (result) => {
      setCurrentFolder(result[0])
    })
  }

  useEffect(() => {
    getCurrentFolder()
  }, [folderId])

  return currentFolder
}
