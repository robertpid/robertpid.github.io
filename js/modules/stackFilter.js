/**
 * Controla los botones de filtro por categoría en la sección de Stack Tecnológico.
 */
export function initStackFilter() {
  const filterButtons = document.querySelectorAll('.stack-filter-btn');
  const stackCards = document.querySelectorAll('[data-stack-card]');

  if (!filterButtons.length || !stackCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-stack-filter');

      filterButtons.forEach((other) => {
        const isSelected = other === btn;
        other.setAttribute('aria-pressed', String(isSelected));
        other.classList.toggle('border-[#00f2fe]/50', isSelected);
        other.classList.toggle('bg-[#00f2fe]/15', isSelected);
        other.classList.toggle('text-[#00f2fe]', isSelected);
        other.classList.toggle('border-white/10', !isSelected);
        other.classList.toggle('bg-white/5', !isSelected);
        other.classList.toggle('text-slate-300', !isSelected);
      });

      stackCards.forEach((card) => {
        const category = card.getAttribute('data-stack-card');
        const visible = target === 'all' || category === target;
        card.classList.toggle('hidden', !visible);
      });
    });
  });
}

