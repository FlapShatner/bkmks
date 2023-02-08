import {atom} from 'jotai'

export const bookmarksAtom = atom([])
export const folderIdAtom = atom('1')
export const subTreeAtom = atom([])
export const parentsAtom = atom([])
export const updateIdAtom = atom('')
export const showAtom = atom(false)
export const clickedAtom = atom(false)
export const pointsAtom = atom({x: 0, y: 0})
export const modalAtom = atom(null)
export const deleteConfirmAtom = atom(false)
export const renameAtom = atom(false)
