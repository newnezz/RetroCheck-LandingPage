/**
 * RetroCheck landing — download URLs & version.
 * Set RELEASE_BASE and REPO_HOME before publishing.
 */
(function () {
  const VERSION = '1.0.0';

  /** Full URL to the release folder (no trailing slash), e.g. https://github.com/org/repo/releases/download/v1.0.0 */
  const RELEASE_BASE = 'https://github.com/newnezz/Retro-Game-Cleaner/releases/download/v1.0.0';

  /** Repo root for “All releases” link, e.g. https://github.com/org/repo */
  const REPO_HOME = 'https://github.com/newnezz/Retro-Game-Cleaner';

  /** Must match `npm run dist` / electron-builder output names. */
  const FILES = {
    win: `retrocheck-${VERSION}-setup.exe`,
    mac: `RetroCheck-${VERSION}-arm64.dmg`,
    'linux-appimage': `RetroCheck-${VERSION}.AppImage`,
    'linux-deb': `retrocheck_${VERSION}_amd64.deb`,
  };

  const needsConfig = false;
    // !RELEASE_BASE || RELEASE_BASE.includes('newnezz');

  const banner = document.getElementById('config-banner');
  if (banner) {
    banner.hidden = !needsConfig;
  }

  const pill = document.getElementById('version-pill');
  if (pill) {
    pill.textContent = `v${VERSION}`;
  }

  function hrefFor(key) {
    if (needsConfig) {
      return '#';
    }
    const base = RELEASE_BASE.replace(/\/$/, '');
    return `${base}/${FILES[key]}`;
  }

  document.querySelectorAll('[data-dl]').forEach((el) => {
    const key = el.getAttribute('data-dl');
    el.setAttribute('href', hrefFor(key));
    if (needsConfig) {
      el.setAttribute('title', 'Set RELEASE_BASE in main.js to enable downloads');
      el.addEventListener('click', (ev) => {
        if (el.getAttribute('href') === '#') {
          ev.preventDefault();
          window.alert(
            'Configure RELEASE_BASE in main.js with your GitHub release asset URL, then redeploy.'
          );
        }
      });
    }
  });

  const rel = document.getElementById('releases-link');
  if (rel) {
    if (REPO_HOME && !REPO_HOME.includes('YOUR_ORG')) {
      rel.href = `${REPO_HOME.replace(/\/$/, '')}/releases`;
    } else {
      rel.href = '#';
      rel.setAttribute('title', 'Set REPO_HOME in main.js');
    }
  }
})();


