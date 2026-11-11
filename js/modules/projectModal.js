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
  const modalGallery = document.getElementById('modal-gallery');
  const modalGalleryImage = document.getElementById('modal-gallery-image');
  const modalGalleryCaption = document.getElementById('modal-gallery-caption');
  const modalGalleryTabs = document.getElementById('modal-gallery-tabs');

  if (!projectModal) return;

  const renderGallery = (screenshots, projectTitle) => {
    if (!modalGallery || !modalGalleryImage || !modalGalleryTabs) return;

    if (!Array.isArray(screenshots) || !screenshots.length) {
      modalGallery.hidden = true;
      modalGalleryTabs.replaceChildren();
      return;
    }

    const selectSlide = (index) => {
      const slide = screenshots[index];
      if (!slide) return;

      modalGalleryImage.src = slide.src;
      modalGalleryImage.alt = `${projectTitle} — ${slide.label}`;
      if (modalGalleryCaption) {
        modalGalleryCaption.textContent = slide.caption || slide.label;
      }

      Array.from(modalGalleryTabs.children).forEach((tabBtn, tabIdx) => {
        const active = tabIdx === index;
        tabBtn.setAttribute('aria-pressed', String(active));
        tabBtn.classList.toggle('bg-[#00f2fe]/15', active);
        tabBtn.classList.toggle('border-[#00f2fe]/60', active);
        tabBtn.classList.toggle('text-[#00f2fe]', active);
        tabBtn.classList.toggle('bg-white/5', !active);
        tabBtn.classList.toggle('border-white/10', !active);
        tabBtn.classList.toggle('text-slate-300', !active);
      });
    };

    modalGalleryTabs.replaceChildren();
    screenshots.forEach((slide, idx) => {
      const tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = 'px-2.5 py-1 rounded-lg border font-mono text-[11px] transition-colors';
      tabBtn.textContent = slide.label;
      tabBtn.addEventListener('click', () => selectSlide(idx));
      modalGalleryTabs.appendChild(tabBtn);
    });

    modalGallery.hidden = false;
    selectSlide(0);
  };

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
      renderGallery(study.screenshots, study.title);

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

