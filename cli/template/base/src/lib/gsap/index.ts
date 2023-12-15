import gsap from "gsap";
import { CSSRulePlugin } from "gsap/dist/CSSRulePlugin";
import { CustomEase } from "gsap/dist/CustomEase";
import { Flip } from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

let GSDevTools;

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const RECIPROCAL_GR = 1 / GOLDEN_RATIO;
const DURATION = Number(RECIPROCAL_GR.toFixed(3));

if (process.env.NODE_ENV === "development") {
  import("gsap/dist/GSDevTools").then((GSDevToolsLib) => {
    GSDevTools = GSDevToolsLib.GSDevTools;
    gsap.registerPlugin(GSDevTools);
  });
}
gsap.defaults({
  duration: DURATION,
  ease: "expo.out",
});

gsap.registerPlugin(Flip, ScrollTrigger, CSSRulePlugin, SplitText, CustomEase);

gsap.config({
  nullTargetWarn: false,
  autoSleep: Infinity,
});

const coolEase = "cubic-bezier(0.645, 0.045, 0.355, 1)";
// const test1 = 'cubic-bezier(0.175,0.885,0.32,1.1)'
// const fastEase = 'cubic-bezier(0.19,1,0.22,1)'

gsap.defaults({
  ease: coolEase,
});

gsap.registerEffect({
  name: "textCoolFadeIn",
  extendTimeline: true,
  defaults: {
    duration: 1.6,
    ease: coolEase,
  },
  effect: (targets: any, config: any) => {
    const tl = gsap.timeline();

    const textSplit = new SplitText(targets, {
      type: "lines, words",
      linesClass: "line",
      wordsClass: "word",
    });

    tl.fromTo(
      targets,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: config.duration,
        ease: config.ease,
      }
    )
      .from(
        textSplit.lines,
        {
          stagger: 0.1,
          duration: config.duration,
          ease: config.ease,
          autoAlpha: 0,
          yPercent: -80,
        },
        0
      )
      .from(
        textSplit.words,
        {
          stagger: 0.04,
          duration: config.duration,
          ease: config.ease,
          autoAlpha: 0,
          yPercent: 160,
        },
        0
      );

    return tl;
  },
});

gsap.registerEffect({
  name: "basicFade",
  extendTimeline: true,
  defaults: {
    duration: 0.5,
    ease: "linear",
  },
  effect: (targets: any, config: any) => {
    const tl = gsap.timeline();

    tl.fromTo(
      targets,
      {
        autoAlpha: 0,
      },
      {
        duration: config.duration,
        ease: config.ease,
        autoAlpha: 1,
      }
    );

    return tl;
  },
});

export { CSSRulePlugin, DURATION, Flip, gsap, ScrollTrigger, SplitText };
