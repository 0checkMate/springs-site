// Infinite, auto-rotating carousel for every `.grid.carousel`.
// Cards loop endlessly by rotating the DOM order, so the list circles back to the start.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

const AUTOPLAY_MS = 4000;   // time between automatic slides
const SLIDE_MS = 700;       // slide animation duration
const EASE = 'cubic-bezier(0.22, 0.8, 0.3, 1)';
const GAP = 18;

function initCarousel(track) {
  const wrap = document.createElement('div');
  wrap.className = 'car-wrap';
  const viewport = document.createElement('div');
  viewport.className = 'car-viewport';
  track.parentNode.insertBefore(wrap, track);
  wrap.appendChild(viewport);
  viewport.appendChild(track);

  viewport.setAttribute('tabindex', '0');
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-roledescription', 'carousel');
  viewport.setAttribute('aria-label', 'Cards. Use the left and right arrow keys to move.');

  const originals = Array.from(track.children);
  originals.forEach((card) => card.classList.add('in'));

  const stepSize = () => {
    const [a, b] = track.children;
    return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth + GAP;
  };
  const reflow = () => void track.offsetWidth;

  // Add copies when the list is too short to fill the row and keep looping smoothly
  const fill = () => {
    const need = Math.ceil(track.clientWidth / stepSize()) + 2;
    let i = 0;
    while (track.children.length < need) {
      const clone = originals[i % originals.length].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      [clone, ...clone.querySelectorAll('a, button')].forEach((el) => { el.tabIndex = -1; });
      clone.classList.add('in');
      track.appendChild(clone);
      i += 1;
    }
  };

  // --- Movement ---------------------------------------------------------
  let busy = false;

  // Moves the last card to the front (invisible, offset by one step) so we can slide either way
  const begin = () => {
    const step = stepSize();
    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transform = `translateX(${-step}px)`;
    reflow();
    return step;
  };

  // shift: -1 = previous, 0 = stay, 1 = next
  const finish = (shift, step) => {
    const target = -(1 + shift) * step;
    let ended = false;
    const done = () => {
      if (ended) return;
      ended = true;
      track.removeEventListener('transitionend', onEnd);
      track.style.transition = 'none';
      for (let i = 0; i < 1 + shift; i += 1) track.appendChild(track.firstElementChild);
      track.style.transform = 'translateX(0)';
      reflow();
      busy = false;
    };
    const onEnd = (e) => {
      if (e.target === track && e.propertyName === 'transform') done();
    };
    track.addEventListener('transitionend', onEnd);
    setTimeout(done, SLIDE_MS + 120);
    track.style.transition = reduceMotion.matches ? 'none' : `transform ${SLIDE_MS}ms ${EASE}`;
    track.style.transform = `translateX(${target}px)`;
    if (reduceMotion.matches) done();
  };

  const go = (shift) => {
    if (busy) return;
    busy = true;
    finish(shift, begin());
  };

  // --- Controls ---------------------------------------------------------
  const makeButton = (cls, label, glyph) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = cls;
    button.setAttribute('aria-label', label);
    button.textContent = glyph;
    wrap.appendChild(button);
    return button;
  };
  makeButton('car-btn car-prev', 'Previous card', '\u2190').addEventListener('click', () => go(-1));
  makeButton('car-btn car-next', 'Next card', '\u2192').addEventListener('click', () => go(1));

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });

  // --- Autoplay (pauses on hover, focus, hidden tab, off-screen, or user request) ---
  let userPaused = false;
  let hovering = false;
  let focused = false;
  let visible = false;

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
  }, { threshold: 0.2 }).observe(wrap);

  wrap.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hovering = true; });
  wrap.addEventListener('pointerleave', () => { hovering = false; });
  wrap.addEventListener('focusin', () => { focused = true; });
  wrap.addEventListener('focusout', () => { focused = false; });

  if (!reduceMotion.matches) {
    const toggle = makeButton('car-toggle', 'Pause automatic rotation', '\u275A\u275A');
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      toggle.textContent = userPaused ? '\u25B6' : '\u275A\u275A';
      toggle.setAttribute('aria-label', userPaused ? 'Resume automatic rotation' : 'Pause automatic rotation');
    });
    setInterval(() => {
      if (!busy && visible && !userPaused && !hovering && !focused && !document.hidden) go(1);
    }, AUTOPLAY_MS);
  }

  // --- Drag and swipe (mouse, touch, pen) -------------------------------
  let startX = 0;
  let dx = 0;
  let down = false;
  let dragging = false;
  let moved = false;
  let step = 0;

  viewport.addEventListener('pointerdown', (e) => {
    if (busy || (e.pointerType === 'mouse' && e.button !== 0)) return;
    down = true;
    dragging = false;
    moved = false;
    startX = e.clientX;
    dx = 0;
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!down) return;
    dx = e.clientX - startX;
    if (!dragging && Math.abs(dx) > 6) {
      dragging = true;
      moved = true;
      busy = true;
      step = begin();
      viewport.classList.add('dragging');
      viewport.setPointerCapture(e.pointerId);
    }
    if (dragging) track.style.transform = `translateX(${-step + dx}px)`;
  });
  const release = () => {
    if (!down) return;
    down = false;
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('dragging');
    const threshold = Math.min(80, step * 0.2);
    finish(dx < -threshold ? 1 : dx > threshold ? -1 : 0, step);
  };
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);

  // A drag must not count as a click on a card link
  viewport.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    }
  }, true);
  viewport.addEventListener('dragstart', (e) => e.preventDefault());

  fill();
  addEventListener('resize', fill);
}

document.querySelectorAll('.grid.carousel').forEach(initCarousel);
