"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const text =
  "I'm Jayden, a web designer and developer. I specialize in building landing pages for SaaS businesses.";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current) return;

    const chars = textRef.current.querySelectorAll(".about-char");

    gsap.set(chars, { color: "#CCCCCC" });

    gsap.to(chars, {
      color: "#333333",
      duration: 0.01,
      ease: "none",
      stagger: 0.01,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: `top top`,
        end: "+=600",
        scrub: true,
        pin: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[90vh] flex items-start justify-center pt-40 md:py-40"
    >
      <div className="w-full max-w-[1400px] px-4 md:px-20">
        <p className="sr-only">{text}</p>

        <p
          ref={textRef}
          className="mx-auto text-[clamp(2rem,7vw,5rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
          aria-hidden="true"
        >
          {text.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.25em]">
              {word.split("").map((char, charIndex) => (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  className="about-char inline text-[#CCCCCC]"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}