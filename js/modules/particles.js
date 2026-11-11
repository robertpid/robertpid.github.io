/**
 * Sistema unificado de partículas interactivas para todos los banners y tarjetas
 * marcados con `[data-particles-container]`.
 *
 * Optimizaciones:
 * - Un único `requestAnimationFrame` global y un único `pointermove` en `window`.
 * - `IntersectionObserver` pausa automáticamente los banners fuera del viewport.
 * - Densidad adaptativa según el área del banner y soporte de `prefers-reduced-motion`.
 */
export function initParticles() {
  const containers = Array.from(document.querySelectorAll('[data-particles-container]'));
  if (!containers.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { clientX: -9999, clientY: -9999, active: false };
  const LINK_DISTANCE = 105;
  const CURSOR_RADIUS = 155;

  const instances = containers
    .map((container) => createBannerInstance(container))
    .filter(Boolean);

  if (!instances.length) return;

  function createBannerInstance(container) {
    let canvas = container.querySelector('canvas[data-particles-canvas]');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('data-particles-canvas', '');
      canvas.setAttribute('aria-hidden', 'true');
      canvas.className = 'absolute inset-0 w-full h-full pointer-events-none z-0';
      container.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const densityScale = Number(container.dataset.particlesDensity || '1');

    const instance = {
      container,
      canvas,
      ctx,
      width: 0,
      height: 0,
      rect: container.getBoundingClientRect(),
      particles: [],
      isVisible: false,
      densityScale
    };

    resizeInstance(instance);
    return instance;
  }

  function resizeInstance(inst) {
    const rect = inst.container.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    inst.rect = rect;
    inst.width = width;
    inst.height = height;
    inst.canvas.width = width * dpr;
    inst.canvas.height = height * dpr;
    inst.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.min(
      46,
      Math.max(10, Math.floor(((width * height) / 11500) * inst.densityScale))
    );

    if (inst.particles.length !== targetCount) {
      inst.particles = Array.from({ length: targetCount }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1.15 + (idx % 3) * 0.55,
        color: idx % 2 === 0 ? '0, 242, 254' : '79, 172, 254'
      }));
    } else {
      inst.particles.forEach((p) => {
        p.x = Math.min(width, Math.max(0, p.x));
        p.y = Math.min(height, Math.max(0, p.y));
      });
    }

    if (prefersReducedMotion) {
      drawInstance(inst, false);
    }
  }

  function drawInstance(inst, stepPhysics) {
    const { ctx, width, height, particles } = inst;
    ctx.clearRect(0, 0, width, height);

    const rect = inst.container.getBoundingClientRect();
    const localX = pointer.clientX - rect.left;
    const localY = pointer.clientY - rect.top;
    const cursorInside =
      pointer.active && localX >= -30 && localX <= width + 30 && localY >= -30 && localY <= height + 30;

    if (stepPhysics) {
      for (const p of particles) {
        if (cursorInside) {
          const dx = localX - p.x;
          const dy = localY - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 6 && dist < CURSOR_RADIUS) {
            const pull = (1 - dist / CURSOR_RADIUS) * 0.045;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          }
        }

        p.vx *= 0.975;
        p.vy *= 0.975;

        if (Math.hypot(p.vx, p.vy) < 0.11) {
          p.vx += (Math.random() - 0.5) * 0.035;
          p.vy += (Math.random() - 0.5) * 0.035;
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
          const alpha = (1 - dist / LINK_DISTANCE) * 0.2;
          ctx.strokeStyle = `rgba(79, 172, 254, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (cursorInside && stepPhysics) {
        const distCursor = Math.hypot(localX - a.x, localY - a.y);
        if (distCursor < CURSOR_RADIUS) {
          const alpha = (1 - distCursor / CURSOR_RADIUS) * 0.42;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(localX, localY);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(${a.color}, 0.72)`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (cursorInside && stepPhysics) {
      const glow = ctx.createRadialGradient(localX, localY, 0, localX, localY, 85);
      glow.addColorStop(0, 'rgba(0, 242, 254, 0.14)');
      glow.addColorStop(1, 'rgba(0, 242, 254, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(localX, localY, 85, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let rafId = null;

  const tick = () => {
    let anyVisible = false;
    for (const inst of instances) {
      if (!inst.isVisible) continue;
      anyVisible = true;
      drawInstance(inst, true);
    }
    if (anyVisible && !prefersReducedMotion) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  };

  const ensureRunning = () => {
    if (prefersReducedMotion) return;
    if (!rafId && instances.some((inst) => inst.isVisible)) {
      rafId = requestAnimationFrame(tick);
    }
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.active = true;
    },
    { passive: true }
  );

  window.addEventListener(
    'pointerleave',
    () => {
      pointer.active = false;
    },
    { passive: true }
  );

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const inst = instances.find((item) => item.container === entry.target);
        if (inst) resizeInstance(inst);
      }
    });
    instances.forEach((inst) => resizeObserver.observe(inst.container));
  } else {
    window.addEventListener(
      'resize',
      () => instances.forEach((inst) => resizeInstance(inst)),
      { passive: true }
    );
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const inst = instances.find((item) => item.container === entry.target);
          if (inst) {
            inst.isVisible = entry.isIntersecting;
          }
        }
        ensureRunning();
      },
      { threshold: 0.02 }
    );
    instances.forEach((inst) => io.observe(inst.container));
  } else {
    instances.forEach((inst) => {
      inst.isVisible = true;
    });
    ensureRunning();
  }
}

