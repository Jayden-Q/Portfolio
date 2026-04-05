"use client"

import Image from "next/image";

import HoverFlipText from "./HoverFlipText";

import { sendGAEvent } from "@next/third-parties/google";

const styles = {};

const links = [
  { text: "Home", href: "/", external: false },
  { text: "Portfolio", href: "#portfolio", external: false },
  { text: "Services", href: "#services", external: false },
  {
    text: "Instagram",
    href: "https://www.instagram.com/jaydenqin_",
    external: true,
  },
  { text: "Twitter", href: "https://x.com/jaydenqin_", external: true },
];

const Footer = () => {
  return (
    <footer className="relative pt-40 md:pt-20 lg:pt-32 xl:pt-40">
      <ul className="flex flex-col flex-wrap justify-center items-center gap-8 sm:gap-10 px-16 w-full sm:flex-row">
        {links.map((link, index) => (
          <li
            className="flex items-center uppercase text-[16px] sm:text-[16px] md:text-[18px] whitespace-nowrap font-medium"
            key={index}
          >
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1 sm:gap-2"
                onClick={() =>
                  sendGAEvent("event", "footer_social_media_clicked", {
                    event_category: "engagement",
                    event_label: link.text,
                  })
                }
              >
                <HoverFlipText as="p" text={link.text} className="" />
                <Image
                  src="/link-icon.svg"
                  width={20}
                  height={20}
                  alt="Link icon"
                  className="w-auto h-full"
                />
              </a>
            ) : (
              <a href={link.href}>
                <HoverFlipText as="p" text={link.text} className="" />
              </a>
            )}
          </li>
        ))}
      </ul>

      <div className="relative h-auto bottom-0 w-full overflow-hidden my-4">
        <Image
          src="name-text.svg"
          width={500}
          height={500}
          alt="Jayden Qin"
          className="mx-auto w-auto h-auto shrink-0"
        />
      </div>
    </footer>
  );
};

export default Footer;
