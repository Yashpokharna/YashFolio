import styles from "./Cursor.module.scss";
import { MutableRefObject, useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { isSmallScreen } from "pages"; // ✅ keep if this util lives in pages/index.tsx

// Define local prop type instead of importing from "pages"
interface CursorProps {
  isDesktop: boolean;
}

const CURSOR_STYLES = {
  CURSOR: "fixed hidden bg-white w-4 h-4 select-none pointer-events-none z-50 rounded-full",
  FOLLOWER: "fixed hidden h-8 w-8 select-none pointer-events-none z-50 rounded-full border border-white/50",
};

const Cursor: React.FC<CursorProps> = ({ isDesktop }) => {
  const cursor: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const follower: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // Hover animations
  const onHover = () => {
    if (!cursor.current || !follower.current) return;
    gsap.to(cursor.current, { scale: 0.5, duration: 0.3 });
    gsap.to(follower.current, { scale: 3, duration: 0.3 });
  };

  const onUnhover = () => {
    if (!cursor.current || !follower.current) return;
    gsap.to(cursor.current, { scale: 1, duration: 0.3 });
    gsap.to(follower.current, { scale: 1, duration: 0.3 });
  };

  // Follow mouse
  const moveCircle = (e: MouseEvent) => {
    if (!cursor.current || !follower.current) return;
    gsap.to(cursor.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: Linear.easeNone,
    });
    gsap.to(follower.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: Linear.easeNone,
    });
  };

  // Setup + cleanup
  useEffect(() => {
    if (isDesktop && !isSmallScreen()) {
      if (cursor.current && follower.current) {
        cursor.current.classList.remove("hidden");
        follower.current.classList.remove("hidden");
      }

      document.addEventListener("mousemove", moveCircle);

      const links = document.querySelectorAll(".link");
      links.forEach((el) => {
        el.addEventListener("mouseenter", onHover);
        el.addEventListener("mouseleave", onUnhover);
      });

      return () => {
        document.removeEventListener("mousemove", moveCircle);
        links.forEach((el) => {
          el.removeEventListener("mouseenter", onHover);
          el.removeEventListener("mouseleave", onUnhover);
        });
      };
    }
  }, [isDesktop]);

  return (
    <>
      <div ref={cursor} className={`${styles.cursor} ${CURSOR_STYLES.CURSOR}`} />
      <div
        ref={follower}
        className={`${styles.cursorFollower} ${CURSOR_STYLES.FOLLOWER}`}
      />
    </>
  );
};

export default Cursor;