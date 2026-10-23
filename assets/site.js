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
