import { useEffect, useState } from 'react'

import { isClient } from '~/lib/constants'

export const useViewportSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
    aspect: number
  }>({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
    aspect: isClient ? window.innerWidth / window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        aspect: window.innerWidth / window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize, { passive: true })

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export const useOnWindowResize = (
  callback: (width: number, height: number) => void,
  deps: any[]
) => {
  useEffect(() => {
    const handleResize = () => {
      callback(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
}
