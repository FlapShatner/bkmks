import { atom } from 'jotai'

export const bookmarksAtom = atom([])
export const folderIdAtom = atom('1')
export const subTreeAtom = atom([])
export const parentsAtom = atom([])
export const updateIdAtom = atom('')
export const showAtom = atom(false)
export const clickedAtom = atom(false)
export const pointsAtom = atom({ x: 0, y: 0 })
export const modalAtom = atom(null)
export const deleteConfirmAtom = atom(false)
export const renameAtom = atom(false)
export const expandAtom = atom(false)
export const bmArrayAtom = atom([])
export const dragAtom = atom(false)
export const isFolderAtom = atom(false)
export const editAtom = atom(false)
export const currentAtom = atom({})
export const newFolderAtom = atom(false)
export const previewAtom = atom({})
export const isPreviewAtom = atom(false)

// make a comma separated list of each of the const above
