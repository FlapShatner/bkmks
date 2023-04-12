import { useAtom } from 'jotai'
import { clickedAtom, updateIdAtom } from '../state/store'
export function useEdit() {
  const [, setClicked] = useAtom(clickedAtom)
  const [updateId] = useAtom(updateIdAtom)

  const onEdit = (newInfo) => {
    chrome.bookmarks.update(updateId, { title: newInfo.title, url: newInfo.url }, () => {
      setClicked(false)
    })
  }
  return onEdit
}
