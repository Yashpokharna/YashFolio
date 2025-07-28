"use client";

import React, { MutableRefObject, useEffect, useRef } from "react";
import Typed from "typed.js";
import Image from "next/image";
import { gsap } from "gsap";
import Button, { ButtonTypes } from "../common/button";
import HeroImage from "./hero-image";
import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from "../../constants";
import { useLoading } from "../../context/LoadingContext";

const HERO_STYLES = {
  SECTION:
    "w-full flex md:items-center py-8 section-container min-h-screen relative mb-24",
  CONTENT: "font-medium flex flex-col pt-32 md:pt-0 select-none",
  SOCIAL_LINK: "link hover:opacity-80 duration-300 md:mr-4 mr-2",
  BG_WRAPPER:
    "absolute hero-bg right-0 md:bottom-0 bottom-8 -z-1 md:w-3/4 w-full scale-125 sm:scale-100 flex items-end",
  TYPED_SPAN:
    "text-xl sm:text-2xl md:text-4xl seq antialiased font-semibold tracking-wide",
};

const HeroSection = React.memo(() => {
  const typedSpanElement: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const { isLoaded } = useLoading();

  const initTypeAnimation = () => {
    if (!typedSpanElement.current || typedInstanceRef.current) return null;

    const typed = new Typed(typedSpanElement.current, {
      strings: TYPED_STRINGS,
      typeSpeed: 60,
      startDelay: 0, // Reduced from 300ms to 0ms
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
      fadeOut: false,
    });

    typedInstanceRef.current = typed;
    return typed;
  };

  const initRevealAnimation = () => {
    if (!targetSection.current) return;

    // Get all elements to animate
    const elements = targetSection.current.querySelectorAll(".seq");
    const heroImage = targetSection.current.querySelector(".hero-bg");
    
    if (elements.length === 0) return;

    // Create timeline for entrance animations
    const tl = gsap.timeline();
    
    // Animate elements from their hidden state to visible
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15, // Stagger each element by 0.15s
    });

    // Animate hero image if it exists
    if (heroImage) {
      tl.to(heroImage, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.5"); // Start 0.5s before the previous animation ends
    }
  };

  useEffect(() => {
    // Initialize immediately when component mounts
    if (typeof window !== 'undefined' && typedSpanElement.current) {
      try {
        const typed = initTypeAnimation();
        
        // Add a small delay for GSAP animation to let typed animation start first
        setTimeout(() => {
          initRevealAnimation();
        }, 200);
        
        console.log('Animations started successfully');
      } catch (error) {
        console.error('Animation initialization error:', error);
      }
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array - runs once on mount

  // Keep this for debugging
  useEffect(() => {
    console.log('Hero: isLoaded =', isLoaded);
  }, [isLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, []);

  const renderBackgroundImage = (): React.ReactNode => (
    <div className={`${HERO_STYLES.BG_WRAPPER} hero-bg opacity-0 scale-75`} style={{ maxHeight: "650px" }}>
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
        <h2 className="text-4xl font-semibold seq opacity-0 translate-y-[30px]">Hello 👋🏻</h2>
        <h1 className="text-3xl font-semibold seq opacity-0 translate-y-[30px]">I'm Yash Pokharna</h1>
      </div>
      <p className="mb-4 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] seq opacity-0 translate-y-[30px]">
        <span className={HERO_STYLES.TYPED_SPAN} ref={typedSpanElement}></span>
      </p>
      <div className="flex mb-5 seq opacity-0 translate-y-[30px]">{renderSocialLinks()}</div>
      <div className="flex seq opacity-0 translate-y-[30px]">
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
          href={`mailto:${EMAIL}`}
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
    >
      {renderHeroContent()}
      {renderBackgroundImage()}
    </section>
  );
});

HeroSection.displayName = "LandingHero";

export default HeroSection;