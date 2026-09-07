// Websitegedrag. Gewoon JavaScript; geen buildstap nodig.

// Navigatie op mobiel en desktop
(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileViewport = window.matchMedia("(max-width: 900px)");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const setMenuState = (open, restoreFocus = false) => {
    const isOpen = open && mobileViewport.matches;
    header?.classList.toggle("is-menu-open", isOpen);
    document.body.classList.toggle("is-menu-open", isOpen);
    document.documentElement.classList.toggle("is-menu-open", isOpen);
    menuToggle?.setAttribute("aria-expanded", String(isOpen));
    menuToggle?.setAttribute(
      "aria-label",
      isOpen ? "Menu sluiten" : "Menu openen",
    );
    if (nav) nav.inert = mobileViewport.matches && !isOpen;
    document.dispatchEvent(
      new CustomEvent("navigation:toggle", { detail: { isOpen } }),
    );
    if (restoreFocus) menuToggle?.focus({ preventScroll: true });
  };

  setMenuState(false);
  mobileViewport.addEventListener("change", () => setMenuState(false));
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuToggle?.addEventListener("click", () => {
    setMenuState(!header?.classList.contains("is-menu-open"));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  const sectionLinks = [
    ...document.querySelectorAll('.site-header__nav a[href^="#"]'),
  ];
  const sectionTargets = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href") || ""))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        sectionLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isCurrent);

          if (isCurrent) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-36% 0px -52% 0px" },
  );

  sectionTargets.forEach((section) => observer.observe(section));

  window.addEventListener("keydown", (event) => {
    if (!header?.classList.contains("is-menu-open")) return;
    if (event.key === "Escape") {
      setMenuState(false, true);
    }
    if (event.key === "Tab") {
      const links = [...(nav?.querySelectorAll("a[href]") ?? [])];
      const first = links[0];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        menuToggle?.focus();
      } else if (!event.shiftKey && document.activeElement === menuToggle) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
})();

// Scrollgedrag en animatieklok
(() => {
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  gsap.registerPlugin(ScrollTrigger);

  if (!prefersReducedMotion) {
    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      wheelMultiplier: 0.82,
    });

    document.addEventListener("navigation:toggle", (event) => {
      const { isOpen } = event.detail;
      if (isOpen) lenis.stop();
      else lenis.start();
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();
        lenis.scrollTo(target, { offset: -72 });
      });
    });
  }
})();

// Hero
(() => {
  if (!window.gsap || !window.ScrollTrigger || !document.querySelector(".hero"))
    return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from("[data-hero-animate]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.85,
        stagger: 0.12,
      })
      .from(
        "[data-hero-actions]",
        {
          autoAlpha: 0,
          y: 14,
          duration: 0.65,
        },
        "-=0.32",
      );
  }
})();

// Services
(() => {
  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    !document.querySelector(".services")
  )
    return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("[data-services-reveal]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".services",
        start: "top 72%",
        once: true,
      },
    });
  }
})();

// WinterReady
(() => {
  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    !document.querySelector(".winter")
  )
    return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("[data-winter-reveal]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.11,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".winter",
        start: "top 72%",
        once: true,
      },
    });

    gsap.to("[data-winter-image]", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".winter",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
})();

// Projects
(() => {
  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    !document.querySelector(".projects")
  )
    return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("[data-projects-reveal]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.1,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".projects",
        start: "top 72%",
        once: true,
      },
    });
  }
})();

// About
(() => {
  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    !document.querySelector(".about")
  )
    return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("[data-about-reveal]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.11,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".about",
        start: "top 72%",
        once: true,
      },
    });

    gsap.to("[data-about-image]", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
})();

// Workflow
(() => {
  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    !document.querySelector(".workflow")
  )
    return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("[data-workflow-reveal]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.85,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".workflow",
        start: "top 74%",
        once: true,
      },
    });

    gsap.from("[data-workflow-step]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.14,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".workflow__steps",
        start: "top 76%",
        once: true,
      },
    });

    gsap.fromTo(
      ".workflow__steps",
      { "--line-progress": "0%" },
      {
        "--line-progress": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".workflow__steps",
          start: "top 78%",
          end: "bottom 62%",
          scrub: true,
        },
      },
    );
  }
})();

// Contact
(() => {
  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    !document.querySelector(".contact")
  )
    return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("[data-contact-reveal]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.1,
      immediateRender: false,
      scrollTrigger: {
        trigger: ".contact",
        start: "top 74%",
        once: true,
      },
    });
  }
})();
