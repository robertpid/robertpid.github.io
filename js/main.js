import { initNavigation } from './modules/navigation.js';
import { initScrollReveal } from './modules/animations.js';
import { initStackFilter } from './modules/stackFilter.js';
import { initProjectModal } from './modules/projectModal.js';
import { initUtilities } from './modules/contact.js';
import { initSpotlight } from './modules/spotlight.js';
import { initRoleRotator } from './modules/roleRotator.js';
import { initParticles } from './modules/particles.js';

/**
 * Punto de entrada principal del portafolio (ES Modules nativos).
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initStackFilter();
  initProjectModal();
  initUtilities();
  initSpotlight();
  initRoleRotator();
  initParticles();
});
