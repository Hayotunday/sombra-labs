import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  MeshCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import { useLenis } from "../App";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

const initPosition = [
  new THREE.Vector3(-0.163, 0.216, 0.232),
  new THREE.Vector3(-0.439, 0.265, 0.344),
  new THREE.Vector3(0.249, 0.206, 0.101),
  new THREE.Vector3(0.137, -0.23, 0.47),
  new THREE.Vector3(0.249, -0.138, -0.318),
  new THREE.Vector3(-0.335, -0.094, 0.025),
  new THREE.Vector3(-0.111, -0.1, 0.112),
  new THREE.Vector3(0.661, 0.021, -0.436),
  new THREE.Vector3(-0.09, 0.137, -0.3),
  new THREE.Vector3(-0.037, 0.044, -0.454),
  new THREE.Vector3(0.354, 0.224, 0.308),
  new THREE.Vector3(-0.226, -0.193, 0.184),
  new THREE.Vector3(0.604, -0.181, -0.005),
  new THREE.Vector3(-0.469, 0.196, -0.241),
  new THREE.Vector3(0.096, -0.09, 0.02),
  new THREE.Vector3(-0.008, -0.151, 0.47),
  new THREE.Vector3(0.198, 0.211, 0.395),
  new THREE.Vector3(0.038, 0.202, -0.412),
  new THREE.Vector3(0.461, -0.381, -0.436),
  new THREE.Vector3(-0.15, -0.11, 0.329),
  new THREE.Vector3(-0.373, 0.145, -0.425),
  new THREE.Vector3(0.388, 0.131, -0.301),
  new THREE.Vector3(-0.495, 0.151, 0.207),
  new THREE.Vector3(0.156, 0.13, -0.426),
  new THREE.Vector3(-0.324, -0.218, -0.175),
  new THREE.Vector3(-0.22, -0.084, 0.23),
];

