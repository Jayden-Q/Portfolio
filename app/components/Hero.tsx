"use client";

import Image from "next/image";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RevealText from "./RevealText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const circularTextRef = useRef(null);
  const jaydenRef = useRef(null);
  const qinRef = useRef(null);
  const portraitRef = useRef(null);

  useGSAP(() => {
    // Circular Text
    const spin = gsap.to(circularTextRef.current, {
      rotate: -360,
      duration: 100,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    let resetTween: gsap.core.Tween | null = null;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        const boostedScale = gsap.utils.clamp(-10, 10, velocity / 200);

        if (resetTween) resetTween.kill();

        spin.timeScale(boostedScale);

        resetTween = gsap.to(spin, {
          timeScale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });

    // Parallax
    gsap.to(jaydenRef.current, {
      y: 150,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(qinRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(portraitRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      className="relative min-h-screen flex justify-center py-40 overflow-hidden"
      id="hero"
    >
      <div className="relative container max-w-350 z-1">
        <RevealText
          as="h1"
          text="Jayden"
          className="text-[200px] text-[#333] font-bold text-left uppercase leading-[100%]"
          stagger={0.05}
          mode="char"
        />

        <RevealText
          as="h1"
          text="Qin"
          className="text-[200px] text-[#333] font-bold text-right mr-20 uppercase leading-[100%]"
          stagger={0.05}
          delay={0.25}
          mode="char"
        />
      </div>

      <Image
        src="/portrait-grayscale-optimized-no-bg.png"
        width={500}
        height={500}
        alt="portrait"
        className="absolute bottom-[-150px] w-auto h-full z-2"
        ref={portraitRef}
      />

      <Image
        src="/web-designer.svg"
        width={500}
        height={500}
        alt="web-designer"
        className="absolute w-full top-[45%]"
        id="web-designer-text"
        ref={circularTextRef}
      />

      {/* <Image
            src="/grainy-background.png"
            width={500}
            height={500}
            alt="background-image"
            className="absolute top-0 left-0 w-full h-full z-[-2]"
            /> */}
    </section>
  );
};

export default Hero;
