"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useMemo, useCallback } from "react";
import useStateStore from "@/stores/stateStore";
import Main from "@/components/Main";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlashLight from "@/components/FlashLight";
import Cursor from "@/components/ui/Cursor";
import AboutUs from "./sections/AboutUs";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export default function App() {
  const [lenis, setLenis] = useState(() => new Lenis({
    touchInertiaMultiplier: 1,
    syncTouch: true,
  }));
  const { introDone, setDirection } = useStateStore();

  const initLenis = useCallback(() => {
    const lenisInstance = new Lenis({
      touchInertiaMultiplier: 1,
      syncTouch: true,
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
    return () => destroyLenis();
  }, [initLenis, destroyLenis]);

  const touchStartY = useRef(0);

  const handleWheel = useCallback((event) => {
    if (event.deltaY > 0) setDirection(1);
    else setDirection(-1);
  }, [setDirection]);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) setDirection(1);
      else setDirection(-1);
    }
  }, [setDirection]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  const handleKeyDown = useCallback((e) => {
    if (["Home", "PageUp", "PageDown", "End"].includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const isTouchDevice = () => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  const contextValue = useMemo(() => ({ lenis, initLenis, destroyLenis }), [lenis, initLenis, destroyLenis]);

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
