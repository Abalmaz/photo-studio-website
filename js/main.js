/**
 * Taran AY Photography — Main JavaScript
 * Handles mobile navigation and dynamic content loading.
 */
(function () {
  'use strict';

  const loadHTML = async (url, element) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.statusText}`);
      }
      const text = await response.text();
      element.innerHTML = text;
    } catch (error) {
      console.error(error);
    }
  };

  const setActiveNavLink = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath || (currentPath === '/index.html' && linkPath === '/')) {
        link.classList.add('nav__link--active');
      } else {
        link.classList.remove('nav__link--active');
      }
    });
  };

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

  document.addEventListener('DOMContentLoaded', async () => {
    const headerPlaceholder = document.createElement('div');
    headerPlaceholder.id = 'header-placeholder';
    document.body.prepend(headerPlaceholder);

    const footerPlaceholder = document.createElement('div');
    footerPlaceholder.id = 'footer-placeholder';
    document.body.append(footerPlaceholder);

    await loadHTML('/header.html', headerPlaceholder);
    await loadHTML('/footer.html', footerPlaceholder);
    
    initMobileMenu();
    setActiveNavLink();

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  });

})();
