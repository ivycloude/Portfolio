const words = ["film", "postproduction", "directing", "acting", "conceptualization","storytelling"]; // Wörter, die getippt werden
let i = 0; // Wort-Index
let j = 0; // Buchstaben-Index
let currentWord = "";
let isDeleting = false;
const speed = 150; // Tippgeschwindigkeit in ms
const target = document.getElementById("typewriter");

function type() {
  const word = words[i];
  
  if (isDeleting) {
    currentWord = word.substring(0, j--);
  } else {
    currentWord = word.substring(0, j++);
  }

  target.textContent = currentWord;

  if (!isDeleting && j === word.length + 1) {
    // Wort vollständig getippt → kurze Pause, dann löschen
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j === -1) {
    // Wort gelöscht → nächstes Wort
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, speed);
  }
}

// Animation starten
type();
