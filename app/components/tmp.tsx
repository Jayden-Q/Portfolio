"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RevealText from "./RevealText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const styles = {
  portraitStyle: "absolute bottom-[-150px] z-[2] h-[90%] lg:h-full w-auto object-contain",
  circularTextStyle: "w-full h-auto",
  circularTextWrapStyle: "absolute top-[50%] sm:top-[55%] md:top-[50%] lg:top-[45%] w-[clamp(0px,300vw,1600px)] max-w-none xl:w-full",
};

const Hero = () => {
  const circularTextRef = useRef(null);
  const jaydenRef = useRef(null);
  const qinRef = useRef(null);
  const portraitRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

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

        resetTween?.kill();

        spin.timeScale(boostedScale);

        resetTween = gsap.to(spin, {
          timeScale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.to(jaydenRef.current, {
       x: -200,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(qinRef.current, {
        x: 150,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.to(jaydenRef.current, {
        x: -150,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(qinRef.current, {
        x: 100,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="customSection" id="hero">
      <div className="customContainer">
        <div ref={jaydenRef}>
          <RevealText
            as="h1"
            text="Jayden"
            className="mainTitle text-left sm:text-left"
            stagger={0.05}
            mode="word"
          />
        </div>

        <div ref={qinRef}>
          <RevealText
            as="h1"
            text="Qin"
            className="mainTitle text-right xl:mr-20 sm:text-right"
            stagger={0.05}
            delay={0.25}
            mode="char"
          />
        </div>
      </div>

      <Image
        src="/portrait-grayscale-optimized-no-bg.png"
        width={500}
        height={500}
        alt="portrait"
        className={styles.portraitStyle}
        ref={portraitRef}
      />

      <div className={styles.circularTextWrapStyle} ref={circularTextRef}>
        <Image
          src="/web-designer.svg"
          width={500}
          height={500}
          alt="web-designer"
          className={styles.circularTextStyle}
          id="web-designer-text"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default Hero;
