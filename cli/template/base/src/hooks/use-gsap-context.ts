import { useLayoutEffect } from "react";

import { gsap } from "../lib/gsap";

export const useGsapContext = (
  func: gsap.ContextFunc,
  deps: React.DependencyList = []
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(func);

    return () => {
      ctx?.revert();
    };
  }, deps);
};
