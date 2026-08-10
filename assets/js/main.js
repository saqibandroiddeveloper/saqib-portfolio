/* Portfolio interactions: theme, mobile nav, project filter, scroll effects. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var stored = null;

  try {
    stored = localStorage.getItem("theme");
  } catch (e) {
    /* storage blocked (private mode) — fall back to system preference */
  }

  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(stored || (prefersLight ? "light" : "dark"));

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  /* ---------- Mobile navigation ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") return;
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  }

  /* ---------- Project filtering ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  var cards = document.querySelectorAll(".project-card");

  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.dataset.filter;

      Array.prototype.forEach.call(chips, function (other) {
        other.classList.toggle("is-active", other === chip);
      });

      Array.prototype.forEach.call(cards, function (card) {
        var tags = (card.dataset.tags || "").split(" ");
        var show = filter === "all" || tags.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Sticky header + back to top ---------- */
  var header = document.getElementById("siteHeader");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (toTop) toTop.classList.toggle("is-visible", y > 500);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Active nav link ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav a");

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          Array.prototype.forEach.call(navLinks, function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    Array.prototype.forEach.call(sections, function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section-title, .section-sub, .about-grid, .skill-card, .project-card, .timeline-item, .contact-card"
  );

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    Array.prototype.forEach.call(revealTargets, function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      revealObserver.observe(el);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
