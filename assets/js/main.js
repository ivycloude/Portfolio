/* ========================================
   BURGER MENU FUNKTIONALITÄT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;
  
  // Burger Menu Toggle
  if (burgerMenu) {
    burgerMenu.addEventListener('click', function() {
      // Toggle Menü
      burgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.classList.toggle('menu-open');
      
      // Accessibility
      const isOpen = navLinks.classList.contains('active');
      burgerMenu.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
      burgerMenu.setAttribute('aria-expanded', isOpen);
    });
  }
  
  // Menü schließen beim Klick auf Link
  const navLinksAll = document.querySelectorAll('.nav-links a');
  navLinksAll.forEach(link => {
    link.addEventListener('click', function() {
      if (burgerMenu && navLinks.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        burgerMenu.setAttribute('aria-label', 'Menü öffnen');
        burgerMenu.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Menü schließen beim Klick außerhalb
  document.addEventListener('click', function(event) {
    if (burgerMenu && navLinks.classList.contains('active')) {
      // Prüfe ob Klick außerhalb von Menu und Burger
      if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target)) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        burgerMenu.setAttribute('aria-label', 'Menü öffnen');
        burgerMenu.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Menü schließen bei ESC-Taste
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
      burgerMenu.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
      burgerMenu.setAttribute('aria-label', 'Menü öffnen');
      burgerMenu.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ========================================
   PENCIL LINK UNDERLINES (Original Code)
   ======================================== */

document.querySelectorAll(".pencil-link").forEach(link => {
  // create SVG once
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.classList.add("pencil-underline");
  svg.setAttribute("height", "10");  // container height
  svg.style.overflow = "hidden";     // prevent any subpixel dots

  path.classList.add("pencil-path");

  svg.appendChild(path);
  link.appendChild(svg);

  link.addEventListener("mouseenter", () => {
    const width = link.offsetWidth;
    const inset = 2; // prevents start/end dot

    svg.setAttribute("width", width);
    svg.setAttribute("viewBox", `0 0 ${width} 10`);

    // generate hand-drawn path
    let d = `M ${inset} ${rand(4, 6)}`;
    const points = 8;

    for (let i = 1; i <= points; i++) {
      const x = inset + ((width - inset * 2) / points) * i;
      const y = rand(4, 6);
      d += ` L ${x} ${y}`;
    }

    path.setAttribute("d", d);

    const length = path.getTotalLength();

    // HARD RESET: no animation yet
    path.style.transition = "none";
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    path.getBoundingClientRect(); // force browser paint

    // animate stroke - use exact 0 to prevent end dot
    path.style.transition = "stroke-dashoffset 0.35s ease";
    path.style.strokeDashoffset = 0;
  });

  link.addEventListener("mouseleave", () => {
    const length = path.getTotalLength();
    path.style.transition = "stroke-dashoffset 0.2s ease";
    path.style.strokeDashoffset = length;
  });
});

// helper: random float
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ========================================
   H1 WAVY UNDERLINE (Original Code)
   ======================================== */

// Generiere wellige Underlines für alle h1 Überschriften
document.addEventListener('DOMContentLoaded', () => {
  // Nicht auf der Startseite oder Projektseiten anzeigen
  const isHomePage = window.location.pathname.includes('/Portfolio/index.html') || 
                     window.location.pathname === '/' || 
                     window.location.pathname === '/index.html';
  
  const isProjectPage = window.location.pathname.includes('/projects/') ||
                        window.location.pathname.includes('kunstportraits') ||
                        window.location.pathname.includes('project');
  
  if (isHomePage || isProjectPage) return;
  
  const headings = document.querySelectorAll('h1');
  
  headings.forEach(h1 => {
    // Erstelle SVG Container
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Warte bis h1 gerendert ist, um die Breite zu bekommen
    setTimeout(() => {
      const width = h1.offsetWidth;
      const height = 8;
      
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.style.position = 'absolute';
      svg.style.left = '0';
      svg.style.bottom = '0';
      svg.style.pointerEvents = 'none';
      
      // Generiere welligen Pfad
      const segmentLength = 12; // KLEINER = mehr Segmente = welliger (z.B. 8-15)
      const segments = Math.max(Math.round(width / segmentLength), 8);
      
      let d = `M ${rand(0, 2)} ${rand(2, 6)}`; // Start mit mehr Variation
      
      for (let i = 1; i <= segments; i++) {
        const x = (width / segments) * i;
        const y = rand(2, 6); // GRÖSSERER BEREICH = welliger (z.B. 2-6 statt 3-5)
        d += ` L ${rand(x - 1.5, x + 1.5)} ${y}`; // GRÖSSERE WERTE = horizontale Welligkeit (z.B. ±1.5 statt ±0.5)
      }
      
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      
      svg.appendChild(path);
      h1.appendChild(svg);
    }, 50);
  });
});