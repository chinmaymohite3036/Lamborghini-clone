document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelectorAll(".nav-links");

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.forEach((link) => {
      link.classList.toggle("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav-links") &&
      !e.target.closest(".mobile-menu-btn")
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
    }
  });

  // Hero Video Section
  const videoElement = document.querySelector(".hero-video");
  const sourceElement = videoElement.querySelector("source");
  const heroText = document.getElementById("hero-text");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  const playlist = [
    {
      src: "assets/andreahero.mp4",
      text: `
        <h2>THE REDZONE WITH CALDARELLI</h2>
        <h1>TEMERARIO</h1>
        <h1>BEYOND</h1>
        <h1>THE LIMIT</h1>
      `,
    },
    {
      src: "assets/hero3.mp4",
      text: `
        <h2>DUCATI PANIGALE V4 LAMBORGHINI</h2>
        <h1>THE ART OF</h1>
        <h1>UNEXPECTED</h1>
      `,
    },
    {
      src: "assets/hero2.mp4",
      text: `
        <h2>POLO STORICO</h2>
        <h1>10 YEARS</h1>
        <h1>OF HISTORY &</h1>
        <h1>PASSION</h1>
      `,
    },
  ];

  let currentVideo = 0;

  function showVideoSlide(index) {
    if (index < 0 || index >= playlist.length) return;

    currentVideo = index;
    const { src, text } = playlist[currentVideo];

    sourceElement.src = src;
    videoElement.load();
    videoElement.play();

    // Change text
    heroText.innerHTML = text;

    // Re-trigger animation
    const h1 = heroText.querySelector("h1");
    h1.style.animation = "none";
    h1.offsetHeight;
    h1.style.animation = "slideInFromLeft 1s ease forwards";
  }

  function playNext() {
    currentVideo = (currentVideo + 1) % playlist.length;
    showVideoSlide(currentVideo);
  }

  function playPrevious() {
    if (currentVideo - 1 >= 0) {
      showVideoSlide(currentVideo - 1);
    }
  }

  // Event Listeners for video section
  nextBtn.addEventListener("click", playNext);
  prevBtn.addEventListener("click", playPrevious);
  videoElement.addEventListener("ended", playNext);

  // Initial load for video
  showVideoSlide(0);

  // Configurator Section
  const configSlides = document.querySelectorAll(".config-slide");
  const modelButtons = document.querySelectorAll(".model-btn");

  function switchModel(index) {
    // Remove active class from all slides
    configSlides.forEach((slide) => slide.classList.remove("active"));

    // Add active class to selected slide
    configSlides[index].classList.add("active");

    // Update button states for all model selectors
    const modelNames = ["temerario", "revuelto", "urus"];
    const selectedModel = modelNames[index];
    configSlides.forEach((slide) => {
      const buttons = slide.querySelectorAll(".model-btn");
      buttons.forEach((btn) => {
        if (btn.textContent.trim().toLowerCase() === selectedModel) {
          btn.classList.add("selected");
        } else {
          btn.classList.remove("selected");
        }
      });
    });
  }

  // Add click event listeners to all model buttons
  modelButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const model = button.textContent.trim().toLowerCase();
      let index = 0;
      if (model === "temerario") index = 0;
      else if (model === "revuelto") index = 1;
      else if (model === "urus") index = 2;
      switchModel(index);
    });
  });

  // Navigation buttons for configurator
  document.getElementById("next")?.addEventListener("click", () => {
    const nextIndex =
      (Array.from(configSlides).findIndex((slide) =>
        slide.classList.contains("active")
      ) +
        1) %
      configSlides.length;
    switchModel(nextIndex);
  });

  document.getElementById("prev")?.addEventListener("click", () => {
    const currentIndex = Array.from(configSlides).findIndex((slide) =>
      slide.classList.contains("active")
    );
    const prevIndex =
      (currentIndex - 1 + configSlides.length) % configSlides.length;
    switchModel(prevIndex);
  });
});

const slides = document.querySelectorAll(".model-slide");
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("slide-visible");
    slide.classList.add("slide-hidden");
  });
  slides[index].classList.remove("slide-hidden");
  slides[index].classList.add("slide-visible");
}

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

document.getElementById("prev").addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});
