/**
 * Ida Photography — Main JavaScript
 * Handles mobile navigation, active page state, and booking widget positioning.
 */
(function () {
  'use strict';

  // --- Mobile Menu Handler ---
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', function () {
        const isMenuOpen = mobileNav.classList.toggle('mobile-nav--open');
        menuToggle.classList.toggle('menu-toggle--open');
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        body.style.overflow = isMenuOpen ? 'hidden' : '';
      });

      mobileNav.addEventListener('click', function(e) {
        if (e.target.matches('.mobile-nav__link')) {
          mobileNav.classList.remove('mobile-nav--open');
          menuToggle.classList.remove('menu-toggle--open');
          menuToggle.setAttribute('aria-expanded', 'false');
          body.style.overflow = '';
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
          mobileNav.classList.remove('mobile-nav--open');
          menuToggle.classList.remove('menu-toggle--open');
          menuToggle.setAttribute('aria-expanded', 'false');
          body.style.overflow = '';
        }
      });
    }
  };

  // --- Active Navigation Link Handler ---
  const setActiveNavLink = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      const isHomePage = (currentPath === '/' || currentPath === '/index.html') && linkPath === '/';
      
      if (linkPath === currentPath || isHomePage) {
        link.classList.add('nav-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav-active');
        link.removeAttribute('aria-current');
      }
    });
  };

  // --- Dynamic Year in Footer ---
  const setFooterYear = () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  };

  // --- Floating Widget Repositioning ---
  const initFooterObserver = () => {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('footer-visible');
          } else {
            document.body.classList.remove('footer-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
  };

  // --- Initialize all scripts on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    setActiveNavLink();
    setFooterYear();
    initFooterObserver();
  });

})();
