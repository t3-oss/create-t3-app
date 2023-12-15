/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from "react";

import { gsap } from "../lib/gsap";

export const useGsapContext = (func: gsap.ContextFunc, deps: any[] = []) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(func);

    return () => {
      ctx?.revert();
    };
  }, deps);
};