export function ExplodeS({ ...props }) {
  const { lenis } = useLenis();
  const groupRef = useRef();
  const { step, setStep } = useStateStore();
  const { nodes, materials } = useGLTF("/models/Exploding S.glb");

  const [isTransitioning, setIsTransitioning] = useState(false);

  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useGSAP(
    () => {
      new ScrollTrigger({
        trigger: "#s-model-space",
        start: "top top",
        end: "bottom top",

        onEnter: () => {
          if (stepRef.current === 2) {
            window.scrollTo({
              top: document.querySelector("#s-model-space").offsetTop + 1,
            });
            lenis.stop();
            setIsTransitioning(true);
            setStep(3);
          }
        },
        onLeaveBack: () => {
          if (stepRef.current === 3) {
            lenis.stop();
            setIsTransitioning(true);
          }
        },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <Physics gravity={[0, 0, 0]}>
      <group
        scale={4}
        ref={groupRef}
        {...props}
        dispose={null}
        rotation={[0, Math.PI, 0]}
        position={new THREE.Vector3(0, 0, 0)}
      >
        {step == 2 && <Pointer />}
        <Connector index={0} isTransitioning={isTransitioning}>
          <group name="S_Base_cell027">
            <mesh
              name="S_Base_cell028_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell028_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell028_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell028_2.geometry}
              material={materials["Clip 0"]}
            />
          </group>
        </Connector>
        <Connector index={1} isTransitioning={isTransitioning}>
          <group name="S_Base_cell028">
            <mesh
              name="S_Base_cell029_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell029_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell029_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell029_2.geometry}
              material={materials["Clip01 (swarovski)"]}
            />
          </group>
        </Connector>
        <Connector index={2} isTransitioning={isTransitioning}>
          <group name="S_Base_cell029">
            <mesh
              name="S_Base_cell030_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell030_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell030_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell030_2.geometry}
              material={materials["Clip02 (swarovski)"]}
            />
          </group>
        </Connector>
        <Connector index={3} isTransitioning={isTransitioning}>
          <group name="S_Base_cell030">
            <mesh
              name="S_Base_cell031_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell031_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell031_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell031_2.geometry}
              material={materials["Clip03 (swarovski)"]}
            />
          </group>
        </Connector>
        <Connector index={4} isTransitioning={isTransitioning}>
          <group name="S_Base_cell031">
            <mesh
              name="S_Base_cell032_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell032_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell032_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell032_2.geometry}
              material={materials["Clip06 (swarovski).001"]}
            />
          </group>
        </Connector>
        <Connector index={5} isTransitioning={isTransitioning}>
          <group name="S_Base_cell032">
            <mesh
              name="S_Base_cell033_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell033_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell033_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell033_2.geometry}
              material={materials["Clip05 (NFL por la cultura)"]}
            />
          </group>
        </Connector>
        <Connector index={6} isTransitioning={isTransitioning}>
          <group name="S_Base_cell033">
            <mesh
              name="S_Base_cell034_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell034_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell034_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell034_2.geometry}
              material={materials["Clip06 (swarovski)"]}
            />
          </group>
        </Connector>

        <Connector index={7} isTransitioning={isTransitioning}>
          <group name="S_Base_cell034">
            <mesh
              name="S_Base_cell035_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell035_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell035_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell035_2.geometry}
              material={materials.Clip07}
            />
          </group>
        </Connector>

        <Connector index={8} isTransitioning={isTransitioning}>
          <group name="S_Base_cell035">
            <mesh
              name="S_Base_cell036_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell036_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell036_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell036_2.geometry}
              material={materials.Clip08}
            />
          </group>
        </Connector>
        <Connector index={9} isTransitioning={isTransitioning}>
          <group name="S_Base_cell036">
            <mesh
              name="S_Base_cell037_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell037_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell037_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell037_2.geometry}
              material={materials["Clip09 (NFL 2021 Playoffs)"]}
            />
          </group>
        </Connector>
        <Connector index={10} isTransitioning={isTransitioning}>
          <mesh
            name="S_Base_cell037"
            castShadow
            receiveShadow
            geometry={nodes.S_Base_cell037.geometry}
            material={materials["Website  Glass Material"]}
          />
        </Connector>
        <Connector index={11} isTransitioning={isTransitioning}>
          <group name="S_Base_cell038">
            <mesh
              name="S_Base_cell039_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell039_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell039_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell039_2.geometry}
              material={materials["Clip11 (resort world)"]}
            />
          </group>
        </Connector>
        <Connector index={12} isTransitioning={isTransitioning}>
          <group name="S_Base_cell039">
            <mesh
              name="S_Base_cell040_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell040_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell040_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell040_2.geometry}
              material={materials["Clip12 (patients like me)"]}
            />
          </group>
        </Connector>
        <Connector index={13} isTransitioning={isTransitioning}>
          <group name="S_Base_cell040">
            <mesh
              name="S_Base_cell041_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell041_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell041_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell041_2.geometry}
              material={materials["Clip13 (Spectrum Man on the Moon)"]}
            />
          </group>
        </Connector>
        <Connector index={14} isTransitioning={isTransitioning}>
          <mesh
            name="S_Base_cell041"
            castShadow
            receiveShadow
            geometry={nodes.S_Base_cell041.geometry}
            material={materials["Website  Glass Material"]}
          />
        </Connector>
        <Connector index={15} isTransitioning={isTransitioning}>
          <group name="S_Base_cell042">
            <mesh
              name="S_Base_cell043_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell043_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell043_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell043_2.geometry}
              material={materials["Clip 15 (sandbox city)"]}
            />
          </group>
        </Connector>
        <Connector index={16} isTransitioning={isTransitioning}>
          <group name="S_Base_cell043">
            <mesh
              name="S_Base_cell044_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell044_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell044_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell044_2.geometry}
              material={materials["Clip16 (NFL Playoff 2022)"]}
            />
          </group>
        </Connector>
        <Connector index={17} isTransitioning={isTransitioning}>
          <group name="S_Base_cell044">
            <mesh
              name="S_Base_cell045_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell045_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell045_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell045_2.geometry}
              material={materials["Clip17 (Spectrum FUN)"]}
            />
          </group>
        </Connector>
        <Connector index={18} isTransitioning={isTransitioning}>
          <group name="S_Base_cell045">
            <mesh
              name="S_Base_cell046_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell046_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell046_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell046_2.geometry}
              material={materials["Clip18 (subway)"]}
            />
          </group>
        </Connector>
        <Connector index={19} isTransitioning={isTransitioning}>
          <group name="S_Base_cell046">
            <mesh
              name="S_Base_cell047_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell047_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell047_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell047_2.geometry}
              material={materials["Clip19 (pokemon go)"]}
            />
          </group>
        </Connector>
        <Connector index={20} isTransitioning={isTransitioning}>
          <group name="S_Base_cell047">
            <mesh
              name="S_Base_cell048_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell048_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell048_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell048_2.geometry}
              material={materials["Clip20 (from now till then)"]}
            />
          </group>
        </Connector>
        <Connector index={21} isTransitioning={isTransitioning}>
          <group name="S_Base_cell048">
            <mesh
              name="S_Base_cell049_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell049_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell049_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell049_2.geometry}
              material={materials["Clip21 spectrum wifi for all"]}
            />
          </group>
        </Connector>
        <Connector index={22} isTransitioning={isTransitioning}>
          <group name="S_Base_cell049">
            <mesh
              name="S_Base_cell050_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell050_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell050_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell050_2.geometry}
              material={materials["Clip 22 (Louis Vuitton)"]}
            />
          </group>
        </Connector>
        <Connector index={23} isTransitioning={isTransitioning}>
          <mesh
            name="S_Base_cell050"
            castShadow
            receiveShadow
            geometry={nodes.S_Base_cell050.geometry}
            material={materials["Website  Glass Material"]}
          />
        </Connector>
        <Connector
          index={24}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
        >
          <group name="S_Base_cell051">
            <mesh
              name="S_Base_cell052_1"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell052_1.geometry}
              material={materials["Website  Glass Material"]}
            />
            <mesh
              name="S_Base_cell052_2"
              castShadow
              receiveShadow
              geometry={nodes.S_Base_cell052_2.geometry}
              material={materials["Clip24 (maybeline)"]}
            />
          </group>
        </Connector>
        <group name="S_Base_cell053" />
      </group>
    </Physics>
  );
}

function Connector({
  index,
  children,
  vec = new THREE.Vector3(),
  isTransitioning,
  setIsTransitioning,
  ...props
}) {
  const piece = useRef();
  const { lenis } = useLenis();

  const [pieceInitPosition, setPieceInitPosition] = useState(
    initPosition[index]
  );
  const { step, setStep, direction } = useStateStore();
  const { setPosition } = useNavLinksStore();
  const targetPosition = new THREE.Vector3(0, 0, 0);
  const targetRotation = new THREE.Euler(0, Math.PI, 0);

  useEffect(() => {
    if (piece.current) {
      const currentPos = piece.current.translation();
      setPieceInitPosition(currentPos);
    }
  }, [piece]);

  const scrollIsStarted = useRef(false); // to prevent multiple calls after animation in is completed

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    if (piece.current) {
      if (step === 3) {
        const currentPos = new THREE.Vector3().copy(
          piece.current.translation()
        );
        const currentRot = new THREE.Quaternion().copy(
          piece.current.rotation()
        );
        const targetQuat = new THREE.Quaternion().setFromEuler(targetRotation);
        if (isTransitioning && direction === 1) {
          const newPos = currentPos.lerp(targetPosition, delta * 2);
          const newRot = currentRot.slerp(targetQuat, delta * 2);
          piece.current.setTranslation(newPos, true);
          piece.current.setRotation(newRot, true);
          if (
            !scrollIsStarted.current &&
            index == 24 &&
            newPos.distanceTo(targetPosition) < 0.001 &&
            newRot.angleTo(targetQuat) < 0.001
          ) {
            scrollIsStarted.current = true;
            setIsTransitioning(false);
            window.scrollTo({
              top: document.querySelector("#s-model-space").offsetTop + 1,
            });

            setTimeout(() => {
              scrollIsStarted.current = false;
              lenis.start(); // when the S has been formed, allow scrolling again
              setPosition(3);
            }, 500);
          }
        } else if (isTransitioning && direction === -1) {
          // if the user scrolls back up, transition back to the initial position

          const newPos = currentPos.lerp(pieceInitPosition, delta);
          piece.current.setTranslation(newPos, true);
          if (index == 24 && newPos.distanceTo(pieceInitPosition) < 0.1) {
            setIsTransitioning(false);
            window.scrollBy(0, -1);
            setStep(2);
            setPosition(2);
            window.scrollTo({
              top: document.querySelector("#s-model-space").offsetTop - 80,
            });

            setTimeout(() => {
              lenis.start();
            }, 100);
          }
        }
      } else {
        piece.current.applyImpulse(
          vec.copy(piece.current.translation()).negate().multiplyScalar(0.01)
        );
      }
    }
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={initPosition[index]}
      ref={piece}
      colliders={false}
    >
      {step === 2 ? (
        <MeshCollider type="ball">{children}</MeshCollider>
      ) : (
        children
      )}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ pointer, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      )
    );
  });

  return (
    <RigidBody
      type="kinematicPosition"
      colliders={false}
      ref={ref}
      userData={{ type: "pointer" }}
    >
      <CuboidCollider args={[0.1, 0.1, 10]} />
    </RigidBody>
  );
}
useGLTF.preload("/models/Exploding S.glb");
