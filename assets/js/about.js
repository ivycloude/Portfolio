const polaroids = document.querySelectorAll('.random-rotate');

polaroids.forEach(el => {
  const rotation = (Math.random() * 6 - 3).toFixed(2); // -3° to +3°
  el.style.transform = `rotate(${rotation}deg)`;
});
