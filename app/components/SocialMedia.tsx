import Image from "next/image";

const SocialMedia = () => {
  return (
    <div className="fixed left-8 bottom-8 z-[999]">
      <ul className="flex flex-col gap-2.5">
        
        <li>
          <a
            href="https://www.instagram.com/jaydenqin_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 p-2 rounded-full border-2 border-[#333]"
          >
            <Image src="/instagram.svg" width={20} height={20} alt="instagram" />
          </a>
        </li>

        <li>
          <a
            href="https://x.com/jaydenqin_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 p-2 rounded-full border-2 border-[#333]"
          >
            <Image src="/twitter.svg" width={20} height={20} alt="twitter" />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/jaydenqin/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 p-2 rounded-full border-2 border-[#333]"
          >
            <Image src="/linkedin.svg" width={20} height={20} alt="linkedin" />
          </a>
        </li>

      </ul>
    </div>
  );
};

export default SocialMedia;