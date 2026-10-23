/**
 * main.js — Kazan Terminal × Glass Morphism
 * 1. Typing animation
 * 2. Lab filter tabs
 * 3. Scroll fade-in (IntersectionObserver)
 * 4. Smooth scroll / active nav highlight
 * 5. Copy-to-clipboard for code blocks
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. TYPING ANIMATION
     Cycles through phrases in elements with id="typing-target"
     or class="typing-text"
  ---------------------------------------------------------- */

  const TYPING_PHRASES = [
    'AI Agent를 설계합니다.',
    '보안 도구를 빌드합니다.',
    'Vibe Coding을 실험합니다.',
    'MCP 플러그인을 만듭니다.',
    '오픈소스로 공유합니다.',
  ];

  function initTypingAnimation() {
    const targets = document.querySelectorAll('#typing-target, .typing-text');
    if (!targets.length) return;

    targets.forEach(function (el) {
      el.classList.add('typing-cursor');
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let pauseTimer = null;

      function tick() {
        const currentPhrase = TYPING_PHRASES[phraseIndex];

        if (isDeleting) {
          charIndex--;
        } else {
          charIndex++;
        }

        el.textContent = currentPhrase.substring(0, charIndex);

        let delay = isDeleting ? 50 : 90;

        if (!isDeleting && charIndex === currentPhrase.length) {
          // Pause at end of phrase
          delay = 1800;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
          delay = 300;
        }

        clearTimeout(pauseTimer);
        pauseTimer = setTimeout(tick, delay);
      }

      // Small initial delay before starting
      setTimeout(tick, 600);
    });
  }

  /* ----------------------------------------------------------
     2. LAB FILTER TABS
     .filter-btn[data-filter="category"] toggles .lab-card[data-category]
  ---------------------------------------------------------- */

  function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const labCards   = document.querySelectorAll('.lab-card');

    if (!filterBtns.length || !labCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter') || 'all';

        // Update active state on buttons
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Show / hide cards
        labCards.forEach(function (card) {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            // Re-trigger fade-in
            requestAnimationFrame(function () {
              card.classList.remove('visible');
              requestAnimationFrame(function () {
                card.classList.add('visible');
              });
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------
     3. SCROLL FADE-IN (IntersectionObserver)
     Elements with class "fade-in-up" animate when they enter viewport
  ---------------------------------------------------------- */

  function initScrollFadeIn() {
    const elements = document.querySelectorAll('.fade-in-up');
    if (!elements.length) return;

    // If browser doesn't support IntersectionObserver, just show everything
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     4. ACTIVE NAV HIGHLIGHT
     Adds "active" class to current nav link based on pathname
  ---------------------------------------------------------- */

  function initActiveNav() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.md-nav__link');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      // Exact or prefix match
      if (path === href || (href !== '/' && path.startsWith(href))) {
        link.classList.add('md-nav__link--active');
      }
    });
  }

  /* ----------------------------------------------------------
     5. COPY CODE BUTTON ENHANCEMENT
     Adds visual "Copied!" feedback to MkDocs Material copy buttons
  ---------------------------------------------------------- */

  function initCopyFeedback() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.md-clipboard');
      if (!btn) return;

      const icon = btn.querySelector('svg') || btn;
      const original = btn.title;
      btn.title = 'Copied!';
      btn.classList.add('scale-pop');

      setTimeout(function () {
        btn.title = original;
        btn.classList.remove('scale-pop');
      }, 1500);
    });
  }

  /* ----------------------------------------------------------
     6. SMOOTH ANCHOR SCROLL
     Override default anchor jump with smooth scroll
  ---------------------------------------------------------- */

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ----------------------------------------------------------
     7. STATS COUNTER ANIMATION
     Elements with class "count-up" and data-target="number"
  ---------------------------------------------------------- */

  function initCountUp() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-target') || el.textContent;
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          const suffix = el.getAttribute('data-suffix') || '';
          const dur    = 1200; // ms
          const steps  = 40;
          const inc    = target / steps;
          let current  = 0;
          let step     = 0;

          const interval = setInterval(function () {
            step++;
            current = Math.min(Math.round(inc * step), target);
            el.textContent = current + suffix;
            if (step >= steps) clearInterval(interval);
          }, dur / steps);

          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     8. THEME TOGGLE GLOW (fun extra for dark/light toggle)
  ---------------------------------------------------------- */

  function initThemeGlow() {
    const toggle = document.querySelector('[data-md-toggle="scheme"]');
    if (!toggle) return;

    toggle.addEventListener('change', function () {
      document.body.classList.add('theme-transitioning');
      setTimeout(function () {
        document.body.classList.remove('theme-transitioning');
      }, 400);
    });
  }

  /* ----------------------------------------------------------
     9. 3D CARD STACK & VERTICAL COVERFLOW INTERACTION
  ---------------------------------------------------------- */

  function initStackCarousel() {
    const deck = document.querySelector('.stack-cards-deck');
    const cards = document.querySelectorAll('.stack-card');
    if (!cards.length) return;

    const prevBtn = document.querySelector('.stack-nav-prev');
    const nextBtn = document.querySelector('.stack-nav-next');
    const activeNum = document.querySelector('.stack-nav-counter .active-num');
    const totalNum = document.querySelector('.stack-nav-counter .total-num');

    if (totalNum) {
      totalNum.textContent = String(cards.length).padStart(2, '0');
    }

    // Default tilt angles for organic stacked deck look (matching reference image)
    const tiltPresets = [
      { z: -4.5, x: 3.5 },
      { z: 3.8,  x: 2.2 },
      { z: -2.8, x: 3.0 },
      { z: 4.2,  x: -2.0 },
      { z: -3.5, x: 2.5 }
    ];

    cards.forEach(function (card, index) {
      card.style.setProperty('--card-index', index);
      const preset = tiltPresets[index % tiltPresets.length];
      card.style.setProperty('--tilt-angle', preset.z + 'deg');
      card.style.setProperty('--tilt-x', preset.x + 'deg');

      // 3D Mouse Tilt on hover (Desktop)
      card.addEventListener('mousemove', function (e) {
        if (window.innerWidth < 992) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateY = (x / (rect.width / 2)) * 5;
        const rotateX = -(y / (rect.height / 2)) * 5;
        card.style.transform =
          'perspective(1200px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function () {
        const preset = tiltPresets[index % tiltPresets.length];
        card.style.transform = '';
      });
    });

    // Scroll Stacking & Active Index Observer
    let currentIndex = 0;

    function updateActiveCardOnScroll() {
      const viewportCenter = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach(function (card, idx) {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height * 0.3;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }

        // Stacking depth / dim effect for cards that have stuck to the top
        if (rect.top <= 140) {
          const depth = (140 - rect.top) / 400;
          const scale = Math.max(0.92, 1 - depth * 0.08);
          const brightness = Math.max(0.75, 1 - depth * 0.25);
          card.style.filter = 'brightness(' + brightness + ')';
        } else {
          card.style.filter = '';
        }
      });

      if (closestIdx !== currentIndex) {
        currentIndex = closestIdx;
        if (activeNum) {
          activeNum.textContent = String(currentIndex + 1).padStart(2, '0');
        }
      }
    }

    window.addEventListener('scroll', updateActiveCardOnScroll, { passive: true });
    updateActiveCardOnScroll();

    // Navigation Buttons (Vertical Step Navigation)
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
          cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (currentIndex < cards.length - 1) {
          currentIndex++;
          cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  /* ----------------------------------------------------------
     INIT — run all on DOMContentLoaded
  ---------------------------------------------------------- */

  function init() {
    initTypingAnimation();
    initFilterTabs();
    initScrollFadeIn();
    initActiveNav();
    initCopyFeedback();
    initSmoothScroll();
    initCountUp();
    initThemeGlow();
    initStackCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run on MkDocs instant navigation (SPA page changes)
  if (typeof document$ !== 'undefined') {
    // MkDocs Material exposes an RxJS-like observable
    document$.subscribe(function () {
      init();
    });
  }

})();
