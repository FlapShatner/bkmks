import { atom } from 'jotai'

export const bookmarksAtom = atom([]) // all bookmarks
export const folderIdAtom = atom('1') // current folder in view
export const subTreeAtom = atom([]) // children of current folder
export const parentsAtom = atom([]) // parents of current folder
export const updateIdAtom = atom('') // folder currently selcted for context menu
export const showAtom = atom(false) // collapse/expand children in sidebar
export const clickedAtom = atom(false) // context menu
export const pointsAtom = atom({ x: 0, y: 0 }) // current mouse position
export const modalAtom = atom(null) // not used
export const deleteConfirmAtom = atom(false) // delete confirm modal toggle
export const renameAtom = atom(false) // rename modal toggle
export const expandAtom = atom(false) // not used
export const bmArrayAtom = atom([]) // intermediate array for drag and drop
export const dragAtom = atom(false) // drag and drop toggle
export const isFolderAtom = atom(false) // tells context is folder or bookmark
export const editAtom = atom(false) // edit modal toggle
export const currentAtom = atom({}) // currently selected bookmark
export const newFolderAtom = atom(false) // new folder modal toggle
export const previewAtom = atom({}) // currently previewed bookmark
export const isPreviewAtom = atom(false) // preview modal toggle
export const linkUrlsAtom = atom([]) // array of bookmark urls for current folder
