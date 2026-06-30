import { LitElement, html, css } from 'lit';
import Chart from 'chart.js/auto';
import { tokens, baseStyles, glassPanel } from './styles.js';

const PURPLE = '#6366f1';
const PALETTE = [
  '#6366f1', '#f472b6', '#34d399', '#fbbf24', '#a78bfa',
  '#22d3ee', '#fb7185', '#4ade80', '#f97316', '#e879f9',
];

// Dark theme defaults — set once at module load.
Chart.defaults.color = 'rgba(241, 245, 249, 0.45)';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
Chart.defaults.font.family = "'Sora', sans-serif";
Chart.defaults.font.weight = 500;

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

/**
 * `<taga-statistics>` — analytics dashboard.
 *
 * Loads conferences + videos, exposes year/role filters, and renders six
 * Chart.js charts plus a row of KPI cards. Charts are recreated on every
 * filter change.
 */
export class TagaStatistics extends LitElement {
  static properties = {
    _conferences: { state: true },
    _videos: { state: true },
    _allYears: { state: true },
    _allRoles: { state: true },
    _year: { state: true },
    _selectedRoles: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    glassPanel,
    css`
      :host {
        display: block;
        position: relative;
        z-index: 1;
      }
      .dashboard {
        max-width: 1300px;
        margin: 0 auto;
        padding: 100px 32px 80px;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      /* KPI row */
      .kpi-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }
      .kpi-card {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        backdrop-filter: blur(12px);
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        transition: transform 0.2s, background 0.2s;
      }
      .kpi-card:hover {
        transform: translateY(-2px);
        background: var(--surface-hover);
      }
      .kpi-card--wide {
        grid-column: 1 / -1;
      }
      .kpi-card__number {
        font-family: var(--font-mono);
        font-size: 32px;
        font-weight: 500;
        color: var(--text);
        line-height: 1;
      }
      .kpi-card__label {
        margin-top: 8px;
        font-size: 11px;
        font-weight: 500;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }
      .kpi-card__list {
        margin-top: 14px;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        justify-content: center;
      }
      .kpi-card__tag {
        font-size: 10px;
        font-weight: 500;
        padding: 3px 8px;
        border-radius: 6px;
        background: var(--accent-soft);
        color: rgba(241, 245, 249, 0.7);
      }

      /* Filter bar */
      .filter-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        align-items: center;
        padding: 16px 24px;
      }
      .filter {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .filter label,
      .filter__label {
        font-size: 11px;
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .filter select {
        font-family: var(--font);
        font-size: 13px;
        font-weight: 500;
        padding: 7px 12px;
        border-radius: 8px;
        border: 1px solid var(--glass-border);
        background: rgba(0, 0, 0, 0.3);
        color: var(--text);
        cursor: pointer;
        transition: border-color 0.2s;
      }
      .filter select:focus {
        outline: none;
        border-color: var(--accent);
      }
      .filter__roles {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .filter__roles label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 12px;
        border-radius: 8px;
        border: 1px solid var(--glass-border);
        background: transparent;
        color: var(--text);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s;
        text-transform: none;
        letter-spacing: 0;
      }
      .filter__roles label:hover {
        border-color: var(--accent);
        background: var(--accent-soft);
      }
      .filter__roles input[type='checkbox'] {
        accent-color: var(--accent);
        margin: 0;
        width: 14px;
        height: 14px;
      }
      .btn-reset {
        margin-left: auto;
        font-family: var(--font);
        font-size: 12px;
        font-weight: 600;
        padding: 8px 16px;
        border-radius: 8px;
        border: none;
        background: var(--accent-soft);
        color: var(--accent);
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-reset:hover {
        background: var(--accent);
        color: #fff;
      }

      /* Chart grid */
      .chart-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
      .chart-card {
        display: flex;
        flex-direction: column;
        padding: 24px;
      }
      .chart-card--wide {
        grid-column: 1 / -1;
      }
      .chart-card__title {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 16px;
      }
      .chart-card__canvas {
        position: relative;
        min-height: 300px;
        flex: 1;
      }

      @media (max-width: 768px) {
        .dashboard {
          padding: 80px 16px 60px;
          gap: 16px;
        }
        .kpi-row {
          grid-template-columns: repeat(2, 1fr);
        }
        .chart-grid {
          grid-template-columns: 1fr;
        }
        .chart-card--wide {
          grid-column: auto;
        }
        .filter-bar {
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }
        .btn-reset {
          margin-left: 0;
        }
        .kpi-card__number {
          font-size: 26px;
        }
        .chart-card__canvas {
          min-height: 260px;
        }
      }
    `,
  ];

