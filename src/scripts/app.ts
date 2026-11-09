import { Fancybox } from '@fancyapps/ui/dist/fancybox/';
import { en_EN } from '@fancyapps/ui/dist/fancybox/l10n/en_EN.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

/**
 * The site's client-side behaviour: theme persistence, navigation, galleries,
 * media controls, the contact form and cookie preferences.
 */

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------------------------- theme --- */

function initTheme() {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const read = () => {
    try {
      return localStorage.getItem('vs-theme');
    } catch {
      return null;
    }
  };

  // Follow the OS until the visitor makes an explicit choice.
  media.addEventListener('change', (e) => {
    if (!read()) root.dataset.theme = e.matches ? 'dark' : 'light';
  });

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      btn.setAttribute('aria-pressed', String(next === 'dark'));
      try {
        localStorage.setItem('vs-theme', next);
      } catch {
        /* private mode — the choice just will not persist */
      }
    });
    btn.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  });
}

/* --------------------------------------------------------- mobile menu --- */

function initMenu() {
  const dialog = document.querySelector<HTMLDialogElement>('#site-menu');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!dialog || !openBtn) return;

  const close = () => dialog.close();

  openBtn.addEventListener('click', () => {
    dialog.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });

  dialog.querySelector('[data-menu-close]')?.addEventListener('click', close);
  dialog.addEventListener('close', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  });

  // A link inside the menu navigates away; close first so history back is sane.
  dialog.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) close();
  });

  // Desktop breakpoint reached while open — the menu no longer applies.
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && dialog.open) close();
  });
}

/* -------------------------------------------------------- galleries ----- */

const csFancybox = {
  ...en_EN,
  CLOSE: 'Zavřít',
  NEXT: 'Další fotografie',
  PREV: 'Předchozí fotografie',
  MODAL: 'Galerii zavřete klávesou Escape',
  IMAGE_ERROR: 'Fotografii se nepodařilo načíst. Zkuste to prosím znovu.',
  ERROR: 'Něco se nepodařilo. Zkuste to prosím znovu.',
  ZOOM_IN: 'Přiblížit',
  ZOOM_OUT: 'Oddálit',
  TOGGLE_FULL: 'Přepnout velikost fotografie',
  TOGGLE_1TO1: 'Zobrazit ve skutečné velikosti',
  TOGGLE_FULLSCREEN: 'Přepnout zobrazení na celou obrazovku',
  TOGGLE_THUMBS: 'Zobrazit náhledy',
};

function initFancybox() {
  if (!document.querySelector('[data-fancybox]')) return;

  const reducedMotion = prefersReducedMotion();

  Fancybox.bind('[data-fancybox]', {
    l10n: document.documentElement.lang.startsWith('cs') ? csFancybox : en_EN,
    mainClass: 'vila-fancybox',
    theme: 'dark',
    placeFocusBack: true,
    dragToClose: !reducedMotion,
    zoomEffect: !reducedMotion,
    showClass: reducedMotion ? false : 'f-zoomInUp',
    hideClass: reducedMotion ? false : 'f-zoomOutDown',
    Carousel: {
      transition: reducedMotion ? false : 'fade',
      Thumbs: {
        type: 'modern',
        showOnStart: true,
      },
      Toolbar: {
        display: {
          left: ['counter'],
          right: ['zoomIn', 'zoomOut', 'fullscreen', 'thumbs', 'close'],
        },
      },
    },
  });
}


/* ------------------------------------------------------------- header --- */

/**
 * Flags the header once the page has scrolled, so a header sitting over a
 * hero can fade into its normal surface. A sentinel beats a scroll listener:
 * no work on the main thread while scrolling.
 */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const setState = (scrolled: boolean) => {
    header.dataset.scrolled = String(scrolled);
  };

  if (!('IntersectionObserver' in window)) {
    setState(true);
    return;
  }

  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:60vh;pointer-events:none';
  document.body.prepend(sentinel);

  new IntersectionObserver(([entry]) => setState(!entry.isIntersecting), {
    threshold: 0,
  }).observe(sentinel);
}

/* ---------------------------------------------------------- hero video --- */

