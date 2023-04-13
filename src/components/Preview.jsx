import { forwardRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getPreview } from '../utils/getPreview'
import s from './Preview.module.css'

import { useAtomContext } from '../state/atomContext'

const Preview = forwardRef(function Preview(props, ref) {
  const { updateId, current, setCurrent, preview, setPreview, linkUrls } = useAtomContext()

  useEffect(() => {
    chrome.bookmarks.get(updateId, (bookmark) => {
      if (bookmark[0]) {
        setCurrent(bookmark[0])
      }
    })
  }, [])

  const { data } = useQuery(['previews', linkUrls], () => getPreview(linkUrls))

  useEffect(() => {
    if (data) {
      const preview = data.find((item) => item.id === current.id)
      setPreview(preview.url)
      console.log(preview)
    }
  }, [data])

  let img = preview.images
  if (preview.images && preview.images.length > 1) {
    img = preview.images[0]
  }

  let favicon = preview.favicons
  if (preview.favicons && preview.favicons.length > 1) {
    favicon = preview.favicons[0]
  }

  return (
    <>
      <div ref={ref} className={s.wrapper}>
        <div className={s.container}>
          <div className={s.title}>
            <img src={favicon} alt='' className={s.icon} />
            <h3>{preview.title}</h3>
          </div>
          <p>{preview.description}</p>
          <img src={img} alt='' className={s.img} />
        </div>
      </div>
    </>
  )
})

export default Preview
