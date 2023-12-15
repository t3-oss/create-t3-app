import * as React from 'react'

let globalIsHydrated = false

export const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = React.useState(globalIsHydrated)

  React.useEffect(() => {
    setIsHydrated(true)
    globalIsHydrated = true
  }, [])

  return isHydrated
}
