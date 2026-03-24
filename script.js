const slider = document.getElementById('testimoniosCarousel');
const track = slider.querySelector('.carousel-track');
let isDown = false, startX, scrollLeft;

// Copiar ancho total de los elementos duplicados para reiniciar loop
const totalWidth = track.scrollWidth / 2;

function moveLoop() {
  if(!isDown){
    track.scrollLeft += 1; // velocidad automática
    if(track.scrollLeft >= totalWidth){
      track.scrollLeft = 0;
    }
  }
  requestAnimationFrame(moveLoop);
}
moveLoop();

// Drag con mouse
slider.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = track.scrollLeft;
});
slider.addEventListener('mouseup', () => isDown = false);
slider.addEventListener('mouseleave', () => isDown = false);
slider.addEventListener('mousemove', e => {
  if(!isDown) return;
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  track.scrollLeft = scrollLeft - walk;
});

// Drag con touch
slider.addEventListener('touchstart', e => {
  isDown = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = track.scrollLeft;
});
slider.addEventListener('touchend', () => isDown = false);
slider.addEventListener('touchmove', e => {
  if(!isDown) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  track.scrollLeft = scrollLeft - (x - startX) * 1.5;
});