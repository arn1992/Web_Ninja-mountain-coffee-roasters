(function() {
  'use strict';

  // --- Dark Mode System ---
  function getInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.querySelector('.theme-toggle .icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // --- Mobile Navigation ---
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-active');
        toggle.setAttribute('aria-expanded', isOpen);
      });

      // Close menu on link click
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove('is-active');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // --- Header Scroll State ---
  function initHeaderScroll() {
    const header = document.getElementById('header-main');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      });
    }
  }

  // --- Intersection Observer (Fade In) ---
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
  }

  // --- Magnetic Buttons ---
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // --- Subscription Form ---
  function initSubscriptionForm() {
    const form = document.getElementById('form-subscription');
    const feedback = document.querySelector('.form-sub-feedback');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const input = form.querySelector('input');
        
        btn.disabled = true;
        btn.textContent = 'CONNECTING...';
        
        // Mock API Call
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'JOINED';
          input.value = '';
          if (feedback) {
            feedback.textContent = 'Welcome to the Basecamp Club, explorer.';
            feedback.style.color = '#00F0FF';
          }
        }, 1500);
      });
    }
  }

  // --- Initial Theme Application (Prevent Flash) ---
  const initialTheme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  // --- DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(initialTheme);
    
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'light' ? 'dark' : 'light');
      });
    }

    initMobileNav();
    initHeaderScroll();
    initScrollAnimations();
    initMagneticButtons();
    initSubscriptionForm();
  });

})();
