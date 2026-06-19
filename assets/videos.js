// Videos page — tab-based category browsing

let categories = [];
let currentTab = 'all';

const dom = {
  tabs: document.getElementById('video-tabs'),
  grid: document.getElementById('videos-grid'),
  count: document.getElementById('video-count'),
};

async function init() {
  const res = await fetch('assets/data/videos2.json');
  const data = await res.json();
  categories = data.filter(c => c.display !== false);

  renderTabs();
  renderGrid();
}

function renderTabs() {
  const totalVideos = categories.reduce((s, c) => s + c.videos.length, 0);
  dom.count.textContent = `${totalVideos} videos across ${categories.length} series`;

  const tabs = [{ id: 'all', label: 'All' }]
    .concat(categories.map(c => ({ id: c.title, label: c.title })));

  dom.tabs.innerHTML = tabs.map(t =>
    `<button class="tab ${t.id === currentTab ? 'tab--active' : ''}" data-tab="${t.id}">${t.label}</button>`
  ).join('');

  dom.tabs.addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    currentTab = btn.dataset.tab;
    dom.tabs.querySelectorAll('.tab').forEach(el => el.classList.remove('tab--active'));
    btn.classList.add('tab--active');
    renderGrid();
  });
}

function renderGrid() {
  let videos;
  if (currentTab === 'all') {
    videos = categories.flatMap(c => c.videos.map(v => ({ ...v, category: c.title })));
  } else {
    const cat = categories.find(c => c.title === currentTab);
    videos = cat ? cat.videos.map(v => ({ ...v, category: cat.title })) : [];
  }

  // Sort by date descending
  videos.sort((a, b) => {
    const da = parseDate(a.date);
    const db = parseDate(b.date);
    return db - da;
  });

  dom.grid.innerHTML = videos.map(v => `
    <a href="https://www.youtube.com/watch?v=${v.youtubeId}" class="vcard" target="_blank">
      <div class="vcard__thumb">
        <img src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg" alt="${v.title}" loading="lazy" />
        <span class="vcard__duration">${v.duration || ''}</span>
      </div>
      <div class="vcard__body">
        <h3 class="vcard__title">${v.title}</h3>
        <div class="vcard__meta">
          <span class="vcard__event">${(v.event && v.event.name) || v.category}</span>
          <span class="vcard__date">${v.date || ''}</span>
        </div>
      </div>
    </a>
  `).join('');
}

function parseDate(str) {
  if (!str) return 0;
  const match = str.match(/(\w+)\s+(\d+),\s+(\d{4})/);
  return match ? new Date(`${match[1]} ${match[2]}, ${match[3]}`).getTime() : 0;
}

init();
