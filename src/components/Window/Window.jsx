import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import s from './Window.module.css'
import { TbCaretRight, TbLink } from 'react-icons/tb'
import { IoReorderThree } from 'react-icons/io5'
import { MdDragIndicator } from 'react-icons/md'
import { FaFolderOpen, FaFolder } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { folderIdAtom, subTreeAtom, parentsAtom, expandAtom, clickedAtom, updateIdAtom, pointsAtom, bmArrayAtom, dragAtom } from '../../state/atoms'

import Item from '../Item'
import { useEffect } from 'react'

function Window() {
  const [, setFolderId] = useAtom(folderIdAtom)
  const [subTree] = useAtom(subTreeAtom)
  const [parents] = useAtom(parentsAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [, setUpdateId] = useAtom(updateIdAtom)
  const [, setPoints] = useAtom(pointsAtom)
  const [drag, setDrag] = useAtom(dragAtom)

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

  function onFolderContext(e, id) {
    e.preventDefault()
    e.stopPropagation()
    setClicked(true)
    setUpdateId(id)
    setPoints({ x: e.clientX, y: e.clientY })
  }

  function handleClick(id) {
    !drag && setFolderId(id)
  }

  function apiMove(id, newIndex, parentId) {
    chrome.bookmarks.move(id, { index: newIndex, parentId: parentId }, () => {
      console.log('moved bookmark: ', id, ' to index: ', newIndex, ' in folder: ', parentId)
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
        <div className={s.titleBar}>
          <h2 onContextMenu={(e) => onFolderContext(e, id)}>
            <FaFolderOpen />
            {title}
          </h2>
          <button className={!drag && s.opacity} onClick={() => setDrag(!drag)}>
            <IoReorderThree size={'1.25rem'} /> Reorder Items
          </button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={bmArray} strategy={verticalListSortingStrategy}>
          {children &&
            bmArray.map((item) => {
              const child = children.find((child) => child.id === item)
              if (child != undefined) {
                if (!child.children) {
                  return (
                    <Item key={item} id={item} parentId={child.parentId}>
                      <div className={`${s.link} ${drag && s.outline}`}>
                        <a href={!drag && child.url}>
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
                  return (
                    <Item id={item} key={item}>
                      <div className={`${s.folder} ${drag && s.outline}`}>
                        <h3 onContextMenu={(e) => onFolderContext(e, child.id)} onClick={() => handleClick(child.id)}>
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
