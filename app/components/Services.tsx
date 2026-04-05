import Image from "next/image";

import RevealText from "./RevealText";

import { sendGAEvent } from "@next/third-parties/google";

const styles = {
  pricingCard:
    "flex flex-col border-2 border-[#333] rounded-2xl px-10 py-7 w-full max-w-[400px]",
  cta: "w-full flex justify-center items-center gap-2.5 py-2 rounded-xl border-2 border-[#333] mt-2 transition-transform hover:scale-[1.05] duration-100",

  serviceTitle:
    "text-[18px] md:text-[20px] xl:text-[24px] leading-[115%] font-medium uppercase",
  price: "text-[28px] md:text-[36px] xl:text-[40px] font-bold tracking-tight",
  ctaText: "text-[16px] md:text-[20px] xl:text-[24px] font-semibold",
  benefit: "text-[16px] md:text-[18px] xl:text-[20px] font-medium",
};

type PricingCardProps = {
  title: string;
  price: number;
  benefits: Array<string>;
};

const PricingCard = ({ title, price, benefits }: PricingCardProps) => {
  return (
    <div className={styles.pricingCard}>
      <div className="flex flex-col">
        {/* TITLE */}
        <RevealText
          as="h3"
          text={title}
          // className="text-[28px] font-medium"
          className={styles.serviceTitle}
          stagger={0.05}
          mode="word"
        />

        {/* PRICE */}
        <div className="flex items-center">
          <h3
            // className="text-[40px] font-bold tracking-tight"
            className={styles.price}
          >
            €
          </h3>
          <RevealText
            as="h3"
            text={String(price)}
            className={styles.price}
            stagger={0.05}
            mode="char"
          />
        </div>

        {/* CTA */}
        <a
          href="https://calendly.com/jaydenqin_/intro-call"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          onClick={() =>
            sendGAEvent("event", "service_clicked", {
              event_category: "engagement",
              event_label: title
            })
          }
        >
          <Image
            src="logos_google-meet.svg"
            width={28}
            height={28}
            alt="Google Meet icon"
            className="w-[24px] h-[24px] xl:w-[28px] xl:h-[28px]"
          />
          <p className={styles.ctaText}>Book a call</p>
        </a>
      </div>

      {/* BENEFITS */}
      <ul className="flex flex-col gap-2 mt-[20px]">
        {benefits.map((benefit, index) => (
          <li className="flex items-center gap-2" key={index}>
            <Image src="tick.svg" width={24} height={24} alt="tick" />
            <RevealText
              as="p"
              text={benefit}
              className={styles.benefit}
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
      className="relative flex justify-center py-20 lg:py-40 px-4"
      id="services"
    >
      <div className="relative container max-w-350 z-1">
        <RevealText
          as="h2"
          text="Services"
          className="w-full text-center leading-[100%] font-bold uppercase text-[40px] sm:text-[48px] md:text-[60px] lg:text-[80px] xl:text-[120px]"
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
