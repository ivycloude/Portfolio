// Funktion zur Generierung von handgezeichneten Rahmen
function createHandDrawnBorder(wrapper) {
  const element = wrapper.querySelector('input, textarea');
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  
  // SVG erstellen
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  
  // Handgezeichneten Pfad generieren
  const path = createWigglyRectPath(width, height);
  
  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathElement.setAttribute('d', path);
  
  svg.appendChild(pathElement);
  wrapper.appendChild(svg);
}

// Generiert einen welligen, handgezeichneten Rechteck-Pfad
function createWigglyRectPath(w, h) {
  const padding = 2; // Abstand vom Rand
  const segmentLength = 15; // Segment alle ~15px für gleichmäßige Welligkeit
  
  // Berechne Anzahl der Segmente basierend auf der Seitenlänge
  const topBottomSegments = Math.max(Math.round(w / segmentLength), 5);
  const leftRightSegments = Math.max(Math.round(h / segmentLength), 5);
  
  // Zufallsfunktion für natürliche Variation
  function wiggle(base, intensity = 1.5) {
    return base + (Math.random() - 0.5) * intensity;
  }
  
  let path = '';
  
  // Oben (links nach rechts)
  path += `M ${wiggle(padding)} ${wiggle(padding)}`;
  for (let i = 1; i <= topBottomSegments; i++) {
    const x = (w - padding * 2) * (i / topBottomSegments) + padding;
    const y = padding;
    path += ` L ${wiggle(x)} ${wiggle(y)}`;
  }
  
  // Rechts (oben nach unten)
  for (let i = 1; i <= leftRightSegments; i++) {
    const x = w - padding;
    const y = (h - padding * 2) * (i / leftRightSegments) + padding;
    path += ` L ${wiggle(x)} ${wiggle(y)}`;
  }
  
  // Unten (rechts nach links)
  for (let i = 1; i <= topBottomSegments; i++) {
    const x = w - padding - (w - padding * 2) * (i / topBottomSegments);
    const y = h - padding;
    path += ` L ${wiggle(x)} ${wiggle(y)}`;
  }
  
  // Links (unten nach oben)
  for (let i = 1; i <= leftRightSegments; i++) {
    const x = padding;
    const y = h - padding - (h - padding * 2) * (i / leftRightSegments);
    path += ` L ${wiggle(x)} ${wiggle(y)}`;
  }
  
  path += ' Z'; // Schließt den Pfad
  
  return path;
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  const wrappers = document.querySelectorAll('.input-wrapper');
  
  wrappers.forEach(wrapper => {
    createHandDrawnBorder(wrapper);
  });
  
  // Rahmen bei Fenstergrößenänderung neu generieren
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      wrappers.forEach(wrapper => {
        const svg = wrapper.querySelector('svg');
        if (svg) svg.remove();
        createHandDrawnBorder(wrapper);
      });
    }, 250);
  });
});

// Formular-Submit-Handler
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // verhindert das tatsächliche Absenden

  // Hier könntest du später die E-Mail einbinden

  // Erfolgsmeldung anzeigen
  successMsg.style.display = "block";

  // Formular zurücksetzen
  form.reset();
});
