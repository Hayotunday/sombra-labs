"use client";
import { useEffect, useRef } from "react";
import useStateStore from "@/stores/stateStore";
import { useThree } from "@react-three/fiber";
import { ExplodeS } from "@/components/models/Exploding S";
import { LastSModel } from "@/components/models/LastSModel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "../App";
import { ScrollTrigger } from "gsap/all";
import { Html } from "@react-three/drei";
import useScrollStore from "@/stores/scrollStore";

const SModelContainer = ({ canvasIsActive }) => {
  let camera = useThree((state) => state.camera);
  const cameraRef = useRef(camera);
  const { lenis } = useLenis();

  const { step, setStep } = useStateStore();
  const { setScrollId } = useScrollStore();

  useEffect(() => {
    setScrollId(0);
  }, []);

  const handleResize = () => {
    const isMedium = window.innerWidth < 1280;

    if (isMedium) {
      camera.fov = 20;
      camera.updateProjectionMatrix();
    } else {
      camera.fov = (1400 * 18) / window.innerWidth;
    }

    camera.position.set(0, 0, 20);

    console.log(camera.fov);

    camera.updateProjectionMatrix();
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStopDuring = () => {
    lenis.stop();
    setTimeout(() => {
      lenis.start();
    }, 200);
  };

  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useGSAP(
    () => {
      // ScrollTriggers for Exploding S are placed in Exploding S.jsx

      const spreadModelTl = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: "#s-model-space",
          start: "bottom top",
          endTrigger: "#s-spread-model-space",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            if (stepRef.current === 3) {
              window.scrollTo({
                top:
                  document.querySelector("#s-spread-model-space").offsetTop + 1,
              });
              lenis.stop();
              setStep(4);
            }
          },
          onLeaveBack: () => {
            if (stepRef.current === 5) {
              lenis.stop();
              setStep(4);
            }
          },
        },
      });

      const sectionTriggerSettings = {
        trigger: "#s-spread-model-space",
        onEnter: handleStopDuring,
        onLeaveBack: handleStopDuring,
      };

      new ScrollTrigger({
        ...sectionTriggerSettings,
        start: () =>
          `${
            (((6 / 865) * (window.innerHeight - 944) + 9) / 2840) *
              (window.innerWidth - 1920) +
            48
          }% bottom`,
      });

      new ScrollTrigger({
        ...sectionTriggerSettings,
        start: () =>
          `${
            (((9 / 371) * (window.innerHeight - 944) + 31) / 14200) *
              (window.innerWidth - 1920) +
            82.5
          }% bottom`,
      });

      spreadModelTl
        .to(camera.position, { y: 0, z: 20 })
        .to(
          cameraRef.current,
          {
            fov: 45,
            duration: 0.5,
            onUpdate: () => cameraRef.current.updateProjectionMatrix(),
          },
          "key1"
        )
        .to(camera.position, { x: 4, y: -5, z: 7 }, "key1")
        .to(camera.rotation, { y: -0.5 * Math.PI }, "key1")
        .to(camera.position, { x: 8, y: -10, z: 3 }, "key2")
        .to(camera.rotation, { y: -1 * Math.PI }, "key2")
        .to(camera.position, { x: 12, y: -15, z: 7 }, "key3")
        .to(camera.rotation, { y: -1.5 * Math.PI }, "key3")
        .to(camera.position, { x: 8, y: -18, z: 12 }, "key4")
        .to(camera.rotation, { y: -1.8 * Math.PI }, "key4")
        .to(camera.position, { x: 4, y: -25, z: 7 }, "key5")
        .to(camera.rotation, { y: -2.5 * Math.PI }, "key5")
        .to(camera.position, { x: 12, y: -30, z: 3 }, "key6")
        .to(camera.rotation, { y: -3 * Math.PI }, "key6")
        .to(camera.position, { x: 12, y: -34, z: 7 }, "key06")
        .to(camera.rotation, { y: -3.4 * Math.PI }, "key06")
        .to(camera.position, { x: 8, y: -40, z: 11 }, "key7")
        .to(camera.rotation, { y: -4 * Math.PI }, "key7")
        .to(camera.position, { x: 4, y: -46, z: 11 }, "key8")
        .to(camera.rotation, { y: -4.6 * Math.PI }, "key8");
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <>
      {canvasIsActive && <ExplodeS />}

      {canvasIsActive && [4, 5].includes(step) && <LastSModel />}
    </>
  );
};

export default SModelContainer;
