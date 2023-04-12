import { forwardRef, useEffect, useLayoutEffect } from 'react'
import useAdjustedPoints from '../hooks/usePoints'
import s from './Preview.module.css'

import { useAtomContext } from '../state/atomContext'

const Preview = forwardRef(function Preview(props, ref) {
  const { points, updateId, current, setCurrent, setPreview, preview } = useAtomContext()

  useEffect(() => {
    chrome.bookmarks.get(updateId, (bookmark) => {
      if (bookmark[0]) {
        setCurrent(bookmark[0])
      }
    })
  }, [])

  useEffect(() => {
    setPreview({
      title: 'Loading...',
      description: 'Loading...',
    })

    async function usePreview(url) {
      const server = 'https://link-preview-74vm.onrender.com'
      const URI = encodeURI(url)

      const response = await fetch(`${server}/preview?url=${URI}`, {
        method: 'GET',
        'content-type': 'application/json',
      })
      if (!response.ok) {
        throw new Error('something went wrong')
      }
      const data = await response.json()
      setPreview(data)
    }
    if (current.url) {
      usePreview(current.url)
    }
  }, [])

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
