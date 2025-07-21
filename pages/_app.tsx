import "../styles/globals.scss";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const LoadingScreen = dynamic(() => import("../components/common/LoadingScreen"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoadingScreen />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
