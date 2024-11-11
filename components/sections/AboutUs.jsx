import Image from "next/image";
import React, { useEffect, useState } from "react";
import { aboutData as data } from "@/data/case-studies";

const AboutUs = () => {
  // const [activeSlide, setActiveSlide] = useState(0);

  // const prevScrollPos = window.scrollY;

  // const scrollToStudies = () => {
  //   const case_studies = document.getElementById("case_studies");
  //   case_studies.click();
  // };
  // const scrollToTalk = () => {
  //   const talk_to_us = document.getElementById("talk_to_us");
  //   talk_to_us.click();
  // };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     const direction = currentScrollPos > prevScrollPos ? "down" : "up";

  //     if (direction == "up") {
  //       scrollToTalk();
  //     } else if (direction == "down") {
  //       scrollToStudies();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % data.length);
  };

  const prevSlide = () => {
    setActiveSlide((activeSlide - 1 + data.length) % data.length);
  };

  return (
    <div
      id="about-us"
      className="w-[100vw] min-h-[100dvh] flex flex-col items-center justify-center gap-14"
    >
      <h2 className="text-[32px] xs:text-[36px] sm:text-[42px] md:text-[50px] 2xl:text-[60px] leading-[1] font-bold max-w-[700px] text-center w-[90%]">
        TECHNOLOGY OUT OF THE SHADOWS
      </h2>

      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex items-center gap-2">
          <button onClick={prevSlide}>
            <img
              src="/icons/caret-purple.png"
              alt="..."
              className="w-5 sm:w-6 lg:w-7 rotate-90"
            />
          </button>

          <h6 className="text-xl sm:text-2xl lg:text-3xl leading-[1] font-archivo">
            {data[activeSlide].title}
          </h6>

          <button onClick={nextSlide}>
            <img
              src="/icons/caret-purple.png"
              alt="..."
              className="w-5 sm:w-6 lg:w-7 -rotate-90"
            />
          </button>
        </div>

        <div className="w-[95%] max-w-[600px] aspect-[3529/2080] relative flex justify-center items-center">
          <img
            src="/images/about-us-card-frame.png"
            alt="border"
            className="w-full h-full"
          />

          <div
            style={{
              maskImage: "url(/images/about-us-card-mask.png)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
            className="w-[98.77988%] aspect-[3529/2080] bg-white/30  backdrop-blur-[8px] absolute grain"
          ></div>

          <div className="flex flex-col items-center w-full h-full absolute">
            <div className="font-archivo absolute inset-0 px-[5.8vw] sm:px-8 pt-[8vw] sm:pt-14 pb-6 flex flex-col justify-between items-start">
              {data[activeSlide].content.map((elem, i) => {
                switch (elem.type) {
                  case "paragraph":
                    return <Paragraph key={i} value={elem.value} />;
                  case "button":
                    return <Button key={i} value={elem.value} />;
                }
              })}
            </div>

            <span
              className={`absolute bottom-0 text-[13vw] sm:text-[80px] lg:text-[100px] font-bold leading-[1] translate-y-1/2 right-[1.8%] md:-right-[0.2em] flex gap-[0.2em]`}
            >
              <span>{(activeSlide + 1).toString().padStart(2, "0")}</span>
              <span>/</span>
              <span>{data.length.toString().padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

const Paragraph = ({ value }) => {
  return (
    <p className="text-[4vw] sm:text-2xl lg:text-[28px] font-medium !leading-[1.5]">
      {value.map((part, i) => {
        if (part.style === "normal") {
          return <React.Fragment key={i}> {part.value} </React.Fragment>;
        }

        if (part.style === "highlight") {
          return (
            <span
              key={i}
              className="bg-purpleBlackGr py-0.5 rounded-md text-white box-decoration-slice"
            >
              {part.value.split(" ").map((word, j, arr) => (
                <span key={j} className="px-1">
                  {word}
                  {j !== arr.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          );
        }
      })}
    </p>
  );
};

const Button = ({ value }) => {
  return (
    <button className="text-[3.5vw] sm:text-xl lg:text-[26px] text-white bg-purpleGr font-semibold rounded-lg leading-[1] p-2 relative">
      {value}
    </button>
  );
};
