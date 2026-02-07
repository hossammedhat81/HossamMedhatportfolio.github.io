/**
 * Hossam Medhat Portfolio — Main JavaScript
 * Handles: loading screen, navigation, scroll-to-top,
 * rotating circle text, stat counters, scroll-reveal animations,
 * active nav highlighting, and contact form.
 */

(function () {
  "use strict";

  /* ========== DOM References ========== */
  const loader = document.getElementById("loader");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const burgerIcon = document.getElementById("burgerIcon");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");
  const navLinks = document.querySelectorAll(".nav-menu ul a");
  const navCta = document.querySelector(".nav-cta");
  const statElements = document.querySelectorAll(".hero-stat");
  const contactForm = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMsg");
  const errorMsg = document.getElementById("errorMsg");
  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("section[id]");

  /* ========== Loading Screen ========== */
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 800);
  });

  /* ========== Scroll-to-Top Button ========== */
  function handleScrollBtn() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ========== Mobile Navigation ========== */
  function isMobileMenuOpen() {
    return navMenu.classList.contains("active");
  }

  function closeNav() {
    burgerIcon.classList.remove("active");
    navMenu.classList.remove("active");
    navOverlay.classList.remove("active");
  }

  /**
   * Navigate to a section by its hash (e.g. "#about").
   * On mobile: close menu first, then scroll after a brief delay
   * so the layout settles before computing scroll position.
   */
  function navigateToSection(hash) {
    const targetId = hash.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    if (isMobileMenuOpen()) {
      closeNav();
      // Wait for menu close transition to finish, then scroll
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    } else {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  burgerIcon.addEventListener("click", () => {
    burgerIcon.classList.toggle("active");
    navMenu.classList.toggle("active");
    navOverlay.classList.toggle("active");
  });

  navOverlay.addEventListener("click", closeNav);

  // Attach click handlers to ALL nav links (both <ul> links and CTA button)
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const hash = this.getAttribute("href");
      navigateToSection(hash);
      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, hash);
      }
    });
  });

  // Also handle the "Contact Me" CTA button in the nav
  if (navCta) {
    navCta.addEventListener("click", function (e) {
      e.preventDefault();
      const hash = this.getAttribute("href");
      navigateToSection(hash);
      if (history.pushState) {
        history.pushState(null, null, hash);
      }
    });
  }

  /* ========== Active Nav Link on Scroll ========== */
  function highlightActiveSection() {
    const scrollY = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active-link");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active-link");
          }
        });
      }
    });
  }

  /* ========== Stat Counter Animation ========== */
  let statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;
    statsAnimated = true;

    statElements.forEach((stat) => {
      const target = parseInt(stat.dataset.target, 10);
      const suffix = stat.dataset.suffix || "";
      const h3 = stat.querySelector("h3");
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(eased * target);
        h3.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          h3.textContent = target + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  /* ========== Scroll Reveal ========== */
  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add("revealed");
      }
    });

    // Trigger stat counter when hero section is visible
    if (!statsAnimated) {
      const heroStats = document.querySelector(".hero-stats");
      if (heroStats) {
        const rect = heroStats.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          animateCounters();
        }
      }
    }
  }

  /* ========== Contact Form ========== */
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Collect form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // For now, show success message (integrate with backend/email service later)
      showFormMessage(successMsg);
      contactForm.reset();

      // To integrate with a real service like EmailJS, Formspree, or custom backend:
      // fetch('YOUR_ENDPOINT', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      //   .then(res => { if (res.ok) showFormMessage(successMsg); else showFormMessage(errorMsg); })
      //   .catch(() => showFormMessage(errorMsg));
    });
  }

  function showFormMessage(element) {
    element.classList.add("show");
    setTimeout(() => {
      element.classList.remove("show");
    }, 3000);
  }

  /* ========== Scroll Event Listener ========== */
  window.addEventListener("scroll", () => {
    handleScrollBtn();
    highlightActiveSection();
    revealOnScroll();
  });

  // Initial calls
  revealOnScroll();
  highlightActiveSection();
})();