/**
 * The poster image is what paints (and what LCP measures). The loop is only
 * fetched afterwards, and only when the visitor has not asked for reduced
 * motion, is not on Save-Data, and is not on a slow connection.
 */
function initHeroVideo() {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-hero-toggle]');
  if (!video) return;

  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  const frugal =
    conn?.saveData === true || ['slow-2g', '2g'].includes(conn?.effectiveType ?? '');

  if (prefersReducedMotion() || frugal) return;

  const narrow = window.matchMedia('(max-width: 900px)').matches;
  video.src = (narrow ? video.dataset.srcNarrow : video.dataset.srcWide) ?? '';
  video.load();

  video.addEventListener(
    'canplay',
    () => {
      video.dataset.ready = 'true';
      void video.play().catch(() => {
        /* Autoplay refused (iOS low-power mode): the poster stays, which is fine. */
      });
    },
    { once: true },
  );

  if (!toggle) return;

  const pauseIcon = toggle.querySelector<HTMLElement>('[data-icon-pause]')!;
  const playIcon = toggle.querySelector<HTMLElement>('[data-icon-play]')!;
  const label = toggle.querySelector<HTMLElement>('[data-hero-toggle-label]')!;
  const labels = {
    pause: toggle.dataset.labelPause ?? '',
    play: toggle.dataset.labelPlay ?? '',
  };

  const sync = () => {
    const playing = !video.paused;
    pauseIcon.hidden = !playing;
    playIcon.hidden = playing;
    label.textContent = playing ? labels.pause : labels.play;
  };

  video.addEventListener('playing', () => {
    toggle.hidden = false;
    sync();
  });
  video.addEventListener('pause', sync);

  toggle.addEventListener('click', () => {
    if (video.paused) void video.play();
    else video.pause();
    sync();
  });

  // Nothing decodes while the hero is off screen or the tab is hidden.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (toggle.dataset.userPaused !== 'true') void video.play().catch(() => {});
      },
      { threshold: 0.05 },
    ).observe(video);

    toggle.addEventListener('click', () => {
      toggle.dataset.userPaused = String(video.paused);
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (toggle.dataset.userPaused !== 'true') void video.play().catch(() => {});
  });
}

/* ------------------------------------------------------------ marquee ---- */

/** Keyboard users get the same pause that hover gives a mouse user. */
function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
    const stop = () => (el.dataset.paused = 'true');
    const go = () => (el.dataset.paused = 'false');
    el.addEventListener('focusin', stop);
    el.addEventListener('focusout', go);
    document.addEventListener('visibilitychange', () =>
      document.hidden ? stop() : go(),
    );
  });
}

/* ------------------------------------------------------------- forms ---- */

