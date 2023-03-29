import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import s from './Window.module.css'
import { TbCaretRight, TbLink } from 'react-icons/tb'
import { IoReorderThree } from 'react-icons/io5'
import { MdDragIndicator, MdMoreVert } from 'react-icons/md'
import { FaFolderOpen, FaFolder, FaFolderPlus } from 'react-icons/fa'
import { useAtom } from 'jotai'
import {
  folderIdAtom,
  subTreeAtom,
  parentsAtom,
  clickedAtom,
  updateIdAtom,
  pointsAtom,
  bmArrayAtom,
  dragAtom,
  isFolderAtom,
  newFolderAtom,
} from '../../state/atoms'

import Test from '../Test'
import Item from '../Item'
import { useEffect } from 'react'

function Window({ bookmarksCb }) {
  const [, setFolderId] = useAtom(folderIdAtom)
  const [subTree] = useAtom(subTreeAtom)
  const [parents] = useAtom(parentsAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [, setIsFolder] = useAtom(isFolderAtom)
  const [, setUpdateId] = useAtom(updateIdAtom)
  const [, setPoints] = useAtom(pointsAtom)
  const [drag, setDrag] = useAtom(dragAtom)
  const [newFolder, setNewFolder] = useAtom(newFolderAtom)

  const { id, title, children } = subTree

  const [bmArray, setBmArray] = useAtom(bmArrayAtom)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (children !== undefined) {
      const bmArray = children.map((child) => child.id)
      setBmArray(bmArray)
    }
  }, [children])

  function onContext(e, id, folder) {
    e.preventDefault()
    e.stopPropagation()
    setClicked(true)
    setUpdateId(id)
    setIsFolder(folder)
    setPoints({ x: e.clientX, y: e.clientY })
  }

  function handleClick(id) {
    !drag && setFolderId(id)
  }

  function apiMove(id, newIndex, parentId) {
    chrome.bookmarks.move(id, { index: newIndex, parentId: parentId }, () => {
      console.log('moved bookmark: ', id, ' to index: ', newIndex, ' in folder: ', parentId)
      bookmarksCb()
    })
  }

  function moveBm(id, newIndex, oldIndex, parentId) {
    try {
      if (newIndex > oldIndex) {
        const backOneIndex = newIndex + 1
        apiMove(id, backOneIndex, parentId)
      } else {
        apiMove(id, newIndex, parentId)
      }
    } catch (e) {
      console.log(e)
    }
  }

  if (children == undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className={s.window}>
      <div className={s.header}>
        <div className={s.crumbs}>
          {parents.map((parent, i) => (
            <div className={s.crumb}>
              {i !== parents.length - 1 && <TbCaretRight />}
              <p onClick={() => handleClick(parent.id)} key={parent.id}>
                {parent.title}
              </p>
            </div>
          ))}
        </div>
        {/* <Test /> */}
        <div className={s.titleBar}>
          <h2
            onContextMenu={(e) => {
              const folder = true
              onContext(e, id, folder)
            }}>
            <FaFolderOpen />
            {title}
          </h2>
          <div className={s.titleBtns}>
            <button onClick={() => setNewFolder(!newFolder)}>
              <FaFolderPlus size={'1rem'} /> New Folder
            </button>
            <button onClick={() => setDrag(!drag)}>
              <IoReorderThree size={'1.25rem'} /> Reorder Items
            </button>
          </div>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={bmArray} strategy={verticalListSortingStrategy}>
          {children &&
            bmArray.map((item) => {
              const child = children.find((child) => child.id === item)
              if (child != undefined) {
                if (!child.children) {
                  {
                    /* Link */
                  }
                  const folder = false
                  return (
                    <Item key={item} id={item} parentId={child.parentId}>
                      <div onContextMenu={(e) => onContext(e, child.id, folder)} className={`${s.link} ${drag && s.outline}`}>
                        <a href={!drag && child.url} target='_blank' rel='noopener noreferrer'>
                          <div className={`${s.icon} ${drag && s.wide}`}>
                            {drag && <MdDragIndicator size='1rem' color='var(--clr-primary-hover)' />}
                            <TbLink />
                          </div>
                          {child.title}
                        </a>
                      </div>
                    </Item>
                  )
                } else {
                  {
                    /* Folder */
                  }
                  const folder = true
                  return (
                    <Item id={item} key={item}>
                      <div className={`${s.folder} ${drag && s.outline}`}>
                        <h3 onContextMenu={(e) => onContext(e, child.id, folder)} onClick={() => handleClick(child.id)}>
                          <div className={`${s.icon} ${drag && s.wide}`}>
                            {drag && <MdDragIndicator size='1rem' color='var(--clr-primary-hover)' />}
                            <FaFolder size='.75rem' />
                          </div>
                          {child.title}
                        </h3>
                      </div>
                    </Item>
                  )
                }
              }
            })}
        </SortableContext>
      </DndContext>
    </div>
  )

  function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over.id) {
      setBmArray((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
      const newIndex = bmArray.indexOf(over.id)
      const oldIndex = bmArray.indexOf(active.id)
      moveBm(active.id, newIndex, oldIndex, active.data.current.parentId)
    }
  }
}

export default Window
