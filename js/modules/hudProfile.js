/**
 * Alterna la vista del retrato en el Hero entre fotografía profesional y la
 * credencial interactiva Pixel ID (con cambio de especialidad Data / ERP / IA).
 */
const PIXEL_PROFILES = {
  data: {
    subtitle: 'Data Engineer · Medallón & Lakehouse',
    primaryLabel: 'PySpark & Databricks',
    secondaryLabel: 'Azure SQL & Polars',
    badge: 'PIPELINE_READY'
  },
  erp: {
    subtitle: 'Full-Stack · ERP B2B & APIs N-Tier',
    primaryLabel: 'FastAPI + PostgreSQL',
    secondaryLabel: 'RBAC & Docker CI/CD',
    badge: 'SYSTEM_ONLINE'
  },
  ia: {
    subtitle: 'IA Aplicada · Agentes & Motores 3D',
    primaryLabel: 'Multi-Agentes & LLM',
    secondaryLabel: 'ESP32 IoT & Godot 3D',
    badge: 'NEURAL_ACTIVE'
  }
};

export function initHudProfile() {
  const buttons = document.querySelectorAll('[data-hero-mode-btn]');
  const photoStage = document.getElementById('hero-photo-stage');
  const pixelStage = document.getElementById('hero-pixel-stage');

  if (!buttons.length || !photoStage || !pixelStage) return;

  const setMode = (mode) => {
    const isPixel = mode === 'pixel';
    photoStage.hidden = isPixel;
    pixelStage.hidden = !isPixel;

    buttons.forEach((btn) => {
      const active = btn.dataset.heroModeBtn === mode;
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('bg-[#00f2fe]/20', active);
      btn.classList.toggle('text-[#00f2fe]', active);
      btn.classList.toggle('border-[#00f2fe]/50', active);
      btn.classList.toggle('bg-white/5', !active);
      btn.classList.toggle('text-slate-300', !active);
      btn.classList.toggle('border-white/10', !active);
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.heroModeBtn || 'photo');
    });
  });

  // Selector interactivo de especialidad dentro de Pixel ID
  const specButtons = pixelStage.querySelectorAll('[data-pixel-spec]');
  const subtitleEl = document.getElementById('pixel-spec-subtitle');
  const metricOneEl = document.getElementById('pixel-metric-primary');
  const metricTwoEl = document.getElementById('pixel-metric-secondary');
  const signatureEl = document.getElementById('pixel-signature-code');

  const setSpecialty = (specKey) => {
    const profile = PIXEL_PROFILES[specKey] || PIXEL_PROFILES.data;
    if (subtitleEl) subtitleEl.textContent = profile.subtitle;
    if (metricOneEl) metricOneEl.textContent = profile.primaryLabel;
    if (metricTwoEl) metricTwoEl.textContent = profile.secondaryLabel;
    if (signatureEl) signatureEl.textContent = `TREBOR // ${profile.badge}`;

    specButtons.forEach((btn) => {
      const active = btn.dataset.pixelSpec === specKey;
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('bg-[#ff2e4c]/20', active);
      btn.classList.toggle('border-[#ff2e4c]/60', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('bg-white/5', !active);
      btn.classList.toggle('border-white/10', !active);
      btn.classList.toggle('text-slate-400', !active);
    });
  };

  specButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setSpecialty(btn.dataset.pixelSpec || 'data');
    });
  });
}
