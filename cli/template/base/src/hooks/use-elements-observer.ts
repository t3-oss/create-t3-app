import * as React from 'react'

export const useElementsObserver = (selector: string) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('invisible')
        } else {
          entry.target.classList.add('invisible')
        }
      })
    })

    const elementsArray = Array.from(document.querySelectorAll(selector))
    elementsArray.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [selector])
}
