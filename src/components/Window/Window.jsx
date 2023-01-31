import s from './Window.module.css'

function Window({folder}) {
  return (
    <div className={s.window}>
      <div className={s.bookmarks}>
        <h2>{folder.title}</h2>
        {folder.children.map((child) => (
          <div className={s.bookmark} key={child.id}>
            <div>{child.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Window