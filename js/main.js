/* =============================================================
   KGMediaWorks — interactions
   Mobile nav · reveal-on-scroll · marquee doubling · form · year
   ============================================================= */
(function () {
  'use strict';

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile navigation ---- */
  var toggle = document.getElementById('navToggle');
  var closeBtn = document.getElementById('navClose');
  var mobileNav = document.getElementById('mobileNav');

  function openNav() {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (toggle) toggle.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeNav();
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el, i) {
      // Gentle stagger for siblings entering together
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Header elevation on scroll ---- */
  var header = document.querySelector('.site-header');
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (header) header.style.boxShadow = y > 10 ? '0 10px 30px rgba(7,37,34,0.18)' : 'none';
    lastScroll = y;
  }, { passive: true });

  /* ---- Contact form (front-end demo handler) ---- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      status.hidden = false;

      if (!name.value.trim() || !email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
        status.className = 'form__status';
        status.style.color = '#a23b2d';
        status.textContent = 'Please enter your name and a valid email.';
        return;
      }
      // No backend wired up — swap this for your endpoint / form service.
      status.className = 'form__status ok';
      status.style.color = '';
      status.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] + '! We\'ll be in touch within one business day.';
      form.reset();
    });
  }
})();
