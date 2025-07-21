"use client";
import { useEffect, useState } from "react";

const greetings = ["Hello.", "Bonjour.", "Hola.", "Ciao.", "नमस्ते."];

const LoadingScreen: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [hide, setHide] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setAnimate(false); // fade out
      setTimeout(() => {
        if (current < greetings.length - 1) {
          setCurrent((prev) => prev + 1);
          setAnimate(true); // fade in
        } else {
          clearInterval(greetingInterval);
          setTimeout(() => {
            setIsSlidingUp(true); // trigger slide
          }, 400); // wait a moment
        }
      }, 100); // fade out delay
    }, 400); // total duration per greeting

    return () => clearInterval(greetingInterval);
  }, [current]);

  useEffect(() => {
    if (isSlidingUp) {
      const timer = setTimeout(() => setHide(true), 1000); // ⬅️ SMOOTH SLIDE DELAY
      return () => clearTimeout(timer);
    }
  }, [isSlidingUp]);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#0a0f2c] z-[9999] flex items-center justify-center transition-transform duration-[1000ms] ${
        isSlidingUp ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <h1
        className={`text-white text-3xl md:text-4xl font-bold tracking-wider transition-all duration-150 transform ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {greetings[current]}
      </h1>
    </div>
  );
};

export default LoadingScreen;
