import Link from "next/link";
import HoverFlipText from "./HoverFlipText";

const styles = {

  textStyle:
    "font-semibold uppercase text-[16px] sm:text-[16px] md:text-[18px] whitespace-nowrap",
  
  navbarContainerStyle:
    `fixed top-4 sm:top-5 left-0 w-full flex justify-center z-[10] px-3 sm:px-4`,

  navbarStyle:
    `flex items-center justify-center
    gap-6 md:gap-8 lg:gap-10
    px-6 md:px-8 lg:px-10   py-2 sm:py-3 md:py-4
    border-2 border-[#333] rounded-full w-fit max-w-full bg-white/50 backdrop-blur-md`
}

const Navbar = () => {
  return (
    <nav className={styles.navbarContainerStyle}>
      <ul className={styles.navbarStyle}>
        <li>
          <Link href="/">
            <HoverFlipText as="p" text="Home" className={styles.textStyle} />
          </Link>
        </li>
        <li>
          <Link href="#portfolio">
            <HoverFlipText as="p" text="Portfolio" className={styles.textStyle} />
          </Link>
        </li>
        <li>
          <Link href="#services">
            <HoverFlipText as="p" text="Services" className={styles.textStyle} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;