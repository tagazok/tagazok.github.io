// Statistics page — loads conferences + videos data, renders summary cards and charts.

const PURPLE = '#6366f1';
const PURPLE_PALETTE = [
  '#6366f1', '#f472b6', '#34d399', '#fbbf24', '#a78bfa',
  '#22d3ee', '#fb7185', '#4ade80', '#f97316', '#e879f9'
];

// Dark theme defaults
Chart.defaults.color = 'rgba(241, 245, 249, 0.45)';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
Chart.defaults.font.family = "'Sora', sans-serif";
Chart.defaults.font.weight = 500;

let conferences = [];
let videos = [];
let allYears = [];
let allRoles = [];
const charts = {};

const dom = {
  summary: document.getElementById('summary-cards'),
  yearFilter: document.getElementById('filter-year'),
  rolesFilter: document.getElementById('filter-roles'),
  resetBtn: document.getElementById('filter-reset'),
};

// --- Data loading & parsing -------------------------------------------------

async function loadData() {
  const [confRes, vidRes] = await Promise.all([
    fetch('assets/data/conferences.json'),
    fetch('assets/data/videos2.json'),
  ]);
  const [confJson, vidJson] = await Promise.all([confRes.json(), vidRes.json()]);

  conferences = confJson.map(parseConference);
  videos = vidJson.flatMap(parseGroupVideos);
}

function parseConference(c) {
  const date = c.date || '';
  const year = date ? parseInt(date.split('-')[0], 10) : null;
  const country = (c.location && c.location.country) || '';
  return {
    date,
    year,
    name: c.name || '',
    country,
    talks: Array.isArray(c.talks) ? c.talks : [],
    roles: Array.isArray(c.roles) ? c.roles
      : [...new Set((Array.isArray(c.talks) ? c.talks : []).map(t => t.role).filter(Boolean))],
  };
}

function parseGroupVideos(group) {
  const list = Array.isArray(group.videos) ? group.videos : [];
  return list.map(v => ({
    title: v.title || '',
    eventName: (v.event && v.event.name) || group.title || 'Unknown',
    year: parseYearFromString(v.date),
    minutes: parseDurationToMinutes(v.duration),
  }));
}

