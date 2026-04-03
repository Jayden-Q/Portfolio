import Image from "next/image";

import TextStrip from "./TextStrip";

import RevealText from "./RevealText";

const tools = [
  {
    title: "Figma",
    description: "UI design tool",
    iconSrc: "solar_figma-bold-duotone.svg",
  },
  {
    title: "Webflow",
    description: "Website builder",
    iconSrc: "lineicons_webflow.svg",
  },
  {
    title: "Rive",
    description: "Animation tool",
    iconSrc: "simple-icons_rive.svg",
  },
  {
    title: "NextJS",
    description: "Full-stack framework",
    iconSrc: "ri_nextjs-fill.svg",
  },
  {
    title: "TailwindCSS",
    description: "CSS framework",
    iconSrc: "mdi_tailwind.svg",
  },
  {
    title: "GitHub",
    description: "Version control tool",
    iconSrc: "mdi_github.svg",
  },
];

type ToolProps = {
  title: string;
  description: string;
  iconSrc: string;
};

const Tool = ({ title, description, iconSrc }: ToolProps) => {
  return (
    <div className="flex gap-7">
      <Image src={iconSrc} width={52} height={52} alt={`${title} icon`} />
      <div className="flex flex-col">
        <RevealText
          as="h3"
          text={title}
          className="text-[28px] text-[#333] font-bold"
          stagger={0.05}
          mode="char"
        />
        <RevealText
          as="p"
          text={description}
          className="text-[24px] text-[#777] font-medium"
          stagger={0.05}
          mode="word"
        />
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section
      className="relative min-h-screen flex justify-center py-40"
      id="services"
    >
      <div
        className="flex-col gap-20 px-20 relative container max-w-350 flex justify-between items-start z-1 md:flex-row"
      >
        <RevealText
          as="h2"
          text={"Tech Stack"}
          className="w-full text-[40px] leading-[100%] font-bold uppercase text-[#333] sm:text-[48px] md:text-[60px] lg:text-[80px] xl:text-[120px]"
          stagger={0.05}
          mode="char"
        />

        <ul className="flex flex-col gap-10 w-full max-w-[400px]">
          {tools.map((tool, index) => (
            <li key={index}>
              <Tool
                title={tool.title}
                description={tool.description}
                iconSrc={tool.iconSrc}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 w-full overflow-hidden">
        <TextStrip imgSrc="/tools-text.svg" alt="Tool text" />
      </div>
    </section>
  );
};

export default TechStack;
