/**
 * Taran AY Photography — Main JavaScript
 * Handles mobile navigation menu.
 */
(function () {
  'use strict';

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

    // Close menu if a link is clicked
    mobileNav.addEventListener('click', function(e) {
      if (e.target.matches('.mobile-nav__link')) {
        mobileNav.classList.remove('mobile-nav--open');
        menuToggle.classList.remove('menu-toggle--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
        mobileNav.classList.remove('mobile-nav--open');
        menuToggle.classList.remove('menu-toggle--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }
  
  // Set dynamic year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

})();
