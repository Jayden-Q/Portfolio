import Image from "next/image";

import RevealText from "./RevealText";

type PricingCardProps = {
  title: string;
  price: number;
  benefits: Array<string>;
};

const PricingCard = ({ title, price, benefits }: PricingCardProps) => {
  return (
    <div className="flex flex-col border-2 border-[#333] rounded-2xl px-10 py-7 max-w-[400px]">
      <div className="flex flex-col">
        <RevealText
          as="h3"
          text={title}
          className="text-[28px] text-[#333] font-medium"
          stagger={0.05}
          mode="word"
        />

        <div className="flex items-center">
          <h3 className="text-[40px] text-[#333] font-bold tracking-tight">
            €
          </h3>
          <RevealText
            as="h3"
            text={String(price)}
            className="text-[40px] text-[#333] font-bold tracking-tight"
            stagger={0.05}
            mode="char"
          />
        </div>

        <a
          href="https://calendly.com/jaydenqin_/intro-call"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex justify-center gap-2.5 py-2 rounded-xl border-2 border-[#333] mt-2"
        >
          <Image
            src="logos_google-meet.svg"
            width={28}
            height={28}
            alt="Google Meet icon"
          />
          <p className="text-[24px] text-[#333] font-semibold">Book a call</p>
        </a>
      </div>
      <ul className="flex flex-col gap-2 mt-8">
        {benefits.map((benefit, index) => (
          <li className="flex gap-2" key={index}>
            <Image src="tick.svg" width={24} height={24} alt="tick" />
            <RevealText
              as="p"
              text={benefit}
              className="text-[24px] text-[#333] font-medium"
              stagger={0.05}
              mode="word"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Services = () => {
  return (
    <section
      className="relative min-h-screen flex justify-center py-40"
      id="services"
    >
      <div className="relative container max-w-350 z-1">
        <RevealText
          as="h2"
          text="Services"
          className="text-[120px] text-[#333] font-bold uppercase w-full text-center"
          stagger={0.05}
          mode="char"
        />

        <div className="flex justify-center gap-10 mt-10">
          <PricingCard
            title="Landing page"
            price={500}
            benefits={[
              "1 custom landing page",
              "2-4 week delivery",
              "Copywriting included",
              "Basic SEO",
              "Custom illustrations",
              "Animations",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
