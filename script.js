// ===== Mobile menu =====
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuBtn || !mobileMenu) return;
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
})();

// ===== Highlights Carousel (Home) =====
(function initHomeCarousel() {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(document.querySelectorAll('#carouselDots .dot'));
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 3500;

  function show(index) {
    const next = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      if (i === next) {
        slide.classList.add('active');
        slide.classList.remove('is-leaving');
      } else if (slide.classList.contains('active')) {
        slide.classList.remove('active');
        slide.classList.add('is-leaving');
        setTimeout(() => slide.classList.remove('is-leaving'), 800);
      } else {
        slide.classList.remove('active', 'is-leaving');
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === next);
      dot.setAttribute('aria-current', i === next ? 'true' : 'false');
    });
    current = next;
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, INTERVAL);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  show(0);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(i);
      startAuto();
    });
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  let startX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
    stopAuto();
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - startX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) next(); else prev();
    }
    startAuto();
  }, { passive: true });

  startAuto();
})();

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ===== Contact form =====
(function () {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const privacy = document.getElementById('privacy').checked;

    if (!name || !email || !message || !privacy) {
      alert('Please fill in all fields and accept the privacy policy.');
      return;
    }

    contactForm.hidden = true;
    formSuccess.hidden = false;
    setTimeout(() => {
      contactForm.reset();
      contactForm.hidden = false;
      formSuccess.hidden = true;
    }, 4000);
  });
})();
