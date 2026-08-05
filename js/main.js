/**
 * Luminé Studio — Main JavaScript
 * Mobile navigation, scroll effects, and gallery filters
 */

(function () {
  'use strict';

  /* --- Mobile Menu --- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const body = document.body;

  function openMenu() {
    menuToggle.classList.add('menu-toggle--open');
    mobileNav.classList.add('mobile-nav--open');
    body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menuToggle.classList.remove('menu-toggle--open');
    mobileNav.classList.remove('mobile-nav--open');
    body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      if (mobileNav.classList.contains('mobile-nav--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
        closeMenu();
      }
    });
  }

  /* --- Header Scroll Effect --- */
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  /* --- Fade-in on Scroll --- */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('fade-in--visible');
    });
  }

  /* --- Gallery Filter --- */
  const filterButtons = document.querySelectorAll('.gallery-filters__btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;

        filterButtons.forEach(function (b) {
          b.classList.remove('gallery-filters__btn--active');
        });
        btn.classList.add('gallery-filters__btn--active');

        galleryItems.forEach(function (item) {
          const category = item.dataset.category;

          if (filter === 'all' || category === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            requestAnimationFrame(function () {
              item.style.transition = 'opacity 0.4s ease';
              item.style.opacity = '1';
            });
          } else {
            item.style.opacity = '0';
            setTimeout(function () {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  /* --- Contact Form (client-side validation) --- */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderBottomColor = '#c0392b';
        } else {
          field.style.borderBottomColor = '';
        }
      });

      if (isValid) {
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent';
        submitBtn.disabled = true;

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });
  }
})();
