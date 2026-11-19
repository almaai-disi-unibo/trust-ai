document.documentElement.classList.add('js');

/* Mobile nav */
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
if (burger && nav) {
  burger.addEventListener('click', () => burger.setAttribute('aria-expanded', nav.classList.toggle('open')));
}

/* Scroll reveal with a small stagger between siblings */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains('reveal'));
    entry.target.style.transitionDelay = siblings.indexOf(entry.target) * 0.08 + 's';
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
reveals.forEach((el) => observer.observe(el));

/* Back to top */
document.querySelectorAll('.footer__back-top').forEach((button) => {
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

/* People filter */
document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((tab) => tab.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('[data-category]').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

/* Copy buttons (contact details) */
document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Copied';
    } catch {
      // Clipboard blocked (e.g. plain http): select the text so the user can copy it by hand
      getSelection().selectAllChildren(button.previousElementSibling);
      button.textContent = 'Press Ctrl+C';
    }
    button.classList.add('copied');
    setTimeout(() => { button.textContent = 'Copy'; button.classList.remove('copied'); }, 1800);
  });
});

// Load the shared event announcement (one-time installation).
(() => {
  const current = document.currentScript;
  if (!current) return;
  const script = document.createElement('script');
  script.src = new URL('header-event.js', current.src).href;
  document.head.appendChild(script);
})();

// Shared Events dropdown — edit this list to update every page.
(() => {
  const currentScript = document.currentScript;
  if (!currentScript) return;

  // Works both on GitHub Pages and in event subfolders.
  const siteRoot = new URL('../', currentScript.src);

  const eventMenuItems = [
    { label: 'Seminars', path: 'events.html#seminars' },
    { label: 'Schools', path: 'events.html#schools' },
    { label: 'Open debates', path: 'events.html#open-debates' },
    { label: 'Past events', path: 'past-events.html' }
  ];

  function updateEventsMenu() {
    document.querySelectorAll('.header__menu').forEach((menu) => {
      const links = eventMenuItems.map((item) => {
        const link = document.createElement('a');
        link.textContent = item.label;
        link.href = new URL(item.path, siteRoot).href;
        return link;
      });

      menu.replaceChildren(...links);
    });

    // Also update the Events column in the footer.
    document.querySelectorAll('.footer__col').forEach((column) => {
      const title = column.querySelector('.footer__col-title');

      if (!title || title.textContent.trim() !== 'Events') return;

      const items = [
        { label: 'All events', path: 'events.html' },
        ...eventMenuItems
      ];

      const links = items.map((item) => {
        const link = document.createElement('a');
        link.textContent = item.label;
        link.href = new URL(item.path, siteRoot).href;
        return link;
      });

      column.replaceChildren(title, ...links);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateEventsMenu, {
      once: true
    });
  } else {
    updateEventsMenu();
  }
})();
