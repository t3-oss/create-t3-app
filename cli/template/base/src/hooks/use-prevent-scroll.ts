import { useEffect } from 'react'

export const usePreventScroll = (active = false) => {
  useEffect(() => {
    if (active) {
      document.documentElement.classList.add('no-scroll')
      return () => {
        document.documentElement.classList.remove('no-scroll')
      }
    }
  }, [active])
}