function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const toastBox = document.querySelector<HTMLElement>('[data-toast-box]');
  const toastText = toastBox?.querySelector<HTMLElement>('[data-toast-text]');
  const toastIcon = toastBox?.querySelector<HTMLElement>('[data-toast-icon]');
  let toastTimer: number | undefined;
  let sending = false;
  // Time since the form appeared; the server treats very fast submits as bots.
  const shownAt = performance.now();

  // Popover API puts the toast in the top layer; fall back to `hidden` without it.
  const hasPopover = typeof toastBox?.showPopover === 'function';
  if (toastBox && !hasPopover) toastBox.hidden = true;

  const isToastOpen = () =>
    !!toastBox && (hasPopover ? toastBox.matches(':popover-open') : !toastBox.hidden);

  const hideToast = () => {
    window.clearTimeout(toastTimer);
    if (!toastBox || !isToastOpen()) return;
    if (hasPopover) toastBox.hidePopover();
    else toastBox.hidden = true;
  };

  const showToast = (variant: 'success' | 'error', text: string) => {
    if (!toastBox || !toastText || !toastIcon) return;
    window.clearTimeout(toastTimer);
    toastBox.dataset.variant = variant;
    toastIcon.textContent = variant === 'success' ? '✓' : '!';
    toastText.textContent = text;
    if (hasPopover) {
      if (!isToastOpen()) toastBox.showPopover();
    } else {
      toastBox.hidden = false;
    }
    // Errors stay until dismissed; success fades after a while.
    if (variant === 'success') toastTimer = window.setTimeout(hideToast, 7000);
  };

  toastBox?.querySelector('[data-toast-close]')?.addEventListener('click', hideToast);
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && isToastOpen()) hideToast();
  });

  /*
   * Inline validation: each message sits under its own field. A field is
   * checked when the person leaves it after typing, re-checked live while it
   * shows an error (so the message clears the moment it's fixed), and all are
   * checked on submit.
   */
  type FieldName = 'name' | 'email' | 'phone' | 'message';
  const rules: Record<FieldName, (value: string, field: HTMLInputElement | HTMLTextAreaElement) => boolean> = {
    name: (v) => v.length > 1,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    phone: (_v, field) => field.validity.valid,
    message: (v) => v.length > 4,
  };
  const fieldNames = Object.keys(rules) as FieldName[];
  const getField = (name: FieldName) =>
    form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);

  const validateField = (name: FieldName) => {
    const field = getField(name);
    if (!field) return true;
    const valid = rules[name](field.value.trim(), field);
    const message = valid ? '' : (form.dataset[`err${name[0].toUpperCase()}${name.slice(1)}`] ?? '');
    const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    field.setAttribute('aria-invalid', valid ? 'false' : 'true');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = valid;
    }
    return valid;
  };

  const dirty = new Set<FieldName>();
  for (const name of fieldNames) {
    const field = getField(name);
    if (!field) continue;
    field.addEventListener('input', () => {
      dirty.add(name);
      if (field.getAttribute('aria-invalid') === 'true') validateField(name);
    });
    field.addEventListener('blur', () => {
      if (dirty.has(name)) validateField(name);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const unit = String(data.get('unit') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const invalid = fieldNames.filter((n) => !validateField(n));
    if (invalid.length) {
      // The message under the field is linked via aria-describedby, so focus announces it.
      getField(invalid[0])?.focus();
      return;
    }

    sending = true;
    hideToast();
    form.setAttribute('aria-busy', 'true');
    if (submit) {
      submit.disabled = true;
      submit.textContent = form.dataset.msgSending ?? '…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          unit,
          message,
          website: String(data.get('website') ?? ''),
          elapsed: Math.round(performance.now() - shownAt),
          subject: form.dataset.subject ?? 'Vila SCALA',
          locale: form.dataset.locale,
        }),
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !result?.ok) throw new Error(`HTTP ${res.status}`);

      form.reset();
      dirty.clear();
      form
        .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[aria-invalid]')
        .forEach((field) => field.removeAttribute('aria-invalid'));
      showToast('success', form.dataset.msgSuccess ?? '');
    } catch {
      showToast('error', form.dataset.msgError ?? '');
    } finally {
      sending = false;
      form.removeAttribute('aria-busy');
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.label ?? submit.textContent;
      }
    }
  });
}

/* ------------------------------------------------------------ cookies --- */

function initCookieConsent() {
  const bar = document.querySelector<HTMLElement>('[data-cookie-bar]');
  if (!bar) return;

  const storageKey = 'vs-cookie-consent';
  const root = document.documentElement;

  const read = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const open = () => {
    bar.hidden = false;
    root.dataset.cookieBar = 'open';
  };

  const close = () => {
    bar.hidden = true;
    delete root.dataset.cookieBar;
  };

  bar.querySelectorAll<HTMLButtonElement>('[data-cookie-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.dataset.cookieChoice === 'all' ? 'all' : 'necessary';
      try {
        localStorage.setItem(storageKey, choice);
      } catch {
        /* The choice still applies for this page view when storage is unavailable. */
      }
      document.dispatchEvent(new CustomEvent('vs:cookie-consent', { detail: choice }));
      close();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-cookie-settings]').forEach((button) => {
    button.addEventListener('click', open);
  });

  if (!read()) open();
}

/* -------------------------------------------------------------- boot ---- */

const boot = () => {
  initTheme();
  initHeader();
  initMenu();
  initFancybox();
  initHeroVideo();
  initMarquee();
  initContactForm();
  initCookieConsent();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
