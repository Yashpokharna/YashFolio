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
    // fonts.ready is already resolved when nothing is loading, so this also
    // covers cached fonts without setting state synchronously in the effect.
    const done = () => setFontsReady(true);
    const fallback = setTimeout(done, 3000);
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      clearTimeout(fallback);
      done();
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
