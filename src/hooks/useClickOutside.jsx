import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { pointsAtom } from '../state/atoms'

export function useClickOutside(ref, callback) {
  const [, setPoints] = useAtom(pointsAtom)

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
      setPoints({ x: 0, y: 0 })
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref, callback])
}
