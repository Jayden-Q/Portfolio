import Image from "next/image";

const socialMediaStyle =
  "flex items-center justify-center w-10 h-10 p-2 rounded-full border-2 border-[#333] transition-transform duration-200 hover:scale-[1.15]";

const socialMediaList = [
  {
    link: "https://www.instagram.com/jaydenqin_",
    iconSrc: "/instagram.svg",
    iconAlt: "Instagram",
  },
  {
    link: "https://x.com/jaydenqin_",
    iconSrc: "/twitter.svg",
    iconAlt: "Twitter",
  },
  {
    link: "https://www.linkedin.com/in/jaydenqin",
    iconSrc: "/linkedin.svg",
    iconAlt: "Linkedin",
  },
];

const SocialMedia = () => {
  return (
    <div className="fixed left-4 md:left-8 bottom-8 z-[10]">
      <ul className="flex flex-col gap-2.5">
        {socialMediaList.map((socialMedia, index) => (
          <li key={index}>
            <a
              href={socialMedia.link}
              target="_blank"
              rel="noopener noreferrer"
              className={socialMediaStyle}
            >
              <Image
                src={socialMedia.iconSrc}
                width={20}
                height={20}
                alt={socialMedia.iconAlt}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMedia;
