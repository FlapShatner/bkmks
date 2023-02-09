import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import s from './Window.module.css'
import { TbCaretRight, TbLink } from 'react-icons/tb'

import { FaFolderOpen, FaFolder } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { folderIdAtom, subTreeAtom, parentsAtom, expandAtom, clickedAtom, updateIdAtom, pointsAtom, bmArrayAtom } from '../../state/atoms'

import Item from '../Item'
import { useEffect } from 'react'

// @TODO: fix click outside context menu
// @TODO: make reordering persist

function Window() {
  const [, setFolderId] = useAtom(folderIdAtom)
  const [subTree] = useAtom(subTreeAtom)
  const [parents] = useAtom(parentsAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [, setUpdateId] = useAtom(updateIdAtom)
  const [, setPoints] = useAtom(pointsAtom)

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
    setFolderId(id)
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

        <h2 onContextMenu={(e) => onFolderContext(e, id)}>
          <FaFolderOpen />
          {title}
        </h2>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={bmArray} strategy={verticalListSortingStrategy}>
          {bmArray.map((item) => {
            const child = children.find((child) => child.id === item)
            if (!child.children) {
              return (
                <Item key={item} id={item}>
                  <div className={s.link}>
                    <a href={child.url}>
                      <TbLink /> {child.title}{' '}
                    </a>
                  </div>
                </Item>
              )
            } else {
              return (
                <Item id={item} key={item}>
                  <div className={s.folder}>
                    <h3 onContextMenu={(e) => onFolderContext(e, child.id)}>
                      <FaFolder size='.75rem' /> {child.title}
                    </h3>
                  </div>
                </Item>
              )
            }
          })}
        </SortableContext>
      </DndContext>
    </div>
  )

  function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}

export default Window
