"use client";

import type { ElementType } from "react";
import clsx from "clsx";

type HoverFlipTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  staggerMs?: number;
};

const HoverFlipText = ({
  text,
  as: Tag = "span",
  className = "",
  staggerMs = 25,
}: HoverFlipTextProps) => {
  const chars = Array.from(text);

  return (
    <Tag
      className={clsx(
        "group inline-flex flex-wrap leading-none cursor-pointer",
        className
      )}
      aria-label={text}
    >
      {chars.map((char, index) => {
        const displayChar = char === " " ? "\u00A0" : char;

        return (
          <span
            key={`${char}-${index}`}
            className="relative inline-block overflow-hidden align-bottom"
            style={{
              height: "1em",
            }}
            aria-hidden="true"
          >
            <span
              className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
              style={{
                transitionDelay: `${index * staggerMs}ms`,
              }}
            >
              {displayChar}
            </span>

            <span
              className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
              style={{
                transitionDelay: `${index * staggerMs}ms`,
              }}
            >
              {displayChar}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};

export default HoverFlipText;