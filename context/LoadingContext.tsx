import { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext({ isLoaded: false });

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000); // match loading screen time
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};