import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAtomContext } from '../state/atomContext'

export default function Item(props) {
  const { drag } = useAtomContext()
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id, data: { parentId: props.parentId }, disabled: !drag })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  )
}
