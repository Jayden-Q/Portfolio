"use client";

import { useRef } from "react";
import type { ElementType } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Mode = "word" | "char" | "line";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: Mode;
  start?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
};

const RevealText = ({
  text,
  as: Tag = "p",
  className = "",
  mode = "word",
  start = "top 80%",
  stagger,
  delay,
  duration = 1,
}: RevealTextProps) => {
  const textRef = useRef<HTMLElement | null>(null);

  const getStagger = () => {
    if (stagger !== undefined) return stagger;
    if (mode === "char") return 0.015;
    if (mode === "word") return 0.06;
    return 0.15;
  };

  useGSAP(() => {
    if (!textRef.current) return;

    const targets = textRef.current.querySelectorAll(".reveal-inner");

    gsap.fromTo(
      targets,
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: "power4.out",
        duration,
        stagger: getStagger(),
        delay,
        scrollTrigger: {
          trigger: textRef.current,
          start,
          toggleActions: "play none none none",
        },
      }
    );
  }, [mode, start, stagger, delay, duration]);

  const renderLine = (line: string, lineIndex: number) => {
    if (mode === "line") {
      return (
        <span key={lineIndex} className="block overflow-hidden">
          <span className="reveal-inner block will-change-transform">
            {line}
          </span>
        </span>
      );
    }

    if (mode === "word") {
      return (
        <span key={lineIndex}>
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={`${lineIndex}-${wordIndex}`}
              className="inline-block overflow-hidden align-bottom mr-[0.25em]"
            >
              <span className="reveal-inner inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </span>
      );
    }

    // char mode:
    // wrap each WORD in whitespace-nowrap so characters animate individually
    // but the browser only wraps between words, not between characters
    return (
      <span key={lineIndex}>
        {line.split(" ").map((word, wordIndex) => (
          <span
            key={`${lineIndex}-${wordIndex}`}
            className="inline-block whitespace-nowrap mr-[0.25em]"
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${wordIndex}-${charIndex}`}
                className="inline-block overflow-hidden align-bottom"
              >
                <span className="reveal-inner inline-block will-change-transform">
                  {char}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    );
  };

  return (
    <Tag ref={textRef} className={className}>
      {text.split("\n").map((line, i) => (
        <span key={i} className={mode === "line" ? "block" : undefined}>
          {renderLine(line, i)}
          {mode !== "line" && i < text.split("\n").length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;