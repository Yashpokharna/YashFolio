import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGSAP } from "@/lib/gsap";

interface AppState {
  /** true once the preloader curtain starts lifting — intros key off this */
  ready: boolean;
  setReady: (v: boolean) => void;
  /** true once web fonts have loaded, so text can be split and measured */
  fontsReady: boolean;
}

const AppContext = createContext<AppState>({
  ready: false,
  setReady: () => {},
  fontsReady: false,
});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const fonts = document.fonts;
    if (!fonts || fonts.status !== "loading") {
      setFontsReady(true);
      return;
    }
    const fallback = setTimeout(() => setFontsReady(true), 3000);
    fonts.ready.then(() => {
      clearTimeout(fallback);
      setFontsReady(true);
    });
    return () => clearTimeout(fallback);
  }, []);

  const value = useMemo(() => ({ ready, setReady, fontsReady }), [ready, fontsReady]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * useGSAP that waits for fonts. Every section builds its scroll scene through
 * this so text splits are accurate and ScrollTriggers are created in page
 * order (pins above must exist before triggers below are measured).
 */
export const useScene = (
  build: () => void | (() => void),
  scope: React.RefObject<Element | null>
) => {
  const { fontsReady } = useApp();
  useGSAP(
    () => {
      if (fontsReady) return build();
    },
    { scope, dependencies: [fontsReady] }
  );
};
