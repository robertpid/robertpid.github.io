import { CASE_STUDIES } from '../data/projects.js';

/**
 * Controla el modal nativo `<dialog>` con la arquitectura y README de cada proyecto.
 */
export function initProjectModal() {
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTag = document.getElementById('modal-project-tag');
  const modalTitle = document.getElementById('modal-project-title');
  const modalSummary = document.getElementById('modal-project-summary');
  const modalArch = document.getElementById('modal-project-arch');
  const modalHighlights = document.getElementById('modal-project-highlights');
  const modalGithubLink = document.getElementById('modal-github-link');

  if (!projectModal) return;

  document.querySelectorAll('.project-open-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const study = CASE_STUDIES[projectId];
      if (!study) return;

      modalTag.textContent = study.tag;
      modalTitle.textContent = study.title;
      modalSummary.textContent = study.summary;
      modalArch.textContent = study.arch;
      modalGithubLink.setAttribute('href', study.repoUrl);

      modalHighlights.replaceChildren();
      study.highlights.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        modalHighlights.appendChild(li);
      });

      projectModal.showModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => projectModal.close());
  }

  // Respaldo de light-dismiss para navegadores sin soporte de closedby="any"
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      projectModal.close();
    }
  });
}

