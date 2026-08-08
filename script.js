/*
Youtube Video Urls
https://www.youtube.com/shorts/6aaRum1JWQQ
https://www.youtube.com/shorts/Sg5FqbvkzM4
https://www.youtube.com/shorts/trs8iDLlP7E
https://www.youtube.com/shorts/tP_JKrj-VXY
https://www.youtube.com/shorts/nY2Qzy3n664
https://www.youtube.com/shorts/UZzFa4X5Y9M
*/

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     Showreel cards
     Replace VIDEO_ID with real YouTube Shorts IDs and update titles/categories.
     ========================================================================== */
  var VIDEOS = [
    { id: '6aaRum1JWQQ', title: 'Cinematic Recap', cat: 'After Effects' },
    { id: 'Sg5FqbvkzM4', title: 'Trailer Style Cut', cat: 'Trailer Edit' },
    { id: 'trs8iDLlP7E', title: 'Moment Transitions', cat: 'Smooth Transitions' },
    { id: 'tP_JKrj-VXY', title: 'Color Grade Reel', cat: 'Color Grading' },
    { id: 'nY2Qzy3n664', title: 'Fan Edit — Series', cat: 'Fan Edit' },
    { id: 'UZzFa4X5Y9M', title: 'Title Sequence', cat: 'Motion Graphics' },
  ];

  function buildShowreel() {
    var grid = document.querySelector('.showreel-grid');
    if (!grid) return;

    var frag = document.createDocumentFragment();

    VIDEOS.forEach(function (video, i) {
      var card = document.createElement('article');
      card.className = 'project-card animate-fade-up';
      card.style.animationDelay = (i % 4) * 0.1 + 's';

      var thumb = document.createElement('div');
      thumb.className = 'project-thumb';
      thumb.setAttribute('role', 'button');
      thumb.setAttribute('tabindex', '0');
      thumb.setAttribute('aria-label', 'Play ' + video.title);

      var img = document.createElement('img');
      img.src = 'https://img.youtube.com/vi/' + video.id + '/0.jpg';
      img.alt = video.title;
      img.loading = 'lazy';

      var overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      overlay.innerHTML =
        '<span class="play-btn">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
        '</span>';

      thumb.appendChild(img);
      thumb.appendChild(overlay);

      var meta = document.createElement('div');
      meta.className = 'project-meta';
      meta.innerHTML = '<div class="project-title"></div><div class="project-cat"></div>';
      meta.querySelector('.project-title').textContent = video.title;
      meta.querySelector('.project-cat').textContent = video.cat;

      card.appendChild(thumb);
      card.appendChild(meta);

      card.addEventListener('click', function () { openLightbox(video.id); });
      thumb.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(video.id);
        }
      });

      frag.appendChild(card);
    });

    grid.appendChild(frag);

    grid.querySelectorAll('.project-card').forEach(function (el) {
      if (observer) observer.observe(el);
    });
  }

  /* ==========================================================================
     Lightbox
     ========================================================================== */
  var lightbox = document.getElementById('lightbox');
  var lightboxVideo = document.getElementById('lightboxVideo');

  function openLightbox(videoId) {
    var frame = document.createElement('iframe');
    frame.id = 'lightboxFrame';
    frame.title = 'Video player';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.setAttribute('allowfullscreen', '');
    frame.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1';
    lightboxVideo.innerHTML = '';
    lightboxVideo.appendChild(frame);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock-scroll');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxVideo.innerHTML = '';
    document.body.classList.remove('lock-scroll');
  }

  lightbox.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMenu();
    }
  });

  /* ==========================================================================
     Navigation + mobile menu
     ========================================================================== */
  var nav = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  var menuClose = document.getElementById('menuClose');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  }

  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('lock-scroll');
  }

  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock-scroll');
  }

  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ==========================================================================
     Scroll reveal
     ========================================================================== */
  var revealEls = document.querySelectorAll('.animate-fade-up');

  function reveal(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }

  var observer = new IntersectionObserver(reveal, { threshold: 0.15 });
  revealEls.forEach(function (el) { observer.observe(el); });

  /* ==========================================================================
     FAQ accordion
     ========================================================================== */
  var accItems = document.querySelectorAll('.acc-item');

  accItems.forEach(function (item) {
    var q = item.querySelector('.acc-q');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      accItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.acc-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     Init
     ========================================================================== */
  buildShowreel();

  if (reduceMotion) {
    document.querySelectorAll('.animate-fade-up').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  document.querySelectorAll('.animate-fade-up').forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) observer.observe(el);
  });
})();
