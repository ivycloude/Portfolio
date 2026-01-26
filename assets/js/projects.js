// Zufällige Positionierung der Polaroids
const polaroids = document.querySelectorAll('.polaroid');
const gallery = document.querySelector('.polaroid-gallery');

if (polaroids.length && gallery) {
  // Berechne verfügbaren Raum
  const galleryWidth = gallery.offsetWidth;
  const galleryHeight = gallery.offsetHeight || 450;
  const polaroidWidth = 250;
  const polaroidHeight = 312.5; // 250 * 5/4
  
  // Funktion um Überlappung zu prüfen
  function hasOverlap(pos, existingPositions, minDistanceX = 180, minDistanceY = 80) {
    return existingPositions.some(existing => {
      const dx = Math.abs(pos.x - existing.x);
      const dy = Math.abs(pos.y - existing.y);
      return dx < minDistanceX && dy < minDistanceY;
    });
  }
  
  // Generiere Positionen: horizontal verteilt, vertikal ähnlich
  const positions = [];
  const centerY = galleryHeight / 2 - polaroidHeight / 2;
  const verticalVariation = 60; // Wie viel Variation in der Höhe erlaubt ist
  
  polaroids.forEach((polaroid, index) => {
    let attempts = 0;
    let pos;
    
    // Versuche eine Position zu finden die nicht zu sehr überlappt
    do {
      // Horizontal: zufällig über die gesamte Breite verteilen
      const xPos = Math.random() * (galleryWidth - polaroidWidth);
      
      // Vertikal: um die Mitte herum mit kleiner Variation
      const yVariation = (Math.random() - 0.5) * verticalVariation * 2;
      const yPos = centerY + yVariation;
      
      pos = {
        x: xPos,
        y: Math.max(0, Math.min(yPos, galleryHeight - polaroidHeight))
      };
      
      attempts++;
      
      // Nach vielen Versuchen: erlaube mehr Überlappung horizontal
      if (attempts > 30) {
        break;
      }
    } while (hasOverlap(pos, positions, attempts > 15 ? 150 : 180, 80));
    
    positions.push(pos);
    
    // Zufällige Rotation zwischen -10 und +10 Grad
    const rotation = (Math.random() * 20 - 10).toFixed(1);
    
    // Positioniere Polaroid
    polaroid.style.left = `${pos.x}px`;
    polaroid.style.top = `${pos.y}px`;
    polaroid.style.setProperty('--rotation', `${rotation}deg`);
    polaroid.style.zIndex = index + 10; // Basis z-index damit sie nicht überlappen
    polaroid.dataset.rotation = rotation;
  });
}

// Overlay-Funktionalität
const overlay = document.querySelector('.gallery-overlay');
const overlayImg = document.querySelector('.overlay-image');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (polaroids.length && overlay && overlayImg) {
  // Hole die Vollbild-Versionen (data-fullsize) oder fallback auf src
  const images = [...polaroids].map(p => {
    const img = p.querySelector('img');
    return img.dataset.fullsize || img.src;
  });

  let currentIndex = 0;

  polaroids.forEach((p, index) => {
    p.addEventListener('click', () => {
      currentIndex = index;
      overlayImg.src = images[currentIndex];
      overlay.classList.add('active');
    });
  });

  closeBtn?.addEventListener('click', e => {
    e.stopPropagation();
    overlay.classList.remove('active');
  });

  nextBtn?.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    overlayImg.src = images[currentIndex];
  });

  prevBtn?.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex =
      (currentIndex - 1 + images.length) % images.length;
    overlayImg.src = images[currentIndex];
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      overlay.classList.remove('active');
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      overlayImg.src = images[currentIndex];
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      overlayImg.src = images[currentIndex];
    }
  });
}

// Neupositionierung bei Fenstergrößenänderung
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    location.reload(); // Einfachste Lösung für Responsive
  }, 500);
});