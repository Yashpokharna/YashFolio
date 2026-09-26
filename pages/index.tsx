import Head from "next/head";
import { METADATA } from "../constants";
import Preloader from "@/components/common/Preloader";
import SmoothScroller from "@/components/common/SmoothScroller";
import Header from "@/components/common/Header";
import Cursor from "@/components/common/Cursor";
import ChapterNav from "@/components/common/ChapterNav";
import ScrollProgress from "@/components/common/ScrollProgress";
import Hero from "@/components/home/Hero";
import Origin from "@/components/home/Origin";
import Journey from "@/components/home/Journey";
import Works from "@/components/home/Works";
import Obsession from "@/components/home/Obsession";
import Toolbox from "@/components/home/Toolbox";
import Contact from "@/components/home/Contact";

// Render order matters: the smoother is created first, then every section
// builds its ScrollTriggers top-to-bottom, and the fixed UI that measures the
// whole page (header, chapter nav, progress) comes last.
export default function Home() {
  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
        <meta name="description" content={METADATA.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={METADATA.title} />
        <meta property="og:description" content={METADATA.description} />
        <meta property="og:url" content={METADATA.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Preloader />
      <SmoothScroller />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <Origin />
            <Journey />
            <Works />
            <Obsession />
            <Toolbox />
            <Contact />
          </main>
        </div>
      </div>

      <Header />
      <ChapterNav />
      <ScrollProgress />
      <Cursor />
      <div className="grain" aria-hidden />
    </>
  );
}
