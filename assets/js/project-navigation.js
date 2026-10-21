// Projekt-Navigation
// Definiere alle Projekte in der gewünschten Reihenfolge
const projects = [
  { id: 'filmriss', file: 'filmriss.html', title: 'Filmriss' },
  { id: 'kunstportraits', file: 'kunstportraits.html', title: 'Künstler:innenportraits' },
  { id: 'helle-naechte', file: 'helle-naechte.html', title: 'Helle Nächte Dunkle Folgen' },
  { id: 'social-media', file: 'social-media.html', title: 'Social Media' },
  { id: 'gestaltete-sehnsucht', file: 'gestaltete-sehnsucht.html', title: 'Gestaltete Sehnsucht' },
  { id: 'changing-beauty', file: 'changing-beauty.html', title: 'Changing Beauty' },
   { id: 'animation', file: 'animation.html', title: 'Animation' },
  // Füge hier weitere Projekte hinzu
];

// Finde das aktuelle Projekt basierend auf dem Dateinamen
function getCurrentProjectIndex() {
  const currentFile = window.location.pathname.split('/').pop();
  return projects.findIndex(p => p.file === currentFile);
}

// Initialisiere Navigation
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.project-nav-prev');
  const nextBtn = document.querySelector('.project-nav-next');
  const backBtn = document.querySelector('.project-nav-back');
  
  const currentIndex = getCurrentProjectIndex();
  
  if (currentIndex === -1) {
    // Projekt nicht in Liste gefunden
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }
  
  // Vorheriges Projekt
  if (prevBtn) {
    if (currentIndex === 0) {
      prevBtn.style.opacity = '0.3';
      prevBtn.style.cursor = 'not-allowed';
    } else {
      prevBtn.addEventListener('click', () => {
        window.location.href = projects[currentIndex - 1].file;
      });
    }
  }
  
  // Nächstes Projekt
  if (nextBtn) {
    if (currentIndex === projects.length - 1) {
      nextBtn.style.opacity = '0.3';
      nextBtn.style.cursor = 'not-allowed';
    } else {
      nextBtn.addEventListener('click', () => {
        window.location.href = projects[currentIndex + 1].file;
      });
    }
  }
  
  // Zurück zur Übersicht
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = '../work.html';
    });
  }
  
  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      window.location.href = projects[currentIndex - 1].file;
    } else if (e.key === 'ArrowRight' && currentIndex < projects.length - 1) {
      window.location.href = projects[currentIndex + 1].file;
    } else if (e.key === 'Escape') {
      window.location.href = '../work.html';
    }
  });
});