  constructor() {
    super();
    this._conferences = [];
    this._videos = [];
    this._allYears = [];
    this._allRoles = [];
    this._year = 'all';
    this._selectedRoles = new Set();
    this._charts = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._destroyCharts();
  }

  async _loadData() {
    try {
      const [confRes, vidRes] = await Promise.all([
        fetch('/assets/data/conferences.json'),
        fetch('/assets/data/videos2.json'),
      ]);
      const [confJson, vidJson] = await Promise.all([
        confRes.json(),
        vidRes.json(),
      ]);

      this._conferences = confJson.map(this._parseConference);
      this._videos = vidJson.flatMap((g) => this._parseGroupVideos(g));
      this._buildFilterOptions();
    } catch (err) {
      console.error('Failed to load statistics data', err);
    }
  }

  _parseConference(c) {
    const date = c.date || '';
    const year = date ? parseInt(date.split('-')[0], 10) : null;
    const country = (c.location && c.location.country) || '';
    const talks = Array.isArray(c.talks) ? c.talks : [];
    return {
      date,
      year,
      name: c.name || '',
      country,
      talks,
      roles: Array.isArray(c.roles)
        ? c.roles
        : [...new Set(talks.map((t) => t.role).filter(Boolean))],
    };
  }

  _parseGroupVideos(group) {
    const list = Array.isArray(group.videos) ? group.videos : [];
    return list.map((v) => ({
      title: v.title || '',
      eventName: (v.event && (v.event.name || v.event)) || (group.event && (group.event.name || group.event)) || group.title || 'Unknown',
      year: this._parseYear(v.date),
      minutes: this._parseDuration(v.duration),
    }));
  }

  _parseYear(str) {
    if (!str) return null;
    const m = String(str).match(/(\d{4})/);
    return m ? parseInt(m[1], 10) : null;
  }

  _parseDuration(str) {
    if (!str || typeof str !== 'string') return 0;
    const parts = str.split(':').map((n) => parseInt(n, 10));
    if (parts.some(isNaN)) return 0;
    if (parts.length === 2) return parts[0] + parts[1] / 60;
    if (parts.length === 3) return parts[0] * 60 + parts[1] + parts[2] / 60;
    return 0;
  }

  _buildFilterOptions() {
    const confYears = this._conferences.map((c) => c.year).filter(Boolean);
    const vidYears = this._videos.map((v) => v.year).filter(Boolean);
    this._allYears = Array.from(new Set([...confYears, ...vidYears])).sort(
      (a, b) => b - a,
    );

    const roleSet = new Set();
    for (const c of this._conferences) c.roles.forEach((r) => roleSet.add(r));
    this._allRoles = Array.from(roleSet).sort();
    this._selectedRoles = new Set(this._allRoles);
  }

  _onYearChange(e) {
    this._year = e.target.value;
  }

  _onRoleToggle(role, checked) {
    const next = new Set(this._selectedRoles);
    if (checked) next.add(role);
    else next.delete(role);
    this._selectedRoles = next;
  }

  _onReset() {
    this._year = 'all';
    this._selectedRoles = new Set(this._allRoles);
  }

  // ─── Filtering ───

  _applyFilters() {
    let confs = this._conferences;
    let vids = this._videos;
    if (this._year !== 'all') {
      const y = parseInt(this._year, 10);
      confs = confs.filter((c) => c.year === y);
      vids = vids.filter((v) => v.year === y);
    }
    if (this._selectedRoles.size < this._allRoles.length) {
      confs = confs.filter((c) =>
        c.roles.some((r) => this._selectedRoles.has(r)),
      );
    }
    return { confs, vids };
  }

