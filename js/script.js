document.addEventListener('DOMContentLoaded', () => {
  // === كود الـ fade ===
  const fadeElements = document.querySelectorAll('.fade');
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observerInstance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeElements.forEach(el => observer.observe(el));

  // === Smooth scroll ===
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetID = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetID);
      if (target) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        if (history.pushState) {
          history.pushState(null, null, '#' + targetID);
        } else {
          window.location.hash = targetID;
        }
      }
    });
  });
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    const target = document.getElementById(hash);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  });

  // === كود السلايدر للهيدر ===
  const slides = document.querySelectorAll('header .slide');
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  if (slides.length > 1) {
    setInterval(nextSlide, 5000); // تغيير الصورة كل 5 ثواني
  }
});
