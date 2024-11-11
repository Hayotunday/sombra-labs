"use client";
import { useEffect, useRef } from "react";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";

const GradientAnimation = () => {
  const videoRef = useRef(null);

  const { introDone } = useStateStore();
  const { setPosition } = useNavLinksStore();

  const handleEnd = () => {
    setPosition(1);
    if (videoRef.current) {
      videoRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleEnd);
      return () => video.removeEventListener("ended", handleEnd);
    }
  }, []);

  useEffect(() => {
    if (introDone && videoRef.current) {
      videoRef.current.classList.remove("hidden");
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [introDone]);

  return (
    <section>
      <video
        ref={videoRef}
        src="/videos/bg.mp4"
        playsInline
        muted
        disablePictureInPicture
        preload="auto"
        className="fixed w-full h-[100dvh] top-0 left-0 z-[53] object-cover bg-black hidden"
      />
    </section>
  );
};

export default GradientAnimation;
