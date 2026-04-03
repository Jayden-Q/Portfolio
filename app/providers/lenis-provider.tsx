"use client";

import Lenis from "lenis";

import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisProvider = () => {
  useEffect(() => {
    const lenis = new Lenis({ anchors: true });

    const update = () => ScrollTrigger.update();

    lenis.on("scroll", update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default LenisProvider;
