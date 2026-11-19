/* EDIT ONLY THIS OBJECT to change the announcement across the whole site.
   Set enabled: false to hide it everywhere.
   Use paths relative to the website root (no leading slash). */
(() => {
  const announcement = {
    enabled: true,
    label: 'AI Sandboxes · 9 Dec 2026',
    path: 'events.html#seminars'
  };

  // Resolve from this script, so GitHub Pages subdirectories also work.
  const script = document.currentScript;
  if (!script) return;
  const siteRoot = new URL('../', script.src);

  function updateAnnouncement() {
    document.querySelectorAll('.header__cta').forEach((link) => {
      link.hidden = !announcement.enabled;
      link.style.display = announcement.enabled ? '' : 'none';
      if (!announcement.enabled) return;
      link.href = new URL(announcement.path, siteRoot).href;
      const dot = document.createElement('span');
      dot.className = 'header__dot';
      dot.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = announcement.label;
      link.replaceChildren(dot, label);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAnnouncement, { once: true });
  } else {
    updateAnnouncement();
  }
})();
