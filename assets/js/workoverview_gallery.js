// ========================================
// WORK GALLERY - OPTIMIERT
// ========================================

const projects = [
   { 
    title: "Filmriss", 
    url: "projects/filmriss.html", 
    img: "assets/img/Thumbnails/filmriss_thumb.png",
    width: 400,  // Tatsächliche Bild-Breite
    height: 300  // Tatsächliche Bild-Höhe
  },

  { 
    title: "Künstler:innenportraits", 
    url: "projects/kunstportraits.html", 
    img: "assets/img/Thumbnails/kunstportraits_thumb.png",
    width: 400,  // Tatsächliche Bild-Breite
    height: 300  // Tatsächliche Bild-Höhe
  },
  { 
    title: "Helle Nächte Dunkle Folgen", 
    url: "projects/helle-naechte.html", 
    img: "assets/img/Thumbnails/doku_thumb.png",
    width: 400,
    height: 300
  },
  { 
    title: "Social Media Projekte", 
    url: "projects/social-media.html", 
    img: "assets/img/Thumbnails/reels_thumb.png",
    width: 400,
    height: 300
  },
  { 
    title: "Gestaltete Sehnsucht", 
    url: "projects/gestaltete-sehnsucht.html", 
    img: "assets/img/Thumbnails/sehnsucht_thumb.png",
    width: 400,
    height: 300
  },
  { 
    title: "Changing Beauty", 
    url: "projects/changing-beauty.html", 
    img: "assets/img/Thumbnails/beauty_thumb.png",
    width: 400,
    height: 300
  },
  { 
    title: "Animationen", 
    url: "projects/animation.html", 
    img: "assets/img/Thumbnails/animation_thumb.png",
    width: 400,
    height: 300
  },
];

const gallery = document.querySelector('.project-gallery');

// Karten einfügen - OPTIMIERT!
projects.forEach((p, index) => {
  gallery.innerHTML += `
    <a href="${p.url}" class="project-card">
      <img src="${p.img}" 
           alt="${p.title}" 
           loading="${index < 3 ? 'eager' : 'lazy'}"
           width="${p.width}" 
           height="${p.height}">
      <h3>${p.title}</h3>
    </a>`;
});

// Zufällige Drehung für jede Karte
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  const rotation = (Math.random() * 6 - 5).toFixed(2); // -5° bis +5°
  card.dataset.rotation = rotation;
  
  // Anfangsrotation
  card.style.transform = `rotate(${rotation}deg)`;
  
  // Hover hebt Karte
  card.addEventListener('mouseover', () => {
    card.style.transform = `rotate(0deg) translateY(-10px)`;
  });
  
  // Nach Hover alte Rotation wiederherstellen
  card.addEventListener('mouseout', () => {
    card.style.transform = `rotate(${card.dataset.rotation}deg)`;
  });
});