  // ─── Lifecycle: rebuild charts after each render ───

  updated() {
    if (!this._conferences.length) return;
    const { confs, vids } = this._applyFilters();
    this._renderCharts(confs, vids);
  }

  _destroyCharts() {
    for (const k of Object.keys(this._charts)) {
      this._charts[k]?.destroy();
      this._charts[k] = null;
    }
  }

  _renderCharts(confs, vids) {
    this._destroyCharts();
    this._charts.confYear = this._chartConfYear(confs);
    this._charts.confCountry = this._chartConfCountry(confs);
    this._charts.roles = this._chartRoles(confs);
    this._charts.timeline = this._chartTimeline(confs, vids);
    this._charts.vidYear = this._chartVidYear(vids);
    this._charts.vidEvent = this._chartVidEvent(vids);
  }

  _countBy(items, keyFn) {
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

  _$(id) {
    return this.renderRoot.querySelector('#' + id);
  }

  _chartConfYear(confs) {
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
    const years = Array.from(new Set(talks.map((t) => t.year).filter(Boolean)))
      .sort((a, b) => a - b);

    const datasets = roles
      .map((role, i) => ({
        label: role,
        data: years.map(
          (y) => talks.filter((t) => t.year === y && t.role === role).length,
        ),
        backgroundColor: PALETTE[i % PALETTE.length],
      }))
      .filter((ds) => ds.data.some((v) => v > 0));

    return new Chart(this._$('chart-conf-year'), {
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

  _chartConfCountry(confs) {
    const counts = this._countBy(confs, (c) => c.country);
    const sorted = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    const canvas = this._$('chart-conf-country');
    canvas.parentElement.style.height =
      Math.max(320, sorted.length * 45) + 'px';
    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: sorted.map(([k]) => k),
        datasets: [
          {
            label: 'Conferences',
            data: sorted.map(([, v]) => v),
            backgroundColor: PURPLE,
          },
        ],
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

  _chartRoles(confs) {
    const counts = this._countBy(confs, (c) => c.roles);
    const labels = Array.from(counts.keys());
    const data = labels.map((l) => counts.get(l));
    return new Chart(this._$('chart-roles'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: labels.map(
              (_, i) => PALETTE[i % PALETTE.length],
            ),
            borderWidth: 0,
          },
        ],
      },
      options: {
        ...baseOptions,
        plugins: { legend: { display: true, position: 'bottom' } },
      },
    });
  }

  _chartTimeline(confs, vids) {
    const confCounts = this._countBy(confs, (c) => c.year);
    const vidCounts = this._countBy(vids, (v) => v.year);
    const years = Array.from(
      new Set([...confCounts.keys(), ...vidCounts.keys()]),
    ).sort((a, b) => a - b);
    return new Chart(this._$('chart-timeline'), {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Conferences',
            data: years.map((y) => confCounts.get(y) || 0),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, .12)',
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Videos',
            data: years.map((y) => vidCounts.get(y) || 0),
            borderColor: '#f472b6',
            backgroundColor: 'rgba(244, 114, 182, .12)',
            tension: 0.3,
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

  _chartVidYear(vids) {
    const counts = this._countBy(vids, (v) => v.year);
    const years = Array.from(counts.keys()).sort((a, b) => a - b);
    return new Chart(this._$('chart-vid-year'), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Videos',
            data: years.map((y) => counts.get(y)),
            backgroundColor: PURPLE,
          },
        ],
      },
      options: {
        ...baseOptions,
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
      },
    });
  }

