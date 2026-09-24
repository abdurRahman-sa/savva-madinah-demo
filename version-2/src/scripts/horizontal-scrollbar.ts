export function bindHorizontalScrollbars(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-horizontal-scrollbar]').forEach((scrollbar) => {
    if (scrollbar.dataset.bound === 'true') return;
    const targetId = scrollbar.dataset.scrollTarget;
    const target = targetId ? document.getElementById(targetId) : null;
    const thumb = scrollbar.querySelector<HTMLElement>('[data-horizontal-scroll-thumb]');
    if (!target || !thumb) return;

    scrollbar.dataset.bound = 'true';
    const calm = matchMedia('(prefers-reduced-motion: reduce)');
    const rtl = getComputedStyle(target).direction === 'rtl';
    const readScroll = () => rtl ? Math.abs(target.scrollLeft) : target.scrollLeft;
    const writeScroll = (value: number, behavior: ScrollBehavior = 'auto') => {
      target.scrollTo({ left: rtl ? -value : value, behavior });
    };

    const sync = () => {
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const maxTravel = Math.max(0, scrollbar.clientWidth - thumb.offsetWidth);
      const progress = maxScroll > 0 ? readScroll() / maxScroll : 0;
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
      dragStartScroll = readScroll();
      thumb.setPointerCapture(event.pointerId);
    });

    thumb.addEventListener('pointermove', (event) => {
      if (!thumb.hasPointerCapture(event.pointerId)) return;
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const maxTravel = Math.max(1, scrollbar.clientWidth - thumb.offsetWidth);
      const delta = (event.clientX - dragStartX) * (maxScroll / maxTravel) * (rtl ? -1 : 1);
      writeScroll(Math.min(maxScroll, Math.max(0, dragStartScroll + delta)));
    });

    thumb.addEventListener('pointerup', (event) => {
      if (thumb.hasPointerCapture(event.pointerId)) thumb.releasePointerCapture(event.pointerId);
    });

    scrollbar.addEventListener('click', (event) => {
      if (event.target === thumb) return;
      const rect = scrollbar.getBoundingClientRect();
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const maxTravel = Math.max(1, rect.width - thumb.offsetWidth);
      const pointer = rtl ? rect.right - event.clientX : event.clientX - rect.left;
      const targetX = Math.min(maxTravel, Math.max(0, pointer - thumb.offsetWidth / 2));
      writeScroll((targetX / maxTravel) * maxScroll, calm.matches ? 'auto' : 'smooth');
    });

    scrollbar.addEventListener('keydown', (event) => {
      const step = Math.max(90, target.clientWidth * 0.3);
      const behavior = calm.matches ? 'auto' : 'smooth';
      const current = readScroll();
      if (event.key === 'ArrowLeft') writeScroll(current + (rtl ? step : -step), behavior);
      else if (event.key === 'ArrowRight') writeScroll(current + (rtl ? -step : step), behavior);
      else if (event.key === 'Home') writeScroll(0, behavior);
      else if (event.key === 'End') writeScroll(target.scrollWidth, behavior);
      else return;
      event.preventDefault();
    });

    sync();
  });
}
