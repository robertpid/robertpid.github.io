/**
 * Aplica un efecto spotlight radial suave sobre cada `.glass-card` siguiendo el puntero.
 * Se desactiva automáticamente si el usuario prefiere movimiento reducido o usa pantalla táctil.
 */
export function initSpotlight() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (prefersReducedMotion || !hasFinePointer) return;

  const cards = document.querySelectorAll('.glass-card');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
    });
  });
}

