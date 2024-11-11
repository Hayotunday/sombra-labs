"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import useStateStore from "@/stores/stateStore";
import Main from "@/components/Main";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlashLight from "@/components/FlashLight";
import Cursor from "@/components/ui/Cursor";

const LenisContext = createContext();

export default function App() {
  const [lenis, setLenis] = useState(
    new Lenis({
      touchInertiaMultiplier: 1,
      syncTouch: true,
      lerp: 0.1,
    })
  );
  const { introDone, setDirection } = useStateStore();

  const initLenis = useCallback(() => {
    const lenisInstance = new Lenis({
      touchInertiaMultiplier: 1,
      syncTouch: true,
      lerp: 0.1,
    });
    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const destroyLenis = useCallback(() => {
    if (lenis) {
      lenis.destroy();
      setLenis(null);
    }
  }, [lenis]);

  useEffect(() => {
    initLenis();
  }, []);

  // Responsible for setting the direction of the scroll
  const touchStartY = useRef(0);
  const handleWheel = useCallback(
    (event) => {
      if (event.deltaY > 0) setDirection(1);
      else setDirection(-1);
    },
    [setDirection]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) setDirection(1);
        else setDirection(-1);
      }
    },
    [setDirection]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("wheel", handleWheel);
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  const handleKeyDown = useCallback((e) => {
    if (["Home", "PageUp", "PageDown", "End"].includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  const isTouchDevice = () => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  const contextValue = useMemo(
    () => ({ lenis, initLenis, destroyLenis }),
    [lenis, initLenis, destroyLenis]
  );

  return (
    <LenisContext.Provider value={{ lenis }}>
      {lenis && (
        <>
          {!isTouchDevice() && <Cursor />}
          <Navbar lenis={lenis} />
          <Main />
          <FlashLight />
          {introDone && <Footer />}
        </>
      )}
    </LenisContext.Provider>
  );
}

export const useLenis = () => useContext(LenisContext);
