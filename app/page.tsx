"use client";

import SocialMedia from "./components/SocialMedia";

import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Services from "./components/Services";
import TechStack from "./components/TechStack";

const page = () => {
  return (
    <main className="bg-red-200 sm:bg-yellow-200 md:bg-green-200 lg:bg-orange-200 xl:bg-purple-200">
      <SocialMedia />

      <Hero />
      <Portfolio />
      <About />
      <Services />
      <TechStack />

      {/* <section className="min-h-screen"></section> */}
    </main>
  );
};

export default page;
