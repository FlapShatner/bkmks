import { useState, useLayoutEffect } from 'react'
import { useAtomContext } from '../state/atomContext'

const useAdjustedPoints = (ref) => {
  const [adjPoints, setAdjPoints] = useState({ x: 0, y: 0 })
  const { points } = useAtomContext()

  useLayoutEffect(() => {
    const { x, y } = points
    const { width, height } = ref.current.getBoundingClientRect()
    const { innerWidth, innerHeight } = window
    const adjX = x + width > innerWidth ? innerWidth - width : x
    const adjY = y + height > innerHeight - 200 ? innerHeight - height - 250 : y
    setAdjPoints({ x: adjX, y: adjY })
  }, [points, ref])

  return adjPoints
}

export default useAdjustedPoints
