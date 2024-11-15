const scrollToAbout = (func) => {
  const spreadModelSpace = document.getElementById("s-spread-model-space");
  window.scrollTo({
    top:
      spreadModelSpace.offsetTop +
      spreadModelSpace.scrollHeight *
        (((((9 / 371) * (window.innerHeight - 944) + 31) / 14200) *
          (window.innerWidth - 1920) +
          82.5) /
          100) -
      window.innerHeight,
    behavior: "smooth",
  });
  func();
  console.log("about-us-onclick");
};

const scrollToStudies = (func) => {
  const spreadModelSpace = document.getElementById("s-spread-model-space");
  window.scrollTo({
    top:
      spreadModelSpace.offsetTop +
      spreadModelSpace.scrollHeight *
        (((((6 / 865) * (window.innerHeight - 944) + 9) / 2840) *
          (window.innerWidth - 1920) +
          48) /
          100) -
      window.innerHeight,
    behavior: "smooth",
  });
  func();
  console.log("case-studies-onclick");
};

const scrollToTalk = (func) => {
  window.scrollTo({
    top: document.getElementById("footer")?.offsetTop,
    behavior: "smooth",
  });
  func();
  console.log("footer_onclick");
};
const scrollToSandbox = (func) => {
  window.scrollTo({
    top: document.getElementById("s-model-pieces-space")?.offsetTop,
    behavior: "smooth",
  });
  func();
  console.log("sandbox_onclick");
};
export { scrollToAbout, scrollToSandbox, scrollToStudies, scrollToTalk };
