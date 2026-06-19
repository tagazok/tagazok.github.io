// Portfolio page — loads conferences + videos, renders stats, country cloud, videos, timeline

(async function init() {
  const [confRes, vidRes] = await Promise.all([
    fetch('assets/data/conferences.json'),
    fetch('assets/data/videos2.json'),
  ]);
  const [conferences, videoGroups] = await Promise.all([confRes.json(), vidRes.json()]);
  const videos = videoGroups.flatMap(g => (g.videos || []).map(v => ({ ...v, groupTitle: g.title })));

  renderStats(conferences, videos);
  renderCountryCloud(conferences);
  renderFeaturedVideos(videos);
  renderTimeline(conferences);
  initReveal();
})();

// ─── STATS (animated counters) ───

function renderStats(conferences, videos) {
  const talks = conferences.reduce((s, c) => s + (c.talks || []).length, 0);
  const countries = new Set(conferences.map(c => (c.location && c.location.country) || '').filter(Boolean)).size;

  document.getElementById('stat-conferences').dataset.target = conferences.length;
  document.getElementById('stat-talks').dataset.target = talks;
  document.getElementById('stat-countries').dataset.target = countries;
  document.getElementById('stat-videos').dataset.target = videos.length;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat').forEach(el => animateCounter(el));
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(document.getElementById('stats-ribbon'));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const numEl = el.querySelector('.stat__number');
  const duration = 1500;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    numEl.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── COUNTRY CLOUD ───

function renderCountryCloud(conferences) {
  const counts = {};
  for (const c of conferences) {
    const country = (c.location && c.location.country) || '';
    if (country && country !== 'Online') counts[country] = (counts[country] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted[0] ? sorted[0][1] : 1;
  const container = document.getElementById('country-cloud');

  container.innerHTML = sorted.map(([country, count]) => {
    const size = Math.max(14, Math.round((count / max) * 42));
    return `<span class="country-cloud__item" style="font-size:${size}px" title="${count} conferences">${country}</span>`;
  }).join('');
}

// ─── FEATURED VIDEOS ───

function renderFeaturedVideos(videos) {
  // Get most recent 4 videos (by parsing date)
  const withDate = videos.map(v => {
    const match = (v.date || '').match(/(\w+)\s+(\d+),\s+(\d{4})/);
    const ts = match ? new Date(`${match[1]} ${match[2]}, ${match[3]}`).getTime() : 0;
    return { ...v, ts };
  }).sort((a, b) => b.ts - a.ts);

  const featured = withDate.slice(0, 4);
  const container = document.getElementById('featured-videos');

  container.innerHTML = featured.map(v => `
    <a href="https://www.youtube.com/watch?v=${v.youtubeId}" class="video-card" target="_blank">
      <div class="video-card__thumb">
        <img src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg" alt="${v.title}" loading="lazy" />
        <span class="video-card__duration">${v.duration || ''}</span>
      </div>
      <div class="video-card__body">
        <div class="video-card__title">${v.title}</div>
        <div class="video-card__meta">${(v.event && v.event.name) || v.groupTitle} · ${v.date || ''}</div>
      </div>
    </a>
  `).join('');
}

// ─── TIMELINE ───

function renderTimeline(conferences) {
  const now = Date.now();
  // Group by year
  const byYear = {};
  for (const c of conferences) {
    const year = c.date ? c.date.split('-')[0] : 'Unknown';
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(c);
  }

  const years = Object.keys(byYear).filter(y => y !== 'Unknown').sort((a, b) => b - a);
  const currentYear = new Date().getFullYear().toString();
  const container = document.getElementById('timeline');

  container.innerHTML = years.map(year => {
    const events = byYear[year];
    const talkCount = events.reduce((s, c) => s + (c.talks || []).length, 0);
    const countries = new Set(events.map(c => (c.location && c.location.country) || '').filter(Boolean)).size;
    const isOpen = year === currentYear;

    return `
      <div class="timeline__year ${isOpen ? 'open' : ''}">
        <div class="timeline__year-header" onclick="this.parentElement.classList.toggle('open')">
          <span class="timeline__year-label">${year}</span>
          <span class="timeline__year-summary">${events.length} events · ${talkCount} talks · ${countries} countries</span>
          <span class="timeline__year-toggle"><i class="fas fa-chevron-down"></i></span>
        </div>
        <div class="timeline__events">
          ${events.map(c => renderTimelineEvent(c, now)).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderTimelineEvent(c, now) {
  const isFuture = c.date && new Date(c.date).getTime() > now;
  const roles = c.roles || [...new Set((c.talks || []).map(t => t.role).filter(Boolean))];
  const rolesHtml = roles.map(r => `<span class="timeline__role timeline__role--${r}">${r}</span>`).join('');
  const talksHtml = (c.talks || []).length
    ? `<ul class="timeline__event-talks">${(c.talks || []).map(t => `<li>${t.title}</li>`).join('')}</ul>`
    : '';
  const link = c.link ? `<a href="${c.link}" target="_blank">${c.name}</a>` : c.name;

  return `
    <div class="timeline__event">
      <div class="timeline__event-name">
        ${link}
        ${isFuture ? '<span class="timeline__event-soon">Soon</span>' : ''}
        <span class="timeline__event-roles">${rolesHtml}</span>
      </div>
      ${talksHtml}
      <div class="timeline__event-meta">${(c.location && c.location.name) || ''} · ${c.date || ''}</div>
    </div>
  `;
}

// ─── REVEAL ON SCROLL ───

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
