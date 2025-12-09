// Hamburger meni
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navMobile.classList.toggle('is-open');
  });

  // Zatvori meni kada klikneš link
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      navMobile.classList.remove('is-open');
    });
  });
}

// FAQ akordeon (radi samo na faq.html gde postoji .faq-list)
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  if (!question) return;

  question.addEventListener('click', () => {
    const open = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
    if (!open) item.classList.add('is-open');
  });
});
document.addEventListener("DOMContentLoaded", () => {

  const imageLinks = Array.from(document.querySelectorAll(".gallery-link"));
  const videoLinks = Array.from(document.querySelectorAll(".gallery-video"));

  // Kombinujemo sve u jednu listu elemenata
  const allItems = [...imageLinks, ...videoLinks];

  if (allItems.length === 0) return;

  let currentIndex = 0;

  // Lightbox elementi
  const overlay = document.createElement("div");
  overlay.classList.add("lightbox-overlay");

  const img = document.createElement("img");
  img.classList.add("lightbox-image");

  const video = document.createElement("video");
  video.classList.add("lightbox-video");
  video.controls = true;

  const btnPrev = document.createElement("div");
  btnPrev.classList.add("lightbox-arrow", "lightbox-prev");
  btnPrev.textContent = "❮";

  const btnNext = document.createElement("div");
  btnNext.classList.add("lightbox-arrow", "lightbox-next");
  btnNext.textContent = "❯";

  overlay.appendChild(img);
  overlay.appendChild(video);
  overlay.appendChild(btnPrev);
  overlay.appendChild(btnNext);
  document.body.appendChild(overlay);

  function openLightbox(index) {
    currentIndex = index;

    const el = allItems[currentIndex];

    img.classList.remove("is-loaded");
    video.classList.remove("is-visible");

    overlay.classList.add("is-visible");

    const src = el.href;

    // Da li je video ili slika?
    if (src.endsWith(".mp4")) {
      // VIDEO prikaz
      img.style.display = "none";
      video.style.display = "block";
      video.src = src;
      video.classList.add("is-visible");
      video.play();
    } else {
      // SLIKA prikaz
      video.pause();
      video.style.display = "none";
      img.style.display = "block";

      const temp = new Image();
      temp.onload = () => {
        img.src = src;
        img.classList.add("is-loaded");
      };
      temp.src = src;
    }
  }

  function closeLightbox() {
    overlay.classList.remove("is-visible");
    video.pause();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % allItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    openLightbox(currentIndex);
  }

  allItems.forEach((el, index) => {
    el.addEventListener("click", e => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeLightbox();
  });

  btnPrev.addEventListener("click", e => {
    e.stopPropagation();
    showPrev();
  });

  btnNext.addEventListener("click", e => {
    e.stopPropagation();
    showNext();
  });

  // ESC zatvaranje
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // SWIPE
  let startX = 0;

  overlay.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  overlay.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) showNext();
      else showPrev();
    }
  });

});
