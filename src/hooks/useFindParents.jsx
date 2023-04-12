import { useAtom } from 'jotai'
import { parentsAtom, bookmarksAtom } from '../state/store'
import { useParentCb } from './useParentCb'

export function useFindParents() {
  const [, setParents] = useAtom(parentsAtom)
  const [bookmarks] = useAtom(bookmarksAtom)
  const parentCb = useParentCb()
  let parentsArr = []
  function findParents(id) {
    const parent = parentCb(bookmarks, id)
    if (parent?.id) {
      parentsArr.push({ id: parent.id, title: parent.title })
      setParents(parentsArr)
      findParents(parent.parentId)
    }
  }

  return findParents
}
