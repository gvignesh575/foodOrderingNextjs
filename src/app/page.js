import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p className="text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            unde expedita quia, optio qui cum voluptatum corrupti,
            necessitatibus iusto libero autem aut exercitationem, modi esse eius
            non et porro ullam.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            unde expedita quia, optio qui cum voluptatum corrupti,
            necessitatibus iusto libero autem aut exercitationem, modi esse eius
            non et porro ullam.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            repellat neque enim? Amet recusandae unde maxime explicabo corporis
            maiores suscipit quis, voluptas earum eius! Voluptate officiis aut
            temporibus cupiditate quidem?
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+911234567890"
          >
            +91 1234567890
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
