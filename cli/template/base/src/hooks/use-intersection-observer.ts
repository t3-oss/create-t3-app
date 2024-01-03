import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverInit & {
    active?: boolean;
    triggerOnce?: boolean;
  }
) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const active = options.active ?? true;

  useEffect(() => {
    const elementToObserve = ref.current;
    if (!elementToObserve || !active) return;

    const handleObserve: IntersectionObserverCallback = ([element]) => {
      if (element) {
        setInView((p) => {
          // trigger once?
          if (options && options.triggerOnce && p === true) return p;
          else return element.isIntersecting;
        });
      }
    };

    const observer = new IntersectionObserver(handleObserve, options);

    observer.observe(elementToObserve);

    return () => {
      observer.disconnect();
    };
  }, [options, active]);

  return [ref, inView] as const;
};
