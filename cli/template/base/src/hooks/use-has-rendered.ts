import * as React from 'react'

export const useHasRendered = () => {
  const [hasRendered, setHasRendered] = React.useState(false)

  React.useEffect(() => {
    setHasRendered(true)
  }, [])

  return hasRendered
}