function parseYearFromString(str) {
  if (!str) return null;
  // Format examples: "Sep 21, 2021", "May 3, 2021"
  const match = String(str).match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

function parseDurationToMinutes(str) {
  if (!str || typeof str !== 'string') return 0;
  const parts = str.split(':').map(n => parseInt(n, 10));
  if (parts.some(isNaN)) return 0;
  if (parts.length === 2) return parts[0] + parts[1] / 60;
  if (parts.length === 3) return parts[0] * 60 + parts[1] + parts[2] / 60;
  return 0;
}

// --- Filtering --------------------------------------------------------------

function getFilters() {
  const year = dom.yearFilter.value;
  const checked = Array.from(dom.rolesFilter.querySelectorAll('input[type="checkbox"]:checked'))
    .map(el => el.value);
  return { year, roles: checked };
}

function applyFilters({ year, roles }) {
  let confs = conferences;
  let vids = videos;

  if (year !== 'all') {
    const y = parseInt(year, 10);
    confs = confs.filter(c => c.year === y);
    vids = vids.filter(v => v.year === y);
  }

  if (roles.length < allRoles.length) {
    confs = confs.filter(c => c.roles.some(r => roles.includes(r)));
  }

  return { confs, vids };
}

// --- Summary cards ----------------------------------------------------------

function renderSummary(confs, vids) {
  const totalTalks = confs.reduce((sum, c) => sum + c.talks.length, 0);
  const totalMinutes = vids.reduce((sum, v) => sum + v.minutes, 0);
  const countryCounts = {};
  for (const c of confs) {
    if (c.country) countryCounts[c.country] = (countryCounts[c.country] || 0) + 1;
  }
  const countriesSorted = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);

  const cards = [
    { number: confs.length, label: 'Conferences' },
    { number: totalTalks, label: 'Talks given' },
    { number: vids.length, label: 'Videos' },
    { number: formatDuration(totalMinutes), label: 'Video time' },
    { number: Object.keys(countryCounts).length, label: 'Countries', extra: countriesSorted },
  ];

  dom.summary.innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-card__number">${c.number}</div>
      <div class="kpi-card__label">${c.label}</div>
      ${c.extra ? `<div class="kpi-card__list">${c.extra.map(([name, count]) => `<span class="kpi-card__tag">${name} (${count})</span>`).join('')}</div>` : ''}
    </div>
  `).join('');
}

function formatDuration(minutes) {
  const total = Math.round(minutes);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// --- Charts -----------------------------------------------------------------

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};

function destroyCharts() {
  Object.keys(charts).forEach(k => {
    if (charts[k]) { charts[k].destroy(); charts[k] = null; }
  });
}

function renderCharts(confs, vids) {
  destroyCharts();
  charts.confYear = renderConferencesPerYear(confs);
  charts.confCountry = renderConferencesByCountry(confs);
  charts.roles = renderRoleBreakdown(confs);
  charts.vidYear = renderVideosPerYear(vids);
  charts.vidEvent = renderVideosByEvent(vids);
  charts.timeline = renderTimeline(confs, vids);
}

function countBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const keys = keyFn(item);
    const list = Array.isArray(keys) ? keys : [keys];
    for (const k of list) {
      if (k === null || k === undefined || k === '') continue;
      map.set(k, (map.get(k) || 0) + 1);
    }
  }
  return map;
}

function renderConferencesPerYear(confs) {
  const roleSet = new Set();
  const talks = [];
  for (const c of confs) {
    for (const t of c.talks) {
      const role = t.role || (c.roles && c.roles[0]) || 'unknown';
      roleSet.add(role);
      talks.push({ year: c.year, role });
    }
  }
  const roles = Array.from(roleSet).sort();
  const yearSet = new Set(talks.map(t => t.year).filter(Boolean));
  const years = Array.from(yearSet).sort((a, b) => a - b);

  const datasets = roles.map((role, i) => {
    const data = years.map(y => talks.filter(t => t.year === y && t.role === role).length);
    return { label: role, data, backgroundColor: PURPLE_PALETTE[i % PURPLE_PALETTE.length] };
  }).filter(ds => ds.data.some(v => v > 0));

  return new Chart(document.getElementById('chart-conf-year'), {
    type: 'bar',
    data: { labels: years, datasets },
    options: {
      ...baseOptions,
      plugins: { legend: { display: true, position: 'bottom' } },
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } },
      },
    },
  });
}

function renderConferencesByCountry(confs) {
  const counts = countBy(confs, c => c.country);
  const sorted = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const canvas = document.getElementById('chart-conf-country');
  canvas.parentElement.style.height = Math.max(320, sorted.length * 45) + 'px';
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: sorted.map(([k]) => k),
      datasets: [{ label: 'Conferences', data: sorted.map(([, v]) => v), backgroundColor: PURPLE }],
    },
    options: {
      ...baseOptions,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, ticks: { precision: 0 } },
        y: { ticks: { autoSkip: false } },
      },
    },
  });
}

function renderRoleBreakdown(confs) {
  const counts = countBy(confs, c => c.roles);
  const labels = Array.from(counts.keys());
  const data = labels.map(l => counts.get(l));
  return new Chart(document.getElementById('chart-roles'), {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => PURPLE_PALETTE[i % PURPLE_PALETTE.length]),
        borderWidth: 0,
      }],
    },
    options: {
      ...baseOptions,
      plugins: { legend: { display: true, position: 'bottom' } },
    },
  });
}

function renderVideosPerYear(vids) {
  const counts = countBy(vids, v => v.year);
  const years = Array.from(counts.keys()).sort((a, b) => a - b);
  return new Chart(document.getElementById('chart-vid-year'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Videos',
        data: years.map(y => counts.get(y)),
        backgroundColor: PURPLE,
      }],
    },
    options: {
      ...baseOptions,
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    },
  });
}

function renderVideosByEvent(vids) {
  const counts = countBy(vids, v => v.eventName);
  const sorted = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const canvas = document.getElementById('chart-vid-event');
  canvas.parentElement.style.height = Math.max(320, sorted.length * 45) + 'px';
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: sorted.map(([k]) => k),
      datasets: [{ label: 'Videos', data: sorted.map(([, v]) => v), backgroundColor: PURPLE }],
    },
    options: {
      ...baseOptions,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, ticks: { precision: 0 } },
        y: { ticks: { autoSkip: false } },
      },
    },
  });
}

function renderTimeline(confs, vids) {
  const confCounts = countBy(confs, c => c.year);
  const vidCounts = countBy(vids, v => v.year);
  const years = Array.from(new Set([...confCounts.keys(), ...vidCounts.keys()]))
    .sort((a, b) => a - b);
  return new Chart(document.getElementById('chart-timeline'), {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Conferences',
          data: years.map(y => confCounts.get(y) || 0),
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, .12)',
          tension: .3,
          fill: true,
        },
        {
          label: 'Videos',
          data: years.map(y => vidCounts.get(y) || 0),
          borderColor: '#f472b6',
          backgroundColor: 'rgba(244, 114, 182, .12)',
          tension: .3,
          fill: true,
        },
      ],
    },
    options: {
      ...baseOptions,
      plugins: { legend: { display: true, position: 'bottom' } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    },
  });
}

// --- Filter UI --------------------------------------------------------------

function buildFilters() {
  const confYears = conferences.map(c => c.year).filter(Boolean);
  const vidYears = videos.map(v => v.year).filter(Boolean);
  allYears = Array.from(new Set([...confYears, ...vidYears])).sort((a, b) => b - a);

  const roleSet = new Set();
  for (const c of conferences) c.roles.forEach(r => roleSet.add(r));
  allRoles = Array.from(roleSet).sort();

  dom.yearFilter.innerHTML = `<option value="all">All</option>` +
    allYears.map(y => `<option value="${y}">${y}</option>`).join('');

  dom.rolesFilter.innerHTML = allRoles.map(r => `
    <label><input type="checkbox" value="${r}" checked> ${r}</label>
  `).join('');

  dom.yearFilter.addEventListener('change', refresh);
  dom.rolesFilter.addEventListener('change', refresh);
  dom.resetBtn.addEventListener('click', () => {
    dom.yearFilter.value = 'all';
    dom.rolesFilter.querySelectorAll('input[type="checkbox"]').forEach(el => { el.checked = true; });
    refresh();
  });
}

function refresh() {
  const { confs, vids } = applyFilters(getFilters());
  renderSummary(confs, vids);
  renderCharts(confs, vids);
}

// --- Init -------------------------------------------------------------------

(async function init() {
  await loadData();
  buildFilters();
  refresh();
})();
