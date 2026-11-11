/**
 * Observa los elementos `.reveal-on-scroll` con IntersectionObserver para aplicar
 * un fade-up suave, e incluye el fallback JS de la barra de progreso superior
 * en navegadores sin `animation-timeline: scroll()`.
 */
export function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = Array.from(document.querySelectorAll('.reveal-on-scroll'));

  if (!revealElements.length) {
    initScrollProgressFallback(prefersReducedMotion);
    return;
  }

  // Escalonamiento automático entre tarjetas hermanas dentro de una grilla
  const siblingCounters = new WeakMap();
  revealElements.forEach((el) => {
    const parent = el.parentElement;
    if (parent && parent.classList.contains('grid')) {
      const order = siblingCounters.get(parent) || 0;
      siblingCounters.set(parent, order + 1);
      el.style.setProperty('--reveal-delay', `${(order % 4) * 90}ms`);
    }
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -45px 0px' }
    );

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('is-visible');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  initScrollProgressFallback(prefersReducedMotion);
}

function initScrollProgressFallback(prefersReducedMotion) {
  if (prefersReducedMotion) return;
  const supportsTimeline =
    typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'scroll()');
  if (supportsTimeline) return;

  const progressEl = document.getElementById('scroll-progress');
  if (!progressEl) return;

  let ticking = false;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressEl.style.transform = `scaleX(${ratio.toFixed(4)})`;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );
  update();
}
