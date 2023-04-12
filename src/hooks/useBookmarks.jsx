import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { bookmarksAtom } from '../state/store'

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)

  const bookmarksCb = useCallback(() => {
    chrome.bookmarks.getTree((bookmarks) => {
      const bm = bookmarks[0].children
      addHasFolders(bm)
      setBookmarks(bm)
    })
  }, [setBookmarks])

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

  return [bookmarks, bookmarksCb]
}
