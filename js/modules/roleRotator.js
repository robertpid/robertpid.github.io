/**
 * Rota suavemente las líneas de especialidad técnica en la consola del Hero
 * cuando el usuario no tiene activado `prefers-reduced-motion: reduce`.
 */
export function initRoleRotator() {
  const roleEl = document.getElementById('dynamic-role-line');
  if (!roleEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const lines = [
    'Arquitecturas Medallón · Databricks & PySpark',
    'Sistemas ERP N-Tier · FastAPI, RBAC & PostgreSQL',
    'Agentes Multi-IA · Telemetría ESP32 & Shaders 3D',
    'Ingeniería End-to-End · Visión B2B & Liderazgo'
  ];

  let index = 0;
  roleEl.style.transition = 'opacity 0.28s ease';

  setInterval(() => {
    roleEl.style.opacity = '0';
    setTimeout(() => {
      index = (index + 1) % lines.length;
      roleEl.textContent = lines[index];
      roleEl.style.opacity = '1';
    }, 280);
  }, 3600);
}

