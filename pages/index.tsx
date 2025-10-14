import { METADATA } from "../constants";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import HeroSection from "@/components/home/hero";
import ProjectsSection from "@/components/home/projects";
import QuoteSection from "@/components/home/quote";
import SkillsSection from "@/components/home/skills";
import CollaborationSection from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import AboutSection from "@/components/home/about";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useLoading } from "../context/LoadingContext";
import Chemistry from "@/components/home/ChemistryBusinessSection";
import ChemistryBusinessSection from "@/components/home/ChemistryBusinessSection";

const DEBOUNCE_TIME = 100;

export const isSmallScreen = (): boolean => document.body.clientWidth < 767;
export const NO_MOTION_PREFERENCE_QUERY =
  "(prefers-reduced-motion: no-preference)";

export interface IDesktop {
  isDesktop: boolean;
}

export default function Home() {
  const [isDesktop, setisDesktop] = useState(true);
  const { isLoaded } = useLoading();

  let timer: NodeJS.Timeout = null;

  const debouncedDimensionCalculator = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const isDesktopResult =
        typeof window.orientation === "undefined" &&
        navigator.userAgent.indexOf("IEMobile") === -1;

      window.history.scrollRestoration = "manual";

      setisDesktop(isDesktopResult);
    }, DEBOUNCE_TIME);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });
  }, []);

  useEffect(() => {
    debouncedDimensionCalculator();
    window.addEventListener("resize", debouncedDimensionCalculator);
    return () =>
      window.removeEventListener("resize", debouncedDimensionCalculator);
  }, []);

  const renderBackdrop = (): React.ReactNode => (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 -z-1"></div>
  );

  if (!isLoaded) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
      </Head>
      <Layout>
        <Header />
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex flex-col">
          {renderBackdrop()}
          <HeroSection />
          <AboutSection />
          <ProjectsSection isDesktop={isDesktop} />
          <QuoteSection />
          <SkillsSection />
          <ChemistryBusinessSection />
          <CollaborationSection />
          <Footer />
        </main>
      </Layout>
    </>
  );
}
