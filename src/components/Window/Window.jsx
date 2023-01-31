import s from './Window.module.css'

function Window({curFolder, curChildren}) {
  const { id, title } = curFolder
  if(!curFolder) {
    return (
      <div><h2>Loading...</h2></div>
    )
  }

  return (
    <div className={s.window}>
      <div className={s.bookmarks}>
        <h2>{title}</h2>
        {curChildren.map((child) => (
          <div className={s.bookmark} key={child.id}>
            <div>{child.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Window