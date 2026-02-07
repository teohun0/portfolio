document.addEventListener('DOMContentLoaded', () => {
  const panels = Array.from(document.querySelectorAll('.panel'));
  const dots = Array.from(document.querySelectorAll('.dot'));

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updatePanels = () => {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    let activeIndex = 0;
    let bestFocus = -1;

    panels.forEach((panel) => {
      const rect = panel.getBoundingClientRect();
      const panelCenter = rect.top + rect.height / 2;
      const distance = Math.abs(panelCenter - viewportCenter);
      const focus = clamp(1 - distance / (viewportHeight * 0.9), 0, 1);

      panel.style.setProperty('--focus', focus.toFixed(3));

      const shouldReveal = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.18;
      panel.classList.toggle('show', shouldReveal);

      const index = Number(panel.dataset.index);
      if (focus > bestFocus && Number.isInteger(index)) {
        bestFocus = focus;
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  };

  let isTicking = false;
  const requestUpdate = () => {
    if (isTicking) {
      return;
    }

    isTicking = true;
    window.requestAnimationFrame(() => {
      updatePanels();
      isTicking = false;
    });
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  updatePanels();
});
