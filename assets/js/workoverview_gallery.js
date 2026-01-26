const projects = [
  { title: "Künstler:innenportraits", url: "projects/kunstportraits.html", img: "assets/img/Thumbnails/kunstportraits_thumb.png" },
  { title: "Helle Nächte Dunkle Folgen", url: "projects/helle-naechte.html", img: "assets/img/Thumbnails/doku_thumb.png" },
  { title: "Social Media Projekte", url: "projects/social-media.html", img: "assets/img/Thumbnails/reels_thumb.png" },
  { title: "Gestaltete Sehnsucht", url: "projects/gestaltete-sehnsucht.html", img: "assets/img/Thumbnails/sehnsucht_thumb.png" },
  { title: "Changing Beauty", url: "projects/changing-beauty.html", img: "assets/img/Thumbnails/beauty_thumb.png" },
  { title: "Animationen", url: "projects/animation.html", img: "assets/img/Thumbnails/animation_thumb.png" },
];

const gallery = document.querySelector('.project-gallery');

// ✔ Karten einfügen
projects.forEach(p => {
  gallery.innerHTML += `
    <a href="${p.url}" class="project-card">
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
    </a>`;
});

// ✔ Zufällige Drehung für jede Karte
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
