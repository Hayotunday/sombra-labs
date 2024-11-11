"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import WorkPopup from "../ui/WorkPopup";
import { selectedWorks } from "@/data/case-studies";

const SelectedWorkSection = () => {
  const [activePopup, setActivePopup] = useState(null);

  return (
    <>
      {activePopup !== null && (
        <WorkPopup
          activePopup={activePopup}
          work={selectedWorks[activePopup]}
          setActivePopup={setActivePopup}
          totalPopups={selectedWorks.length}
        />
      )}

      <div
        id="selected-work"
        className={`w-full min-h-[100dvh] flex flex-col px-4 xs:px-[5%] xl:px-[8%] pt-[60px] 2xl:pb-10 3xl:pb-[120px] gap-10 lg:gap-14 2xl:gap-20`}
      >
        <div className="flex justify-between gap-x-10 gap-y-2 sm:gap-y-3 flex-wrap">
          <h2 className="text-[34px] xs:text-[40px] sm:text-[48px] lg:text-[60px] 2xl:text-[72px] leading-[1]">
            SELECTED WORKS
          </h2>

          <h6 className="text-base sm:text-xl lg:text-2xl leading-[1] font-archivo font-light max-w-[280px]">
            THE BEST OF THE BEST DEEP FROM THE LAB
          </h6>
        </div>

        <div className="grid sm:grid-cols-2 w-full gap-[4vw] sm:gap-5 md:gap-8">
          {selectedWorks.map((work, index) => (
            <WorkCard
              key={index}
              work={work}
              index={index}
              setActivePopup={setActivePopup}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectedWorkSection;

const WorkCard = ({ work, index, setActivePopup }) => {
  const cardWrapper = useRef();
  const card = useRef();
  const textWrapper = useRef();
  const cardImage = useRef();

  const REPEATS = 4;

  useGSAP(
    () => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardWrapper.current,
          start: "top bottom",
          toggleActions: "play reset play reset",
        },
      });

      cardTl.fromTo(
        cardImage.current,
        { scale: 0.7, rotate: index % 2 === 0 ? -2 : 2 },
        {
          scale: 1,
          rotate: 0,
          ease: "cubic-bezier(0,1.14,0,1)",
          duration: 0.6,
        }
      );

      const numberOfLetters = cardWrapper.current.querySelectorAll(
        ".project-name-letter"
      ).length;

      for (let i = 0; i < numberOfLetters; i++) {
        const letters = cardWrapper.current.querySelectorAll(
          `.project-name-letter-${i}`
        );

        cardTl.fromTo(
          letters,
          { yPercent: 100 },
          { yPercent: -100 * (REPEATS - 1) },
          0.6 + i * 0.05
        );
      }
    },
    { dependencies: [], revertOnUpdate: true }
  );

  const splitText = (text) => {
    let whitespaces = 0;

    return text.split("").map((word, index) => {
      if (word === " ") whitespaces++;

      return (
        <span
          key={index}
          className={
            word !== " "
              ? `will-change-transform inline-flex flex-col project-name-letter project-name-letter-${
                  index - whitespaces
                }`
              : ""
          }
        >
          {[...Array(REPEATS)].map((_, i) =>
            word === " " ? (
              <span key={i} className="inline-block w-1"></span>
            ) : (
              <span key={i}>{word}</span>
            )
          )}
        </span>
      );
    });
  };

  return (
    <>
      <button ref={cardWrapper}>
        <div
          onClick={() => setActivePopup(index)}
          className={`flex flex-col z-20 relative group cursor-pointer ${
            index % 2 === 0 ? "origin-top-right" : "origin-top-left"
          }`}
          ref={card}
        >
          <Image
            ref={cardImage}
            width={2686}
            height={1511}
            src={`/images/selected-works/${work.image}`}
            alt={work.name}
            unoptimized
            className="will-change-transform border-[3px] border-[#FF00D6] rounded-2xl"
          />
          <div
            ref={textWrapper}
            className="flex items-center py-[0.5em] sm:py-[0.6em] overflow-x-clip relative text-[7vw] sm:text-[23px] md:text-[26px] lg:text-[30px] xl:text-[36px] 2xl:text-[42px]"
          >
            <div className="absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out pr-2">
              <img
                src="/icons/arrow-right.svg"
                alt="arrow"
                className="size-[1em]"
              />
            </div>

            <div className="flex flex-col h-[1em]">
              <h6 className="flex h-[1em] font-semibold leading-[1] group-hover:translate-x-[1.2em] transition-transform duration-200 ease-out uppercase overflow-y-clip whitespace-nowrap">
                {splitText(work.name)}
              </h6>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
