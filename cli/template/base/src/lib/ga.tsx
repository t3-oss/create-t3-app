import { useRouter } from 'next/router'
import Script from 'next/script'
import * as React from 'react'

import { gaTrackingId } from './constants'

declare global {
  interface Window {
    gtag: undefined | ((...args: any[]) => void)
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined')
    return
  }
  window.gtag('config', gaTrackingId, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value
}: {
  action: string
  category: string
  label: string
  value: string
}) => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined')
    return
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

// Put this in _document.tsx
export const GAScripts = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTrackingId}', {
              page_path: window.location.pathname,
            });
            // you can add more gtags here like:
            // gtag('config', '<another-tracking-code>', {
            //   page_path: window.location.pathname,
            // });
          `
        }}
      />
    </>
  )
}

// Use this hook in _app.tsx
export const useAppGA = () => {
  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
