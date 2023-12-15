import * as ReactDeviceDetect from 'react-device-detect'

import { useIsHydrated } from './use-is-hydrated'

type DD = {
  isMobile?: boolean
  isTablet?: boolean
  isDesktop?: boolean
  isMobileSafari?: boolean
  isMobileOnly?: boolean
  isSafari?: boolean
  isChrome?: boolean
  isFirefox?: boolean
  isMacOs?: boolean
  isWindows?: boolean
  isIOS?: boolean
  isAndroid?: boolean
  isBrowser?: boolean
  isTouch?: boolean
}

function getDD() {
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0

  const isIpadPro =
    ReactDeviceDetect.isDesktop && ReactDeviceDetect.isSafari && isTouchDevice

  return {
    isDesktop: ReactDeviceDetect.isDesktop && !isIpadPro,
    isMobile: ReactDeviceDetect.isMobile || isIpadPro,
    isMobileOnly: ReactDeviceDetect.isMobileOnly,
    isMobileSafari: ReactDeviceDetect.isMobileSafari,
    isTablet: ReactDeviceDetect.isTablet || isIpadPro,
    isChrome: ReactDeviceDetect.isChrome,
    isFirefox: ReactDeviceDetect.isFirefox,
    isSafari: ReactDeviceDetect.isSafari,
    isMacOs: ReactDeviceDetect.isMacOs,
    isWindows: ReactDeviceDetect.isWindows,
    isIOS: ReactDeviceDetect.isIOS,
    isAndroid: ReactDeviceDetect.isAndroid,
    isBrowser: ReactDeviceDetect.isBrowser,
    isTouch: isTouchDevice
  }
}

export const useDeviceDetect = (): DD => {
  const isHydrated = useIsHydrated()

  if (!isHydrated) {
    return {}
  }

  return getDD()
}
