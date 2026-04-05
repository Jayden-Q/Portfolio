import Image from "next/image";

import TextStrip from "./TextStrip";

import RevealText from "./RevealText";

const styles = {
  toolTitle: "text-[20px] md-[24px] xl:text-[28px] font-bold",
  toolDescription: "text-[16px] md:text-[20px] xl:text-[24px] text-[#777] font-medium"
};

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
    <div className="flex items-center gap-7">
      <Image src={iconSrc} width={52} height={52} alt={`${title} icon`} className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] xl:w-[52px] xl:h-[52px]" />
      <div className="flex flex-col">
        <RevealText
          as="h3"
          text={title}
          className={styles.toolTitle}
          stagger={0.05}
          mode="char"
        />
        <RevealText
          as="p"
          text={description}
          className={styles.toolDescription}
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
      className="relative flex justify-center py-20 lg:py-40"
    >
      <div
        className="flex-col gap-20 px-8 md:px-20 relative container max-w-350 flex md:justify-between items-start z-1 md:flex-row"
      >
        <RevealText
          as="h2"
          text={"Tech Stack"}
          className="w-full leading-[100%] font-bold uppercase md:basis-0 text-[40px] sm:text-[48px] md:text-[60px] lg:text-[80px] xl:text-[120px] xl:max-w-[31.25rem]"
          stagger={0.05}
          mode="char"
        />

        <ul className="flex flex-row gap-10 w-full flex-wrap md:max-w-[400px] md:flex-col">
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
