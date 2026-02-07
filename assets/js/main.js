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

  // Close mobile nav when device orientation changes
  window.addEventListener("orientationchange", function () {
    if (isMobileMenuOpen()) closeNav();
  });
  // Also handle resize (covers desktop ↔ mobile breakpoint transitions)
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isMobileMenuOpen()) closeNav();
  });

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

  /* ========== Contact Form — EmailJS Integration ========== */
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById("submitBtn");
      const btnText = document.getElementById("btnText");

      // Disable button and show loading state
      submitBtn.disabled = true;
      btnText.textContent = "Sending…";

      // Collect form data (field names must match your EmailJS template variables)
      const templateParams = {
        from_name: contactForm.from_name.value,
        from_email: contactForm.from_email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value
      };

      // ⚠️  Replace these two IDs with your actual EmailJS Service ID and Template ID
      emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(
          function () {
            // Success — real email was sent
            showFormMessage(successMsg);
            contactForm.reset();
          },
          function (error) {
            // Failure — show error message
            console.error("EmailJS error:", error);
            showFormMessage(errorMsg);
          }
        )
        .finally(function () {
          submitBtn.disabled = false;
          btnText.textContent = "Send Message";
        });
    });
  }

  function showFormMessage(element) {
    element.classList.add("show");
    setTimeout(() => {
      element.classList.remove("show");
    }, 5000);
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
let savedScrollY = 0;

/**
 * Show a single image in the gallery and update the counter.
 * Uses a brief opacity fade for a smooth transition.
 */
function updateGalleryImage() {
  const img = document.getElementById("galleryImage");
  img.style.opacity = "0";
  setTimeout(function () {
    img.src = currentGallery[currentImageIndex];
    img.alt = "Achievement image " + (currentImageIndex + 1);
    img.style.opacity = "1";
  }, 150);
  document.getElementById("currentImage").textContent = currentImageIndex + 1;
  document.getElementById("totalImages").textContent = currentGallery.length;
}

function openGallery(achievementId) {
  currentGallery = galleryData[achievementId] || [];
  currentImageIndex = 0;
  if (currentGallery.length === 0) return;

  // Lock body scroll — save position, apply class
  savedScrollY = window.scrollY;
  document.body.style.top = "-" + savedScrollY + "px";
  document.body.classList.add("modal-open");

  // Show the first image immediately (no fade for the initial load)
  var img = document.getElementById("galleryImage");
  img.src = currentGallery[0];
  img.alt = "Achievement image 1";
  img.style.opacity = "1";
  document.getElementById("currentImage").textContent = "1";
  document.getElementById("totalImages").textContent = currentGallery.length;

  document.getElementById("galleryModal").classList.add("active");
}

function closeGallery() {
  document.getElementById("galleryModal").classList.remove("active");

  // Restore body scroll
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo(0, savedScrollY);
}

function nextImage() {
  if (currentGallery.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
  updateGalleryImage();
  if (navigator.vibrate) navigator.vibrate(10);
}

function prevImage() {
  if (currentGallery.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
  updateGalleryImage();
  if (navigator.vibrate) navigator.vibrate(10);
}

// Keyboard navigation for gallery
document.addEventListener("keydown", function (e) {
  var modal = document.getElementById("galleryModal");
  if (modal && modal.classList.contains("active")) {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }
});

// Touch swipe support for gallery
(function () {
  var touchStartX = 0;
  var touchStartY = 0;
  var SWIPE_THRESHOLD = 50;

  function isGalleryActive() {
    var modal = document.getElementById("galleryModal");
    return modal && modal.classList.contains("active");
  }

  document.addEventListener("touchstart", function (e) {
    if (!isGalleryActive()) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener("touchend", function (e) {
    if (!isGalleryActive()) return;
    var diffX = touchStartX - e.changedTouches[0].screenX;
    var diffY = touchStartY - e.changedTouches[0].screenY;

    if (Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }, { passive: true });
})();
