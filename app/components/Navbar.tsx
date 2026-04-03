import Link from "next/link";
import HoverFlipText from "./HoverFlipText";

const textStyle =
  "font-semibold uppercase text-[#333] text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap";

const Navbar = () => {
  return (
    <nav className="fixed top-4 sm:top-5 left-0 w-full flex justify-center z-[999] px-3 sm:px-4">
      <ul className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 border-2 border-[#333] rounded-full bg-white w-fit max-w-full">
        <li>
          <Link href="/">
            <HoverFlipText as="p" text="Home" className={textStyle} />
          </Link>
        </li>
        <li>
          <Link href="#portfolio">
            <HoverFlipText as="p" text="Portfolio" className={textStyle} />
          </Link>
        </li>
        <li>
          <Link href="#services">
            <HoverFlipText as="p" text="Services" className={textStyle} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;