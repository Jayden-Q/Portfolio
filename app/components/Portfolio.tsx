"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TextStrip from "./TextStrip";
import RevealText from "./RevealText";

import { sendGAEvent } from "@next/third-parties/google";

gsap.registerPlugin(useGSAP);

const work = [
  {
    title: "Interior Design Hero Section",
    imageSrc: "/portfolio/interior-design-hero.png",
    imageAlt: "Interior design",
  },
  {
    title: "Bento Design",
    imageSrc: "/portfolio/bento.png",
    imageAlt: "Interior design",
  },
  {
    title: "Orbit Hero Section",
    imageSrc: "/portfolio/orbit.png",
    imageAlt: "Interior design",
  },
  {
    title: "Calendar",
    imageSrc: "/portfolio/calendar.png",
    imageAlt: "Interior design",
  },
];

const Portfolio = () => {
  const duplicatedWork = useMemo(() => [...work, ...work], []);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");

  const isModalOpen = activeIndex !== null;

  function closeModal() {
    setActiveIndex(null);
    setZoomed(false);
    setTransformOrigin("50% 50%");
  }

  function showPrev() {
    if (activeIndex === null) return;
    setZoomed(false);
    setTransformOrigin("50% 50%");
    setActiveIndex((activeIndex - 1 + work.length) % work.length);

    sendGAEvent("event", "project_prev_clicked", {
      event_category: "engagement",
    });
  }

  function showNext() {
    if (activeIndex === null) return;
    setZoomed(false);
    setTransformOrigin("50% 50%");
    setActiveIndex((activeIndex + 1) % work.length);

    sendGAEvent("event", "project_next_clicked", {
      event_category: "engagement",
    });
  }

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (activeIndex === null) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const createAnimation = () => {
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }

        const totalWidth = track.scrollWidth;
        const singleSetWidth = totalWidth / 2;

        gsap.set(track, { x: -singleSetWidth });

        tweenRef.current = gsap.to(track, {
          x: 0,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      };

      createAnimation();

      const handleResize = () => createAnimation();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        tweenRef.current?.kill();
      };
    },
    { dependencies: [duplicatedWork] },
  );

  useEffect(() => {
    if (!tweenRef.current) return;

    if (isModalOpen) {
      tweenRef.current.pause();
      document.body.style.overflow = "hidden";
    } else {
      tweenRef.current.resume();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (index: number) => {
    setActiveIndex(index % work.length);
    setZoomed(false);
    setTransformOrigin("50% 50%");

    sendGAEvent("event", "project_clicked", {
      event_category: "engagement",
    });
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setTransformOrigin(`${x}% ${y}%`);
      setZoomed(true);
    } else {
      setZoomed(false);
      setTransformOrigin("50% 50%");
    }
  };

  return (
    <section
      className="relative min-h-screen flex justify-center overflow-hidden px-4 py-10 xl:py-40 sm:px-6 xl:px-10"
      id="portfolio"
    >
      <div className="relative container z-1 mb-[100px] max-w-350">
        <div className="mb-16 flex flex-col items-start justify-between gap-5 px-4 md:px-5 lg:px-20 xl:px-5 md:flex-row md:items-center md:gap-20">
          <h2 className="sr-only">
            Recent Work
          </h2>
          <p className="sr-only">
            A selection of my recent work, with more projects to be added soon.
          </p>
          
          <RevealText
            as="h2"
            text="Recent Work"
            className="w-full text-[40px] leading-[100%] font-bold uppercase sm:text-[48px] md:basis-0 md:text-[60px] lg:text-[80px] xl:max-w-[31.25rem] xl:text-[120px]"
            stagger={0.05}
            mode="char"
          />
          <RevealText
            as="p"
            text="A selection of my recent work, with more projects to be added soon."
            className="w-full text-[18px] leading-[140%] lg:text-[24px] xl:max-w-[31.25rem] xl:text-[28px]"
          />
        </div>

        <div className="relative w-full">
          <div
            ref={trackRef}
            className="flex w-max gap-6 px-6 will-change-transform"
          >
            {duplicatedWork.map((item, index) => (
              <button
                key={`${item.imageSrc}-${index}`}
                type="button"
                onClick={() => openModal(index)}
                onDragStart={(e) => e.preventDefault()}
                className="group relative w-[min(80vw,420px)] shrink-0 cursor-pointer select-none text-left transition-transform duration-200 hover:scale-[1.05]"
                aria-label={`Open ${item.title}`}
              >
                <div className="relative h-[clamp(200px,60vw,300px)] sm:h-[300px] overflow-hidden rounded-[24px] border-2 border-black/10">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[25%] sm:bottom-[20%] md:bottom-[15%] lg:bottom-[10%] xl:bottom-0 w-full overflow-hidden">
        <TextStrip imgSrc="/portfolio-text.svg" alt="Portfolio text" />
      </div>

      {isModalOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-6 py-10"
          onClick={closeModal}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-6 right-6 z-[110] flex h-12 w-12 text-[40px] text-white items-center justify-center rounded-full hover:scale-[1.15] transition duration-100 cursor-pointer"
            aria-label="Close image"
          >
            <Image src="/x.svg" width={24} height={24} alt="×" />
          </button>

          <div
            className="relative w-full max-w-[800px] xl:max-w-[1200px] rounded-[24px]"
            onClick={(e) => {
              e.stopPropagation();
              handleZoom(e);
            }}
          >
            <div className="w-full h-auto max-h-[80vh] md:w-auto lg:h-[80vh] relative">
              <Image
                src={work[activeIndex].imageSrc}
                alt={work[activeIndex].imageAlt}
                // fill
                width={500}
                height={500}
                draggable={false}
                // sizes="90vw"
                className={`w-full h-full border-2 p-4 object-contain select-none transition-transform duration-300 ease-out ${
                  zoomed
                    ? "scale-[2.2] cursor-zoom-out"
                    : "scale-100 cursor-zoom-in"
                }`}
                style={{ transformOrigin }}
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-6 lg:left-[-80px] z-[110] flex h-14 w-14 items-center justify-center rounded-full text-white text-3xl hover:scale-[1.25] transition duration-100 cursor-pointer bottom-[-60px] lg:bottom-[50%]"
                aria-label="Previous image"
              >
                <Image src="/chevron-left.svg" width={24} height={24} alt="←" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-6 lg:right-[-80px] z-[110] flex h-14 w-14 items-center justify-center rounded-full text-white text-3xl hover:scale-[1.25] transition duration-100 cursor-pointer bottom-[-60px] lg:bottom-[50%]"
                aria-label="Next image"
              >
                <Image
                  src="/chevron-right.svg"
                  width={24}
                  height={24}
                  alt="→"
                />
              </button>

              {/* <div className="absolute bottom-0 justify-self-center rounded-full bg-black/55 px-4 py-2 text-white">
                Click image to {zoomed ? "zoom out" : "zoom in"}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
