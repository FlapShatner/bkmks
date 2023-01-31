import s from './Window.module.css'

function Window({subTree}) {
 
  if(!subTree.children) {
    return (
      <div><h2>Loading...</h2></div>
    )
  }
  const {title, children} = subTree

  return (
    <div className={s.window}>
      <div className={s.bookmarks}>
        <h2>{title}</h2>
        {children.map((child) => (
          <div className={s.bookmark} key={child.id}>
            <div>{child.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Window