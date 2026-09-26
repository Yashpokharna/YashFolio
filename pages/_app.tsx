import "../styles/globals.scss";
import type { AppProps } from "next/app";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
} from "next/font/google";
import { AppProvider } from "../context/AppContext";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Manrope({ subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-display: ${display.style.fontFamily};
          --font-body: ${body.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
          --font-serif: ${serif.style.fontFamily};
        }
      `}</style>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
