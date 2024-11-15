"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  scrollToAbout,
  scrollToSandbox,
  scrollToStudies,
  scrollToTalk,
} from "@/functions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Html } from "@react-three/drei";
import Lenis from "@studio-freight/lenis";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const Scroller = ({ children }) => {
  const groupRef = useRef();
  const lenisRef = useRef();
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [scrollId, setScrollId] = useState(0);
  const { ref: containerRef, inView } = useInView();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     const direction = currentScrollPos > prevScrollPos ? "down" : "up";

  //     console.log(scrollId);
  //     if (direction == "down" && scrollId == 0) {
  //       scrollToStudies();
  //       setScrollId(1);
  //     } else if (direction == "down" && scrollId == 1) {
  //       scrollToAbout();
  //       setScrollId(2);
  //     } else if (direction == "down" && scrollId == 2) {
  //       scrollToTalk();
  //       setScrollId(3);
  //     } else if (direction == "down" && scrollId == 3) {
  //       scrollToTalk();
  //       setScrollId(3);
  //     } else if (direction == "up" && scrollId == 3) {
  //       scrollToAbout();
  //       setScrollId(2);
  //     } else if (direction == "up" && scrollId == 2) {
  //       scrollToStudies();
  //       setScrollId(1);
  //     } else if (direction == "up" && scrollId == 1) {
  //       scrollToSandbox();
  //       setScrollId(0);
  //     }

  //     setScrollDirection(direction);
  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("wheel", handleScroll);
  //   return () => {
  //     window.removeEventListener("wheel", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const parent = document.getElementById("s-component");
    containerRef.current = parent;

    const lenis = new Lenis({
      smooth: true,
    });
    lenisRef.current = lenis;

    const onScroll = ({ scroll }) => {
      if (inView) console.log(scroll);
      // console.log(scrollPos);
    };

    lenis.on("scroll", onScroll);

    const animate = (time) => {
      lenis.raf(time); // Update lenis with the latest animation frame time
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return <group ref={groupRef}>{children}</group>;
};

export default Scroller;
