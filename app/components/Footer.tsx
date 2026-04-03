import Image from "next/image";

import HoverFlipText from "./HoverFlipText";

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
    <footer className="relative pt-40">
      <ul className="flex justify-center gap-10 w-full">
        {links.map((link, index) => (
          <li
            className="flex items-center uppercase text-[24px] text-[#333] font-medium"
            key={index}
          >
            {link.external ? (
              <div className="flex gap-4">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2"
                >
                  <HoverFlipText as="p" text={link.text} className="" />
                  <Image
                    src="/link-icon.svg"
                    width={20}
                    height={20}
                    alt="Link icon"
                  />
                </a>
              </div>
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
