// ========================================
// WORK GALLERY - OPTIMIERT
// ========================================

const projects = [
  { 
    title: "Frauen* im Film", 
    subtitle: "Dokumentation",
    url: "projects/frauen.html", 
    img: "assets/img/Thumbnails/frauen_thumb.jpg",
    width: 400,  // Tatsächliche Bild-Breite
    height: 300  // Tatsächliche Bild-Höhe
  },

   { 
    title: "Filmriss",
    subtitle: "Mixed Media Projekt",
    url: "projects/filmriss.html", 
    img: "assets/img/Thumbnails/filmriss_thumb.jpg",
    width: 400,  // Tatsächliche Bild-Breite
    height: 300  // Tatsächliche Bild-Höhe
  },

  { 
    title: "Künstler:innenportraits",
    subtitle: "filmische Portraits",
    url: "projects/kunstportraits.html", 
    img: "assets/img/Thumbnails/kunstportraits_thumb.jpg",
    width: 400,  // Tatsächliche Bild-Breite
    height: 300  // Tatsächliche Bild-Höhe
  },
  { 
    title: "Helle Nächte Dunkle Folgen", 
    subtitle: "Dokumentation",
    url: "projects/helle-naechte.html", 
    img: "assets/img/Thumbnails/doku_thumb.jpg",
    width: 400,
    height: 300
  },
  { 
    title: "Social Media Projekte",
    subtitle: "diverse Arbeiten",
    url: "projects/social-media.html", 
    img: "assets/img/Thumbnails/reels_thumb.jpg",
    width: 400,
    height: 300
  },
  { 
    title: "Gestaltete Sehnsucht",
    subtitle: "Research Video",
    url: "projects/gestaltete-sehnsucht.html", 
    img: "assets/img/Thumbnails/sehnsucht_thumb.jpg",
    width: 400,
    height: 300
  },
  { 
    title: "Changing Beauty",
    subtitle: "Kunstprojekt",
    url: "projects/changing-beauty.html", 
    img: "assets/img/Thumbnails/beauty_thumb.jpg",
    width: 400,
    height: 300
  },
  { 
    title: "Animationen",
    subtitle: "2D und 3D",
    url: "projects/animation.html", 
    img: "assets/img/Thumbnails/animation_thumb.jpg",
    width: 400,
    height: 300
  },
];

const gallery = document.querySelector('.project-gallery');

// Karten einfügen - OPTIMIERT!
projects.forEach((p, index) => {
  gallery.innerHTML += `
    <a href="${p.url}" class="project-card">
      <div class="project-card-image">
        <img src="${p.img}"
             alt="${p.title}"
             loading="${index < 3 ? 'eager' : 'lazy'}"
             width="${p.width}"
             height="${p.height}">

        <div class="project-card-overlay">
          <p>${p.subtitle || ""}</p>
        </div>
      </div>

      <h3>${p.title}</h3>
    </a>`;
});

// Zufällige Drehung für jede Karte
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  const rotation = (Math.random() * 14 - 7).toFixed(2); // -7° bis +7°
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