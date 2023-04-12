import { useAtom } from 'jotai'
import { clickedAtom, updateIdAtom } from '../state/store'

export function useRename() {
  const [, setClicked] = useAtom(clickedAtom)
  const [updateId] = useAtom(updateIdAtom)

  const onRename = (newName) => {
    chrome.bookmarks.update(updateId, { title: newName }, () => {
      setClicked(false)
    })
  }

  return onRename
}
