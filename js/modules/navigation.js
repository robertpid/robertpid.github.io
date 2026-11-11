/**
 * Inicializa el menú móvil accesible y el Scrollspy (nativo con fallback).
 */
export function initNavigation() {
  initMobileMenu();
  initScrollspy();
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const mobilePanel = document.getElementById('mobile-nav-panel');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!menuBtn || !mobilePanel || !iconOpen || !iconClose) return;

  const setMenuState = (isOpen) => {
    mobilePanel.hidden = !isOpen;
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
    iconOpen.classList.toggle('hidden', isOpen);
    iconClose.classList.toggle('hidden', !isOpen);
  };

  menuBtn.addEventListener('click', () => {
    const currentlyOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    setMenuState(!currentlyOpen);
  });

  mobilePanel.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuBtn.focus();
    }
  });
}

function initScrollspy() {
  const navLinks = Array.from(document.querySelectorAll('nav[data-scrollspy] a'));
  if (!navLinks.length) return;

  const supportsScrollTargetGroup =
    typeof CSS !== 'undefined' && CSS.supports && CSS.supports('scroll-target-group: auto');

  if (supportsScrollTargetGroup) {
    const syncAriaCurrent = () => {
      const activeLink = document.querySelector('nav[data-scrollspy] a:target-current');
      navLinks.forEach((link) => {
        link.setAttribute('aria-current', link === activeLink ? 'true' : 'false');
      });
    };
    syncAriaCurrent();
    document.addEventListener('scrollend', syncAriaCurrent);
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const trackedSections = Array.from(document.querySelectorAll('main section[id], footer[id]'));
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('target-current', isActive);
          link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  trackedSections.forEach((section) => spyObserver.observe(section));
}

