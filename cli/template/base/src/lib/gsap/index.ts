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

export { CSSRulePlugin, DURATION, Flip, gsap, ScrollTrigger, SplitText };
