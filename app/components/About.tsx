import Image from "next/image";

import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "I'm Jayden, a web designer and",
  "developer. I specialize in building",
  "landing pages for SaaS businesses.",
];

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {

      if (!textRef.current || !sectionRef.current) return;

      const chars = textRef.current.querySelectorAll(".about-char");

      gsap.set(chars, { color: "#CCCCCC" });

      gsap.to(chars, {
        color: "#333333",
        duration: 0.01,
        ease: "none",
        stagger: 0.01,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600",
          scrub: true,
          pin: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      className="relative min-h-screen flex justify-center py-40"
      id="about"
      ref={sectionRef}
    >
      <div className="relative container max-w-350 z-1">
        <h2
          ref={textRef}
          className="mx-auto text-[clamp(2.25rem,5vw,5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#EEE]"
        >
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.split("").map((char, charIndex) => (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  className="about-char inline-block text-[#EEE]"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

// type PillProps = {
//   bg: string;
//   textColor: string;
//   icon: string;
//   iconAlt?: string;
//   children: ReactNode;
// };

// const Pill = ({ bg, textColor, icon, children }: PillProps) => {
//   return (
//     <span
//       className={`inline-flex items-center gap-2 px-4 rounded-full leading-[135%] ${bg} ${textColor}`}
//     >
//       <Image src={icon} width={48} height={48} alt="icon" />
//       <span>{children}</span>
//     </span>
//   );
// };

// const About = () => {
//   return (
//     <section
//       className="relative min-h-screen flex justify-center py-40"
//       id="about"
//     >
//       <div className="relative container max-w-350 z-1">
//         <h2 className="text-[60px] text-[#333] font-bold leading-[150%]">
//           I&apos;m Jayden, a{" "}
//           <Pill
//             bg="bg-[#D2FF9A]"
//             textColor="text-[#81BD36]"
//             icon="/iconoir_design-nib-solid.svg"
//             iconAlt="Design icon"
//           >
//             web designer
//           </Pill>{" "}
//           and{" "}
//           <Pill
//             bg="bg-[#BFE3F8]"
//             textColor="text-[#4DA3D9]"
//             icon="/tabler_code.svg"
//             iconAlt="Code icon"
//           >
//             developer
//           </Pill>
//           . I specialize in building{" "}
//           <Pill
//             bg="bg-[#F8B4B4]"
//             textColor="text-[#D94D4D]"
//             icon="/lucide_globe.svg"
//             iconAlt="Globe icon"
//           >
//             landing pages
//           </Pill>{" "}
//           for SaaS businesses.
//         </h2>
//       </div>
//     </section>
//   );
// };

export default About;
