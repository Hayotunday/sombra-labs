"use client";
import { useEffect, useRef, useState } from "react";
import useStateStore from "@/stores/stateStore";
import useCaseStudyStore from "@/stores/caseStudyStore";
import useModelStore from "@/stores/modelStore";
import GradientAnimation from "./GradientAnimation";
import { Loader } from "@react-three/drei";
import LandingPage from "./sections/LandingPage";
import HomeSection from "./sections/HomeSection";
import Marquee from "./sections/Marquee";
import SelectedWorkSection from "./sections/SelectedWorkSection";
import CaseStudyPopup from "./ui/CaseStudyPopup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import ExplosionModelContainer from "@/components/models/ExplosionModelContainer";
import SModelContainer from "@/components/models/SModelContainer";
import { useGSAP } from "@gsap/react";
import LastSection from "./sections/LastSection";

gsap.registerPlugin(ScrollTrigger);

const  Main = () => {
  const { step, introDone } = useStateStore();
  const { currentModel, setCurrentModel } = useModelStore();
  const { activePopup } = useCaseStudyStore();

  const modalWrapper1 = useRef(null);
  const modalWrapper2 = useRef(null);

  const handleResize = () => {
    // this is setting the height of the first canvas wrapper to the height of the first two sections and the margin top of the second canvas wrapper
    if (introDone && modalWrapper1.current && modalWrapper2.current) {
      const section1 = document.getElementById("home");
      const section2 = document.getElementById("marquee");

      const height1 =
        section1.getBoundingClientRect().height +
        section2.getBoundingClientRect().height;

      modalWrapper1.current.style.height = `${height1}px`;

      const section3 = document.getElementById("selected-work");

      const margin = height1 + section3.getBoundingClientRect().height;

      modalWrapper2.current.style.top = `${margin}px`;
    } else {
      modalWrapper1.current.style.height = `unset`;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [introDone]);

  const explosionRef = useRef(null);
  useEffect(() => {
    if (step === 1 && explosionRef.current) {
      explosionRef.current.currentTime = 0;
      explosionRef.current.play();
    }
  }, [step]);

  const [activeCanvas, setActiveCanvas] = useState(1);

  useGSAP(
    () => {
      if (introDone) {
        new ScrollTrigger({
          trigger: modalWrapper1.current,
          start: "top top",
          end: "bottom top",
          onLeave: () => setActiveCanvas(2),
          onEnterBack: () => setActiveCanvas(1),
        });
      } else {
        setActiveCanvas(1);
      }
    },
    {
      dependencies: [introDone],
      revertOnUpdate: true,
    }
  );

  return (
    <>
      <Loader />

      <LandingPage />

      <GradientAnimation />

      <div>
        <video
          className={`fixed top-0 left-0 w-full h-[100vh] -z-10 object-cover`}
          src={"/videos/bg2.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />

        <video
          ref={explosionRef}
          preload="auto"
          playsInline
          muted
          disablePictureInPicture
          src="/videos/EXPLOSION_ELEMENT.mp4"
          className={`fixed top-0 left-0 min-w-[100%] h-[100vh] hover:cursor-pointer bg-transparent object-cover mix-blend-screen z-40 pointer-events-none ${
            step === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* This contains the model including the first one in the hero section and the explosion */}
      <div ref={modalWrapper1} className="absolute top-0 left-0 w-full">
        <div
          className="sticky top-0 w-full h-[100dvh] z-30"
          onClick={() => {
            if (step === 0) {
              setCurrentModel((currentModel + 1) % 4);
            }
          }}
        >
          <Canvas className={`w-[100%] h-[100%]`}>
            <EffectComposer>
              <Fluid showBackground={false} rainbow={true} />
            </EffectComposer>
            <Environment preset="warehouse" environmentIntensity={0.5} />
            <ExplosionModelContainer canvasIsActive={activeCanvas === 1} />
          </Canvas>
        </div>
      </div>
      {/* </> */}
      {introDone && (
        <>
          <HomeSection />
          <Marquee />
          <SelectedWorkSection />

          {/* This contains the second model (S Model) */}
          <div
            ref={modalWrapper2}
            className="absolute left-0 w-full h-[calc(1000vh+240px+240px)]"
          >
            <div className="sticky top-0 w-full h-[100dvh]">
              <Canvas className={`w-[100%] h-[100%]`}>
                {/* <EffectComposer>
                  <Fluid showBackground={false} rainbow={true} />
                </EffectComposer> */}
                <Environment preset="warehouse" environmentIntensity={0.5} />
                <SModelContainer canvasIsActive={activeCanvas === 2} />
              </Canvas>
            </div>
          </div>
          {/* </> */}

          <div id="s-model-pieces-space" className="h-[240px]" />
          <div id="s-model-space" className="h-[240px]" />

          <div
            id="s-spread-model-space"
            className="h-[1000vh] flex items-center"
          >
            {activePopup !== null && <CaseStudyPopup />}
          </div>

          <LastSection />
        </>
      )}
    </>
  );
};

export default Main;