  _chartVidEvent(vids) {
    const counts = this._countBy(vids, (v) => v.eventName);
    const sorted = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    const canvas = this._$('chart-vid-event');
    canvas.parentElement.style.height =
      Math.max(320, sorted.length * 45) + 'px';
    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: sorted.map(([k]) => k),
        datasets: [
          {
            label: 'Videos',
            data: sorted.map(([, v]) => v),
            backgroundColor: PURPLE,
          },
        ],
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

  // ─── Render ───

  _formatDuration(minutes) {
    const total = Math.round(minutes);
    const h = Math.floor(total / 60);
    const m = total % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  render() {
    const { confs, vids } = this._applyFilters();
    const totalTalks = confs.reduce((s, c) => s + c.talks.length, 0);
    const totalMinutes = vids.reduce((s, v) => s + v.minutes, 0);
    const countryCounts = {};
    for (const c of confs) {
      if (c.country) countryCounts[c.country] = (countryCounts[c.country] || 0) + 1;
    }
    const countriesSorted = Object.entries(countryCounts).sort(
      (a, b) => b[1] - a[1],
    );

    return html`
      <main class="dashboard">
        <section class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-card__number">${confs.length}</div>
            <div class="kpi-card__label">Conferences</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-card__number">${totalTalks}</div>
            <div class="kpi-card__label">Talks given</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-card__number">${vids.length}</div>
            <div class="kpi-card__label">Videos</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-card__number">
              ${this._formatDuration(totalMinutes)}
            </div>
            <div class="kpi-card__label">Video time</div>
          </div>
          <div class="kpi-card kpi-card--wide">
            <div class="kpi-card__number">
              ${Object.keys(countryCounts).length}
            </div>
            <div class="kpi-card__label">Countries</div>
            <div class="kpi-card__list">
              ${countriesSorted.map(
                ([name, count]) => html`
                  <span class="kpi-card__tag">${name} (${count})</span>
                `,
              )}
            </div>
          </div>
        </section>

        <section class="glass-panel filter-bar">
          <div class="filter">
            <label for="filter-year">Year</label>
            <select
              id="filter-year"
              .value=${this._year}
              @change=${this._onYearChange}
            >
              <option value="all">All</option>
              ${this._allYears.map(
                (y) => html`<option value=${y}>${y}</option>`,
              )}
            </select>
          </div>
          <div class="filter">
            <span class="filter__label">Roles</span>
            <div class="filter__roles">
              ${this._allRoles.map(
                (r) => html`
                  <label>
                    <input
                      type="checkbox"
                      .checked=${this._selectedRoles.has(r)}
                      @change=${(e) =>
                        this._onRoleToggle(r, e.target.checked)}
                    />
                    ${r}
                  </label>
                `,
              )}
            </div>
          </div>
          <button
            type="button"
            class="btn-reset"
            @click=${this._onReset}
          >Reset</button>
        </section>

        <section class="chart-grid">
          <div class="glass-panel chart-card chart-card--wide">
            <h3 class="chart-card__title">Talks per year</h3>
            <div class="chart-card__canvas">
              <canvas id="chart-conf-year"></canvas>
            </div>
          </div>
          <div class="glass-panel chart-card">
            <h3 class="chart-card__title">By country</h3>
            <div class="chart-card__canvas">
              <canvas id="chart-conf-country"></canvas>
            </div>
          </div>
          <div class="glass-panel chart-card">
            <h3 class="chart-card__title">Roles</h3>
            <div class="chart-card__canvas">
              <canvas id="chart-roles"></canvas>
            </div>
          </div>
          <div class="glass-panel chart-card chart-card--wide">
            <h3 class="chart-card__title">Activity timeline</h3>
            <div class="chart-card__canvas">
              <canvas id="chart-timeline"></canvas>
            </div>
          </div>
          <div class="glass-panel chart-card">
            <h3 class="chart-card__title">Videos per year</h3>
            <div class="chart-card__canvas">
              <canvas id="chart-vid-year"></canvas>
            </div>
          </div>
          <div class="glass-panel chart-card">
            <h3 class="chart-card__title">Videos by event</h3>
            <div class="chart-card__canvas">
              <canvas id="chart-vid-event"></canvas>
            </div>
          </div>
        </section>
      </main>
    `;
  }
}

customElements.define('taga-statistics', TagaStatistics);
