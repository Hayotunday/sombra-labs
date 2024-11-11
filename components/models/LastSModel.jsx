import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import { useLenis } from "../App";
import CaseStudiesSection from "../sections/CaseStudiesSection";
import AboutUs from "../sections/AboutUs";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export function LastSModel(props) {
  const group = useRef();
  const sectionRefs = useRef([]);
  const { lenis } = useLenis();
  const animationsCompleted = useRef(0);
  const { nodes, materials, animations } = useGLTF("/models/LastSModel.glb");
  const { actions, mixer } = useAnimations(animations, group);
  const { step, setStep, direction } = useStateStore();
  const { setPosition } = useNavLinksStore();

  const [animationState, setAnimationState] = useState("idle");

  gsap.registerPlugin(ScrollTrigger);

  const handleAnimationEnd = () => {
    if (step !== 4) return;

    if (direction === -1) {
      window.scrollTo({
        top: document.querySelector("#s-spread-model-space").offsetTop - 50,
      });
      setStep(3);
      setPosition(3);
    } else {
      setStep(5);
      setPosition(4);
    }

    lenis.start();
  };

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      if (step > 4) {
        Object.entries(actions).forEach(([name, action]) => {
          action.time = direction === 1 ? action.getClip().duration : 0;
          mixer.update(0);
          action.paused = true;
          action.clampWhenFinished = true;
        });
      }

      setAnimationState("playing");
      Object.entries(actions).forEach(([name, action]) => {
        action.setLoop(THREE.LoopOnce);
        action.timeScale = direction;
        if (direction === -1) {
          action.time = action.getClip().duration;
        }
        action.play();
        action.clampWhenFinished = true;
      });

      return () => {
        Object.entries(actions).forEach(([name, action]) => {
          if (action) {
            action.stop();
          }
        });
      };
    } else {
      console.log("No actions available or actions are empty.");
    }
  }, [step, actions, direction]);

  const handleScroll = () => {
    const element = group.current;
    if (element.scrollTop > 100) {
      scroller.scrollTo("case-studies", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  };
  useEffect(() => {
    const element = group.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useFrame(() => {
    if (step === 4 && group.current && actions) {
      Object.entries(actions).forEach(([name, action]) => {
        if (animationState === "playing") {
          if (animationsCompleted.current < Object.keys(actions).length) {
            if (direction === 1 && action.time >= action.getClip().duration) {
              animationsCompleted.current += 1;
            } else if (direction === -1 && action.time <= 0) {
              animationsCompleted.current += 1;
            }
          } else {
            animationsCompleted.current = 0;
            setAnimationState("idle");
            handleAnimationEnd();
          }
        }
      });
    }
  });

  return (
    <group
      rotation={[0, Math.PI, 0]}
      ref={group}
      {...props}
      dispose={null}
      scale={2.3}
      position={new THREE.Vector3(-0.7, -1.9, 0)}
    >
      <group name="Scene">
        <Html position={[2, -3, -7.824]}>
          <>
            <CaseStudiesSection />
          </>
        </Html>

        <mesh
          name="Cube0S_Array_02_1x1"
          castShadow
          receiveShadow
          geometry={nodes.Cube0S_Array_02_1x1.geometry}
          material={materials["Website  Glass Material"]}
          position={[11.919, -5.304, -7.824]}
          rotation={[-3.008, 1.303, 2.999]}
          scale={1.017}
        >
          <Html position={[7, -3.5, -7.824]}>
            <>
              <AboutUs />
            </>
          </Html>
        </mesh>
        <mesh
          name="Logo_3D007"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D007.geometry}
          material={materials["Website  Glass Material"]}
        />
        <mesh
          name="Logo_3D008"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D008.geometry}
          material={materials["Website  Glass Material"]}
        />
        <mesh
          name="Logo_3D009"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D009.geometry}
          material={materials["Website  Glass Material"]}
        />
        <mesh
          name="Logo_3D010"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D010.geometry}
          material={materials["Website  Glass Material"]}
        />
        <mesh
          name="Logo_3D011"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D011.geometry}
          material={materials["Website  Glass Material"]}
        />
        <mesh
          name="Logo_3D012"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D012.geometry}
          material={materials["Website  Glass Material"]}
        />
        <mesh
          name="Logo_3D_005001"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D_005001.geometry}
          material={materials["Website  Glass Material"]}
          morphTargetDictionary={nodes.Logo_3D_005001.morphTargetDictionary}
          morphTargetInfluences={nodes.Logo_3D_005001.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/LastSModel.glb");
