"use client";

import React, { MutableRefObject, useEffect, useRef } from "react";
import Typed from "typed.js";
import Image from "next/image";
import { gsap, Linear } from "gsap";
import Button, { ButtonTypes } from "../common/button";
import HeroImage from "./hero-image";
import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from "../../constants";

const HERO_STYLES = {
  SECTION:
    "w-full flex md:items-center py-8 section-container min-h-screen relative mb-24",
  CONTENT: "font-medium flex flex-col pt-32 md:pt-0 select-none",
  SOCIAL_LINK: "link hover:opacity-80 duration-300 md:mr-4 mr-2",
  BG_WRAPPER:
    "absolute hero-bg right-0 md:bottom-0 bottom-8 -z-1 md:w-3/4 w-full scale-125 sm:scale-100 flex items-end",
  TYPED_SPAN: "text-xl sm:text-2xl md:text-4xl seq",
};

const HeroSection = React.memo(() => {
  const typedSpanElement: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // Typed.js initialization
  const initTypeAnimation = () => {
    return new Typed(typedSpanElement.current!, {
      strings: TYPED_STRINGS,
      typeSpeed: 40,
      backSpeed: 30,
      backDelay: 1000,
      loop: true,
      fadeOut: true,
    });
  };

  // GSAP intro reveal animation
  const initRevealAnimation = () => {
    if (!targetSection.current) return;

    const tl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    tl.to(targetSection.current, { opacity: 1, duration: 1.2 })
      .from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, y: 20, duration: 0.5, stagger: 0.25 },
        "<"
      );

    return tl;
  };

  useEffect(() => {
    const typed = initTypeAnimation();
    initRevealAnimation();

    return () => {
      typed.destroy();
    };
  }, []);

  const renderBackgroundImage = (): React.ReactNode => (
    <div className={HERO_STYLES.BG_WRAPPER} style={{ maxHeight: "650px" }}>
      <HeroImage />
    </div>
  );

  const renderSocialLinks = (): React.ReactNode =>
    Object.keys(SOCIAL_LINKS).map((el: keyof typeof SOCIAL_LINKS) => (
      <a
        href={SOCIAL_LINKS[el]}
        key={el}
        className={HERO_STYLES.SOCIAL_LINK}
        rel="noreferrer"
        target="_blank"
      >
        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
      </a>
    ));

  const renderHeroContent = (): React.ReactNode => (
    <div className={HERO_STYLES.CONTENT}>
      <div className="mb-2 md:mb-4">
        <h2 className="text-4xl seq">Hello 👋🏻</h2>
        <h1 className="text-3xl seq">I'm Yash Pokharna</h1>
      </div>
      <p className="mb-4">
        <span className={HERO_STYLES.TYPED_SPAN} ref={typedSpanElement}></span>
      </p>
      <div className="flex mb-5 seq">{renderSocialLinks()}</div>
      <div className="flex seq">
        <Button
          classes="mr-3"
          type={ButtonTypes.OUTLINE}
          name="Resume"
          href="/Yash_Resume.pdf"
          otherProps={{
            target: "_blank",
            rel: "noreferrer",
          }}
        />
        <Button
          classes="ml-3"
          type={ButtonTypes.PRIMARY}
          name="Let's Talk"
          href="mailto:yashpokharna2002@gmail.com"
          otherProps={{
            target: "_blank",
            rel: "noreferrer",
          }}
        />
      </div>
    </div>
  );

  const { ref: heroSectionRef } = MENULINKS[0];

  return (
    <section
      className={HERO_STYLES.SECTION}
      id={heroSectionRef}
      ref={targetSection}
      style={{ opacity: 0 }}
    >
      {renderHeroContent()}
      {renderBackgroundImage()}
    </section>
  );
});

HeroSection.displayName = "LandingHero";

export default HeroSection;
