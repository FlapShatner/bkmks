import { forwardRef, useEffect, useMemo, useLayoutEffect } from 'react'
import s from './Context.module.css'
import { VscEye } from 'react-icons/vsc'
import { TbEdit, TbTrash, TbExternalLink, TbCopy } from 'react-icons/tb'
import { FaFolderOpen } from 'react-icons/fa'
import { RiSpyLine } from 'react-icons/ri'
import { atom, useAtom } from 'jotai'
import {
  pointsAtom,
  folderIdAtom,
  updateIdAtom,
  deleteConfirmAtom,
  renameAtom,
  clickedAtom,
  isFolderAtom,
  editAtom,
  currentAtom,
  isPreviewAtom,
} from '../state/atoms'

const adjPointsAtom = atom({ x: 0, y: 0 })

const Context = forwardRef(function Context({ onEdit }, ctxRef) {
  const [points] = useAtom(pointsAtom)
  const [, setRename] = useAtom(renameAtom)
  const [deleteConfirm, setDeleteConfirm] = useAtom(deleteConfirmAtom)
  const [, setFolderId] = useAtom(folderIdAtom)
  const [updateId] = useAtom(updateIdAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [isFolder] = useAtom(isFolderAtom)
  const [edit, setEdit] = useAtom(editAtom)
  const [current, setCurrent] = useAtom(currentAtom)
  const [, setIsPreview] = useAtom(isPreviewAtom)
  const [adjPoints, setAdjPoints] = useAtom(adjPointsAtom)

  const prevTxt = 'Preview (beta)'

  useEffect(() => {
    setEdit(false)
    setIsPreview(false)
  }, [])

  useEffect(() => {
    chrome.bookmarks.get(updateId, (bookmark) => {
      if (bookmark[0]) {
        setCurrent(bookmark[0])
      }
    })
  }, [])

  useLayoutEffect(() => {
    const { x, y } = points
    const { width, height } = ctxRef.current.getBoundingClientRect()
    const { innerWidth, innerHeight } = window
    const adjX = x + width > innerWidth ? innerWidth - width : x
    const adjY = y + height > innerHeight ? innerHeight - height : y
    setAdjPoints({ x: adjX, y: adjY })
  }, [])

  function handleDelete() {
    setDeleteConfirm(true)
  }

  function handleRename() {
    setRename(true)
    setClicked(false)
  }

  function handleEdit(e) {
    e.preventDefault()
    onEdit({ title: current.title, url: current.url })
  }

  function handlePreview() {
    setClicked(false)
    setIsPreview(true)
  }

  function copyUrl() {
    navigator.clipboard.writeText(current.url)
    setClicked(false)
  }

  function navigate(type) {
    chrome.bookmarks.get(updateId, (bookmark) => {
      if (bookmark[0].url) {
        if (type == 'tab') {
          chrome.tabs.create({ url: bookmark[0].url, active: false })
        } else if (type == 'window') {
          chrome.windows.create({ url: bookmark[0].url, focused: true })
        } else if (type == 'incognito') {
          chrome.windows.create({ url: bookmark[0].url, focused: true, incognito: true })
        }
      }
      setClicked(false)
    })
  }

  const display = deleteConfirm ? 'none' : 'block'

  return (
    <div ref={ctxRef} style={{ top: adjPoints.y, left: adjPoints.x }} className={s.wrapper}>
      <div style={{ display: display }} className={s.container}>
        {!edit ? (
          <div>
            {isFolder ? (
              <span onClick={handleRename}>
                <TbEdit /> Rename
              </span>
            ) : (
              <span onClick={() => setEdit(true)}>
                <TbEdit /> Edit info
              </span>
            )}

            <span onClick={handleDelete}>
              <TbTrash /> Delete
            </span>
            <span className={s.rule}></span>

            {isFolder ? (
              <span onClick={() => setFolderId(updateId)}>
                <FaFolderOpen /> Explore
              </span>
            ) : (
              <>
                <span onClick={handlePreview}>
                  <VscEye /> {prevTxt}
                </span>
                <span className={s.rule}></span>
                <span onClick={() => navigate('tab')}>
                  <TbExternalLink /> Open in new tab
                </span>
                <span onClick={() => navigate('window')}>
                  <TbExternalLink /> Open in new window
                </span>
                <span onClick={() => navigate('incognito')}>
                  <RiSpyLine /> Open incognito
                </span>
                <span className={s.rule}></span>
                <span onClick={copyUrl}>
                  <TbCopy /> Copy URL
                </span>
              </>
            )}
          </div>
        ) : (
          <div className={s.edit}>
            <form>
              <div>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' id='title' value={current.title} onChange={(e) => setCurrent({ ...current, title: e.target.value })} />
              </div>
              <div>
                <label htmlFor='url'>URL</label>
                <input
                  type='url'
                  name='url'
                  id='url'
                  value={current.url}
                  onChange={(e) => setCurrent({ ...current, url: e.target.value })}
                  pattern='https://.*'
                />
              </div>
              <button onClick={handleEdit}>Done</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
})

export default Context
