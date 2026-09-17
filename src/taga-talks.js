import { LitElement, html, css } from 'lit';
import { tokens, baseStyles } from './styles.js';

const ROLE_LABELS = {
  speaker: 'Speaker',
  mentor: 'Mentor',
  organizer: 'Organizer',
  host: 'Host',
  jury: 'Jury',
  panellist: 'Panellist',
};

export class TagaTalks extends LitElement {
  static properties = {
    _conferences: { state: true },
    _selectedRole: { state: true },
    _openYears: { state: true },
    _loading: { state: true },
    _error: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    css`
      :host { display: block; position: relative; z-index: 1; min-width: 0; }
      .page { width: min(1080px, calc(100% - 48px)); margin: 0 auto; padding: 88px 0 100px; }
      .hero { max-width: 760px; }
      .eyebrow { color: var(--accent-3); font: 500 10px var(--font-mono); letter-spacing: .15em; text-transform: uppercase; }
      h1 { margin: 12px 0 18px; font-size: clamp(42px, 7vw, 68px); line-height: .95; letter-spacing: -.06em; }
      .intro { max-width: 660px; margin: 0; color: var(--text-muted); font-size: 14px; line-height: 1.75; }
      .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 34px 0 48px; }
      .metric { padding: 18px 20px; border: 1px solid var(--glass-border); border-radius: 14px; background: var(--glass); backdrop-filter: blur(10px); }
      .metric strong { display: block; color: var(--text); font-size: 25px; letter-spacing: -.04em; }
      .metric span { color: var(--text-dim); font: 500 9px var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
      .toolbar { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
      .toolbar h2 { margin: 0; font-size: 23px; letter-spacing: -.035em; }
      .filters { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
      .filter { min-height: 34px; padding: 0 12px; border: 1px solid var(--glass-border); border-radius: 999px; color: var(--text-muted); background: transparent; font: 500 9px var(--font-mono); letter-spacing: .04em; cursor: pointer; transition: color .2s, border-color .2s, background .2s; }
      .filter:hover { color: var(--text); border-color: var(--accent); }
      .filter[aria-pressed='true'] { color: var(--text); border-color: rgba(99,102,241,.45); background: var(--accent-soft); }
      .filter:focus-visible, .year-header:focus-visible, a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
      .timeline { position: relative; padding-left: 32px; }
      .timeline::before { content: ''; position: absolute; top: 0; bottom: 0; left: 7px; width: 2px; background: var(--glass-border); }
      .year { position: relative; margin-bottom: 9px; }
      .year-header { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; width: 100%; gap: 12px; padding: 13px 0; border: 0; color: inherit; background: transparent; text-align: left; cursor: pointer; }
      .year-header::before { content: ''; position: absolute; left: -32px; width: 16px; height: 16px; border: 2px solid var(--accent); border-radius: 50%; background: var(--bg); }
      .year-label { color: var(--accent); font: 500 18px var(--font-mono); }
      .year-summary { color: var(--text-muted); font-size: 12px; }
      .year-toggle { color: var(--text-dim); font-size: 12px; transition: transform .25s; }
      .year.open .year-toggle { transform: rotate(180deg); }
      .events { display: none; padding: 2px 0 20px; }
      .year.open .events { display: grid; gap: 8px; }
      .event { padding: 17px 18px; border: 1px solid transparent; border-radius: 12px; background: rgba(255,255,255,.025); transition: border-color .2s, background .2s, transform .2s; }
      .event:hover { border-color: var(--glass-border); background: var(--surface-hover); transform: translateX(3px); }
      .event__top { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
      .event__name, .event__name a { color: var(--text); font-size: 14px; font-weight: 600; }
      .event__name a:hover { color: #a5b4fc; }
      .soon { padding: 2px 7px; border-radius: 999px; color: var(--accent-2); background: rgba(244,114,182,.1); font: 600 8px var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
      .roles { display: inline-flex; flex-wrap: wrap; gap: 5px; }
      .role { padding: 2px 7px; border-radius: 5px; color: var(--accent-3); background: rgba(52,211,153,.1); font: 600 8px var(--font-mono); text-transform: uppercase; }
      .role--speaker { color: #60a5fa; background: rgba(96,165,250,.1); }
      .role--mentor { color: #fb923c; background: rgba(251,146,60,.1); }
      .role--host { color: var(--accent-2); background: rgba(244,114,182,.1); }
      .role--jury { color: #fbbf24; background: rgba(251,191,36,.1); }
      .role--panellist { color: #c084fc; background: rgba(192,132,252,.1); }
      .talks { margin: 9px 0 0; padding-left: 18px; }
      .talks li { margin: 3px 0; color: var(--text-muted); font-size: 12px; line-height: 1.5; }
      .event__meta { margin-top: 9px; color: var(--text-dim); font: 400 9px var(--font-mono); text-transform: uppercase; }
      .status { margin-top: 40px; padding: 70px 24px; border: 1px solid var(--glass-border); border-radius: var(--radius); color: var(--text-muted); background: var(--glass); text-align: center; }
      @media (max-width: 720px) {
        .page { width: min(100% - 30px, 620px); padding: 64px 0 70px; }
        .metrics { grid-template-columns: repeat(3, 1fr); gap: 7px; margin-bottom: 36px; }
        .metric { padding: 14px 12px; }
        .metric strong { font-size: 20px; }
        .toolbar { align-items: flex-start; flex-direction: column; }
        .filters { justify-content: flex-start; max-width: 100%; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; scrollbar-width: none; }
        .filters::-webkit-scrollbar { display: none; }
        .filter { flex: 0 0 auto; }
        .timeline { padding-left: 26px; }
        .year-header::before { left: -26px; width: 14px; height: 14px; }
        .year-summary { font-size: 10px; }
        .event { padding: 15px; }
      }
      @media (max-width: 420px) {
        .metrics { grid-template-columns: 1fr; }
        .metric { display: flex; align-items: baseline; justify-content: space-between; }
        .year-header { grid-template-columns: auto minmax(0, 1fr) auto; gap: 8px; }
      }
    `,
  ];

