"use client";

import {
  createContext,
  useMemo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useStateStore from "@/stores/stateStore";
import Main from "@/components/Main";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlashLight from "@/components/FlashLight";
import Cursor from "@/components/ui/Cursor";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

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
  }, []);

  useEffect(initLenis, []);

  // Responsible for setting the direction of the scroll
  const touchStartY = useRef(0);
  const handleWheel = (event) => {
    if (event.deltaY > 0) setDirection(1);
    else setDirection(-1);
  };

  const handleTouchStart = (e) => (touchStartY.current = e.touches[0].clientY);

  const handleTouchMove = (e) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) setDirection(1);
      else setDirection(-1);
    }
  };

  useEffect(() => {
    globalThis?.window?.addEventListener("wheel", handleWheel);
    globalThis?.window?.addEventListener("touchstart", handleTouchStart);
    globalThis?.window?.addEventListener("touchmove", handleTouchMove);

    return () => {
      globalThis?.window?.removeEventListener("wheel", handleWheel);
      globalThis?.window?.removeEventListener("touchstart", handleTouchStart);
      globalThis?.window?.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (["Home", "PageUp", "PageDown", "End"].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    globalThis?.window?.addEventListener("keydown", handleKeyDown);
    return () => {
      globalThis?.window?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function isTouchDevice() {
    if (typeof globalThis?.window === "undefined") return false;

    return (
      "ontouchstart" in globalThis?.window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  const contextValue = useMemo(
    () => ({
      lenis,
      initLenis,
      destroyLenis,
    }),
    [lenis, initLenis, destroyLenis]
  );

  return (
    <LenisContext.Provider value={contextValue}>
      {!isTouchDevice() && <Cursor />}
      <Navbar lenis={lenis} />
      <Main />
      <FlashLight />
      {introDone && <Footer />}
    </LenisContext.Provider>
  );
}
