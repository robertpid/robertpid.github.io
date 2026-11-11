/**
 * Constelación interactiva de partículas en `#bg-particles` ubicada por debajo
 * de todos los banners y tarjetas del portafolio.
 *
 * Respeta `prefers-reduced-motion: reduce`, pausa cuando la pestaña no está
 * visible y usa la paleta tricolor (cian #00f2fe, azul #4facfe y signal #ff2e4c).
 */
export function initParticles() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: -9999, y: -9999, active: false };
  const LINK_DISTANCE = 135;
  const CURSOR_RADIUS = 190;
  const PALETTE = ['0, 242, 254', '79, 172, 254', '0, 242, 254', '255, 46, 76'];

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = 0;

  function resizeCanvas() {
    width = Math.max(1, window.innerWidth);
    height = Math.max(1, window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.min(92, Math.max(40, Math.floor((width * height) / 17000)));

    if (particles.length !== targetCount) {
      particles = Array.from({ length: targetCount }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 1.35 + (idx % 3) * 0.65,
        color: PALETTE[idx % PALETTE.length]
      }));
    } else {
      particles.forEach((p) => {
        p.x = Math.min(width, Math.max(0, p.x));
        p.y = Math.min(height, Math.max(0, p.y));
      });
    }

    if (prefersReducedMotion) {
      renderFrame(false);
    }
  }

  function renderFrame(stepPhysics) {
    ctx.clearRect(0, 0, width, height);

    if (stepPhysics) {
      for (const p of particles) {
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 8 && dist < CURSOR_RADIUS) {
            const pull = (1 - dist / CURSOR_RADIUS) * 0.042;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          }
        }

        p.vx *= 0.978;
        p.vy *= 0.978;

        if (Math.hypot(p.vx, p.vy) < 0.1) {
          p.vx += (Math.random() - 0.5) * 0.03;
          p.vy += (Math.random() - 0.5) * 0.03;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.min(width, Math.max(0, p.x));
        p.y = Math.min(height, Math.max(0, p.y));
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINK_DISTANCE) {
          const alpha = (1 - dist / LINK_DISTANCE) * 0.3;
          const isSignalLink = a.color === '255, 46, 76' || b.color === '255, 46, 76';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = isSignalLink
            ? `rgba(255, 46, 76, ${alpha * 0.78})`
            : `rgba(79, 172, 254, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      if (pointer.active) {
        const distCursor = Math.hypot(pointer.x - a.x, pointer.y - a.y);
        if (distCursor < CURSOR_RADIUS) {
          const alpha = (1 - distCursor / CURSOR_RADIUS) * 0.55;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = `rgba(${a.color}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${a.color}, 0.88)`;
      ctx.fill();
    }
  }

  function animate() {
    renderFrame(true);
    rafId = window.requestAnimationFrame(animate);
  }

  window.addEventListener(
    'pointermove',
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    },
    { passive: true }
  );

  window.addEventListener('pointerleave', () => {
    pointer.active = false;
  });

  window.addEventListener('resize', resizeCanvas, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (prefersReducedMotion) return;
    if (document.hidden && rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!document.hidden && !rafId) {
      rafId = window.requestAnimationFrame(animate);
    }
  });

  resizeCanvas();
  if (!prefersReducedMotion) {
    rafId = window.requestAnimationFrame(animate);
  }
}
