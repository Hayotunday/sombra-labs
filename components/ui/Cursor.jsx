"use client";
import gsap from "gsap";
import React, { useState, useEffect, useRef, useCallback } from "react";

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorWrapper = useRef(null);
  const cursor = useRef(null);

  const handleCursor = useCallback((e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleCursor);
    return () => {
      window.removeEventListener("mousemove", handleCursor);
    };
  }, [handleCursor]);

  const convertToPointer = useCallback(() => {
    gsap.to(cursor.current, {
      width: "54px",
      height: "54px",
      border: "2px solid white",
      backgroundColor: "transparent",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, []);

  const convertToDefault = useCallback(() => {
    gsap.to(cursor.current, {
      width: "16px",
      height: "16px",
      border: "2px solid white",
      backgroundColor: "#BC02E0",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, []);

  const removeCursor = useCallback(() => {
    gsap.to(cursor.current, {
      width: "0px",
      height: "0px",
      border: "0px solid white",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, []);

  const handleMouseDown = useCallback(() => {
    gsap.to(cursor.current, {
      width: "14px",
      height: "14px",
      border: "2px solid white",
      duration: 0.25,
      ease: "power2.out",
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    const clickTl = gsap.timeline();
    const currentPos = cursor.current.style.width;
    const distance = parseInt(currentPos) - 14;
    clickTl
      .to(cursor.current, {
        width: "14px",
        height: "14px",
        border: "2px solid white",
        duration: distance / 160,
        ease: "power2.out",
      })
      .to(
        cursor.current,
        {
          width: "54px",
          height: "54px",
          border: "2px solid white",
          backgroundColor: "transparent",
          duration: 0.25,
          ease: "power2.out",
        },
        `-=${distance / 340}`
      );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const buttons = document.getElementsByTagName("button");
    const anchors = document.getElementsByTagName("a");
    const elems = [...buttons, ...anchors];
    document.addEventListener("mouseenter", convertToDefault);
    document.addEventListener("mouseleave", removeCursor);
    elems.forEach((el) => {
      el.addEventListener("mouseenter", convertToPointer);
      el.addEventListener("mouseleave", convertToDefault);
      el.addEventListener("mousedown", handleMouseDown);
      el.addEventListener("mouseup", handleMouseUp);
    });
    return () => {
      document.removeEventListener("mouseenter", convertToDefault);
      document.removeEventListener("mouseleave", removeCursor);
      elems.forEach((el) => {
        el.removeEventListener("mouseenter", convertToPointer);
        el.removeEventListener("mouseleave", convertToDefault);
        el.removeEventListener("mousedown", handleMouseDown);
        el.removeEventListener("mouseup", handleMouseUp);
      });
    };
  }, [convertToDefault, removeCursor, convertToPointer, handleMouseDown, handleMouseUp]);

  return (
    <>
      <div
        ref={cursorWrapper}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
        className="fixed z-[999] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <div
          ref={cursor}
          style={{
            backgroundColor: "#BC02E0",
            width: "16px",
            height: "16px",
            border: "2px solid white",
          }}
          className="rounded-full"
        ></div>
      </div>
    </>
  );
};

export default Cursor;
