/**
 * Utilidades de UI: año dinámico, fallback del retrato Hero y copia rápida de correo.
 */
export function initUtilities() {
  initCurrentYear();
  initHeroPortraitFallback();
  initEmailCopy();
}

function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function initHeroPortraitFallback() {
  const heroImg = document.getElementById('hero-portrait');
  const heroFallback = document.getElementById('hero-portrait-fallback');
  if (!heroImg || !heroFallback) return;

  const showFallback = () => {
    heroImg.classList.add('hidden');
    heroFallback.classList.remove('hidden');
  };

  heroImg.addEventListener('error', showFallback, { once: true });
  if (heroImg.complete && heroImg.naturalWidth === 0) {
    showFallback();
  }
}

function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyLabel = document.getElementById('copy-email-label');
  const copyStatus = document.getElementById('copy-status');
  if (!copyBtn || !copyLabel) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'robertpid2@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      copyLabel.textContent = '¡Correo copiado!';
      if (copyStatus) {
        copyStatus.textContent = 'Correo robertpid2@gmail.com copiado al portapapeles.';
      }
    } catch {
      copyLabel.textContent = email;
    }

    setTimeout(() => {
      copyLabel.textContent = 'Copiar correo';
    }, 2500);
  });
}

