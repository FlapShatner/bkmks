import s from './Window.module.css'
import { TbCaretRight, TbLink } from 'react-icons/tb'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { FaFolderOpen, FaFolder } from 'react-icons/fa'
import { useAtom, atom } from 'jotai'
import { folderIdAtom, subTreeAtom, parentsAtom, expandAtom, clickedAtom, updateIdAtom, pointsAtom } from '../../state/atoms'

function Window() {
  const [, setFolderId] = useAtom(folderIdAtom)
  const [subTree] = useAtom(subTreeAtom)
  const [parents] = useAtom(parentsAtom)
  const [, setClicked] = useAtom(clickedAtom)
  const [, setUpdateId] = useAtom(updateIdAtom)
  const [, setPoints] = useAtom(pointsAtom)

  const { id, title, children, parentId } = subTree

  if (!subTree.children) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }
  const folders = children.filter((child) => child.children)
  const links = children.filter((child) => !child.children)

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

      {children.map((child) => {
        if (!child.children) {
          return (
            <div id={child.id} className={s.link} key={child.id}>
              <a href={child.url}>
                <TbLink /> {child.title}{' '}
              </a>
            </div>
          )
        } else {
          return (
            <div className={s.folder} key={child.id}>
              <h3 onContextMenu={(e) => onFolderContext(e, child.id)} onClick={() => handleClick(child.id)}>
                <FaFolder size='.75rem' /> {child.title}
              </h3>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Window
