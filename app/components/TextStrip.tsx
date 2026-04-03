import Image from "next/image";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TextStripProps = {
  imgSrc: string;
  alt: string;
};

const TextStrip = ({ imgSrc, alt }: TextStripProps) => {
  const textRef = useRef(null);

  useGSAP(() => {

    const portfolioLoop = gsap.to(textRef.current, {
      xPercent: -50,
      duration: 25,
      repeat: -1,
      ease: "none",
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

        portfolioLoop.timeScale(boostedScale);

        resetTween = gsap.to(portfolioLoop, {
          timeScale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });

    // Parallax
    gsap.to(textRef.current, {
      y: -100,
      scrollTrigger: {
        trigger: "#portfolio",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="w-full overflow-hidden pt-[100px]">
      <div className="flex w-max will-change-transform" ref={textRef}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Image
            key={i}
            src={imgSrc}
            width={500}
            height={500}
            alt={alt}
            className="w-auto h-auto shrink-0 mr-10"
          />
        ))}
      </div>
    </div>
  );
};

export default TextStrip;