  constructor() {
    super();
    this._conferences = [];
    this._selectedRole = 'all';
    this._openYears = new Set();
    this._loading = true;
    this._error = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    try {
      const response = await fetch('/assets/data/conferences.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this._conferences = await response.json();
      const latestYear = this._years[0]?.year;
      this._openYears = latestYear ? new Set([latestYear]) : new Set();
    } catch (error) {
      console.error('Failed to load talks', error);
      this._error = 'The speaking archive could not be loaded. Please try again shortly.';
    } finally {
      this._loading = false;
    }
  }

  _rolesFor(conference) {
    return conference.roles || [
      ...new Set((conference.talks || []).map((talk) => talk.role).filter(Boolean)),
    ];
  }

  get _roles() {
    return [...new Set(this._conferences.flatMap((conference) => this._rolesFor(conference)))]
      .sort();
  }

  get _filteredConferences() {
    if (this._selectedRole === 'all') return this._conferences;
    return this._conferences.filter((conference) =>
      this._rolesFor(conference).includes(this._selectedRole),
    );
  }

  get _years() {
    const grouped = {};
    for (const conference of this._filteredConferences) {
      const year = (conference.date || '').slice(0, 4);
      if (!year) continue;
      (grouped[year] ||= []).push(conference);
    }
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, events]) => ({
        year,
        events,
        talkCount: events.reduce((sum, event) => sum + (event.talks || []).length, 0),
        countryCount: new Set(
          events.map((event) => event.location?.country).filter(Boolean),
        ).size,
      }));
  }

  get _metrics() {
    return {
      events: this._conferences.length,
      talks: this._conferences.reduce((sum, event) => sum + (event.talks || []).length, 0),
      countries: new Set(
        this._conferences.map((event) => event.location?.country).filter(Boolean),
      ).size,
    };
  }

  _selectRole(role) {
    this._selectedRole = role;
    if (role === 'all') {
      const latestYear = this._years[0]?.year;
      this._openYears = latestYear ? new Set([latestYear]) : new Set();
      return;
    }
    this._openYears = new Set(this._years.map(({ year }) => year));
  }

  _toggleYear(year) {
    const next = new Set(this._openYears);
    next.has(year) ? next.delete(year) : next.add(year);
    this._openYears = next;
  }

  _renderEvent(event) {
    const roles = this._rolesFor(event);
    const isFuture = event.date && new Date(`${event.date}T23:59:59`).getTime() >= Date.now();
    return html`
      <article class="event">
        <div class="event__top">
          <span class="event__name">
            ${event.link
              ? html`<a href=${event.link} target="_blank" rel="noopener">${event.name}</a>`
              : event.name}
          </span>
          ${isFuture ? html`<span class="soon">Upcoming</span>` : null}
          <span class="roles">
            ${roles.map((role) => html`
              <span class="role role--${role}">${ROLE_LABELS[role] || role}</span>
            `)}
          </span>
        </div>
        ${(event.talks || []).length
          ? html`<ul class="talks">
              ${event.talks.map((talk) => html`<li>${talk.title}</li>`)}
            </ul>`
          : null}
        <div class="event__meta">
          ${(event.location && event.location.name) || 'Location TBA'} · ${event.date || ''}
        </div>
      </article>
    `;
  }

  render() {
    if (this._loading) return html`<main class="page"><div class="status">Loading speaking archive…</div></main>`;
    if (this._error) return html`<main class="page"><div class="status" role="alert">${this._error}</div></main>`;

    const metrics = this._metrics;
    const years = this._years;

    return html`
      <main class="page">
        <header class="hero">
          <span class="eyebrow">Speaking archive</span>
          <h1>Talks.</h1>
          <p class="intro">
            Conference sessions, workshops, mentoring, and community events—across
            web technologies, cloud, and applied AI.
          </p>
        </header>

        <section class="metrics" aria-label="Speaking statistics">
          <div class="metric"><strong>${metrics.events}</strong><span>Events</span></div>
          <div class="metric"><strong>${metrics.talks}</strong><span>Talks</span></div>
          <div class="metric"><strong>${metrics.countries}</strong><span>Countries</span></div>
        </section>

        <section aria-labelledby="archive-heading">
          <div class="toolbar">
            <h2 id="archive-heading">Complete archive</h2>
            <div class="filters" aria-label="Filter talks by role">
              <button class="filter" aria-pressed=${this._selectedRole === 'all'} @click=${() => this._selectRole('all')}>Everything</button>
              ${this._roles.map((role) => html`
                <button class="filter" aria-pressed=${this._selectedRole === role} @click=${() => this._selectRole(role)}>
                  ${ROLE_LABELS[role] || role}
                </button>
              `)}
            </div>
          </div>

          ${years.length
            ? html`<div class="timeline">
                ${years.map(({ year, events, talkCount, countryCount }) => html`
                  <section class="year ${this._openYears.has(year) ? 'open' : ''}">
                    <button
                      class="year-header"
                      type="button"
                      aria-expanded=${this._openYears.has(year)}
                      @click=${() => this._toggleYear(year)}
                    >
                      <span class="year-label">${year}</span>
                      <span class="year-summary">
                        ${events.length} events · ${talkCount} talks · ${countryCount} countries
                      </span>
                      <span class="year-toggle" aria-hidden="true">⌄</span>
                    </button>
                    <div class="events">
                      ${events.map((event) => this._renderEvent(event))}
                    </div>
                  </section>
                `)}
              </div>`
            : html`<div class="status">No events match this role yet.</div>`}
        </section>
      </main>
    `;
  }
}

customElements.define('taga-talks', TagaTalks);