/* ========== Achievement Gallery Lightbox ========== */
const galleryData = {
  techxchange: [
    "images/achievements/techxchange-mentor-card.jpg",
    "images/achievements/techxchange-event-hall.jpg",
    "images/achievements/techxchange-banner.jpg",
    "images/achievements/techxchange-official-photo.jpg"
  ],
  crashxpert: [
    "images/achievements/crashxpert-award.jpg",
    "images/achievements/crashxpert-team.jpg",
    "images/achievements/crashxpert-device.jpg"
  ],
  firefighting: [
    "images/achievements/firefighting-award.jpg",
    "images/achievements/firefighting-robot.jpg"
  ],
  hack24: [
    "images/achievements/hack24-certificate.jpg",
    "images/achievements/hack24-team.jpg"
  ],
  depi: [
    "images/achievements/depi-certificate.jpg",
    "images/achievements/depi-graduation.jpg"
  ],
  itida: [
    "images/achievements/itida-certificate.jpg",
    "images/achievements/itida-event.jpg"
  ],
  gigs: [
    "images/achievements/khamsat-profile.jpg",
    "images/achievements/gigs-testimonials.jpg",
    "images/achievements/gigs-projects.jpg"
  ],
  luminous: [
    "images/achievements/luminous-techfury.jpg",
    "images/achievements/luminous-team.jpg"
  ],
  certs: [
    "images/achievements/cert-ibm.jpg",
    "images/achievements/cert-deeplearning.jpg",
    "images/achievements/cert-iti.jpg",
    "images/achievements/cert-all.jpg"
  ]
};

let currentGallery = [];
let currentImageIndex = 0;

function openGallery(achievementId) {
  const modal = document.getElementById("galleryModal");
  const container = document.getElementById("galleryImages");

  currentGallery = galleryData[achievementId] || [];
  currentImageIndex = 0;

  container.innerHTML = "";

  currentGallery.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Achievement photo " + (i + 1);
    img.loading = (i === 0) ? "eager" : "lazy";
    container.appendChild(img);
  });

  document.getElementById("totalImages").textContent = currentGallery.length;
  updateGalleryCounter();

  // Scroll container to start position
  container.scrollLeft = 0;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  const modal = document.getElementById("galleryModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateGalleryCounter() {
  document.getElementById("currentImage").textContent = currentImageIndex + 1;
}

/**
 * Scroll the gallery container so the image at `index` is centered.
 * Uses container.scrollTo for reliability instead of scrollIntoView,
 * which can scroll the whole page on mobile.
 */
function scrollGalleryTo(index) {
  const container = document.getElementById("galleryImages");
  const images = container.querySelectorAll("img");
  if (!images[index]) return;

  const img = images[index];
  // Calculate the scroll position to center the image in the container
  const containerWidth = container.clientWidth;
  const imgLeft = img.offsetLeft;
  const imgWidth = img.offsetWidth;
  const scrollTarget = imgLeft - (containerWidth / 2) + (imgWidth / 2);

  container.scrollTo({
    left: Math.max(0, scrollTarget),
    behavior: "smooth"
  });
}

function nextImage() {
  const container = document.getElementById("galleryImages");
  const images = container.querySelectorAll("img");
  if (images.length === 0) return;

  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
  } else {
    // Wrap around to first image
    currentImageIndex = 0;
  }
  scrollGalleryTo(currentImageIndex);
  updateGalleryCounter();
}

function prevImage() {
  const container = document.getElementById("galleryImages");
  const images = container.querySelectorAll("img");
  if (images.length === 0) return;

  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    // Wrap around to last image
    currentImageIndex = images.length - 1;
  }
  scrollGalleryTo(currentImageIndex);
  updateGalleryCounter();
}

// Keyboard navigation for gallery
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("galleryModal");
  if (modal && modal.classList.contains("active")) {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }
});

// Touch swipe support for gallery
(function () {
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50; // minimum px for a swipe

  document.addEventListener("touchstart", function (e) {
    const modal = document.getElementById("galleryModal");
    if (modal && modal.classList.contains("active")) {
      touchStartX = e.changedTouches[0].screenX;
    }
  }, { passive: true });

  document.addEventListener("touchend", function (e) {
    const modal = document.getElementById("galleryModal");
    if (modal && modal.classList.contains("active")) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) {
          nextImage(); // swipe left → next
        } else {
          prevImage(); // swipe right → prev
        }
      }
    }
  }, { passive: true });
})();
