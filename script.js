const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.setAttribute("aria-expanded", "false");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const mathBlocks = document.querySelectorAll(".math-block");

if (mathBlocks.length && !document.querySelector("script[data-mathjax]")) {
  window.MathJax = {
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["\\[", "\\]"]],
    },
    svg: {
      fontCache: "global",
    },
  };

  const mathScript = document.createElement("script");
  mathScript.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  mathScript.defer = true;
  mathScript.dataset.mathjax = "true";
  document.head.appendChild(mathScript);
}

let mouseTicking = false;

const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsFinePointer && !prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    if (mouseTicking) {
      return;
    }

    mouseTicking = true;
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      mouseTicking = false;
    });
  });
}
