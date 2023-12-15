import * as React from 'react'

export const useToggleState = (initialState = false) => {
  const [isOn, setIsOn] = React.useState(initialState)

  const handleOn = React.useCallback(() => {
    setIsOn(true)
  }, [])

  const handleOff = React.useCallback(() => {
    setIsOn(false)
  }, [])

  const handleToggle = React.useCallback(() => {
    setIsOn((p) => !p)
  }, [])

  return { isOn, handleToggle, handleOn, handleOff }
}

export type ToggleState = ReturnType<typeof useToggleState>
