export function bindHorizontalScrollbars(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-horizontal-scrollbar]').forEach((scrollbar) => {
    if (scrollbar.dataset.bound === 'true') return;
    const targetId = scrollbar.dataset.scrollTarget;
    const target = targetId ? document.getElementById(targetId) : null;
    const thumb = scrollbar.querySelector<HTMLElement>('[data-horizontal-scroll-thumb]');
    if (!target || !thumb) return;

    scrollbar.dataset.bound = 'true';
    const calm = matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const maxTravel = Math.max(0, scrollbar.clientWidth - thumb.offsetWidth);
      const progress = maxScroll > 0 ? target.scrollLeft / maxScroll : 0;
      scrollbar.hidden = target.hidden || maxScroll <= 1;
      thumb.style.setProperty('--horizontal-scroll-x', `${progress * maxTravel}px`);
      scrollbar.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    };

    let dragStartX = 0;
    let dragStartScroll = 0;

    target.addEventListener('scroll', sync, { passive: true });
    target.addEventListener('horizontal-scrollbar:update', sync);

    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(target);
    [...target.children].forEach((child) => resizeObserver.observe(child));
    new MutationObserver(sync).observe(target, { attributes: true, attributeFilter: ['hidden'] });

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      dragStartX = event.clientX;
      dragStartScroll = target.scrollLeft;
      thumb.setPointerCapture(event.pointerId);
    });

    thumb.addEventListener('pointermove', (event) => {
      if (!thumb.hasPointerCapture(event.pointerId)) return;
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const maxTravel = Math.max(1, scrollbar.clientWidth - thumb.offsetWidth);
      target.scrollLeft = dragStartScroll + (event.clientX - dragStartX) * (maxScroll / maxTravel);
    });

    thumb.addEventListener('pointerup', (event) => {
      if (thumb.hasPointerCapture(event.pointerId)) thumb.releasePointerCapture(event.pointerId);
    });

    scrollbar.addEventListener('click', (event) => {
      if (event.target === thumb) return;
      const rect = scrollbar.getBoundingClientRect();
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const maxTravel = Math.max(1, rect.width - thumb.offsetWidth);
      const targetX = Math.min(maxTravel, Math.max(0, event.clientX - rect.left - thumb.offsetWidth / 2));
      target.scrollTo({ left: (targetX / maxTravel) * maxScroll, behavior: calm.matches ? 'auto' : 'smooth' });
    });

    scrollbar.addEventListener('keydown', (event) => {
      const step = Math.max(90, target.clientWidth * 0.3);
      const behavior = calm.matches ? 'auto' : 'smooth';
      if (event.key === 'ArrowLeft') target.scrollBy({ left: -step, behavior });
      else if (event.key === 'ArrowRight') target.scrollBy({ left: step, behavior });
      else if (event.key === 'Home') target.scrollTo({ left: 0, behavior });
      else if (event.key === 'End') target.scrollTo({ left: target.scrollWidth, behavior });
      else return;
      event.preventDefault();
    });

    sync();
  });
}
