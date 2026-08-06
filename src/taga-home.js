import { LitElement, html, css } from 'lit';
import {
  tokens,
  baseStyles,
  revealStyles,
} from './styles.js';

/**
 * `<taga-home>` — landing page.
 *
 * Loads conferences, videos, and articles JSON, then renders hero, animated stats,
 * country cloud, latest articles, latest videos, timeline grouped by year, and footer.
 */
export class TagaHome extends LitElement {
  static properties = {
    _conferences: { state: true },
    _videos: { state: true },
    _articleGroups: { state: true },
    _openYears: { state: true },
    _statTalks: { state: true },
    _statCountries: { state: true },
    _statVideos: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    revealStyles,
    css`
      :host {
        display: block;
        position: relative;
        z-index: 1;
      }

      /* Hero */
      .hero {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        padding: 80px 24px 40px;
      }
      .hero__visual {
        position: relative;
        margin-bottom: 32px;
      }
      .hero__avatar {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border: 3px solid var(--glass-border);
        object-fit: cover;
        position: relative;
        z-index: 1;
        transition: transform 0.3s, border-color 0.3s;
      }
      .hero__avatar:hover {
        transform: scale(1.05);
        border-color: var(--accent);
      }
      .hero__glow {
        position: absolute;
        inset: -10px;
        border-radius: 50%;
        background: conic-gradient(
          var(--accent),
          var(--accent-2),
          var(--accent-3),
          var(--accent)
        );
        opacity: 0.4;
        filter: blur(18px);
        animation: spin 8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .hero__name {
        font-size: clamp(36px, 6vw, 56px);
        font-weight: 800;
        letter-spacing: -2px;
        line-height: 1.1;
      }
      .hero__title {
        font-size: 17px;
        color: var(--text-muted);
        margin-top: 8px;
      }
      .hero__title a {
        color: var(--accent);
        font-weight: 500;
      }
      .hero__scroll {
        position: absolute;
        bottom: 40px;
        color: var(--text-dim);
        animation: bob 2s ease-in-out infinite;
      }
      @keyframes bob {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(8px);
        }
      }

      /* Stats ribbon */
      .stats-ribbon {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 24px;
        gap: 8px;
      }
      .stat {
        text-align: center;
        padding: 32px 16px;
        background: var(--glass);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        backdrop-filter: blur(12px);
      }
      .stat__number {
        display: block;
        font-family: var(--font-mono);
        font-size: 40px;
        font-weight: 500;
        color: var(--text);
      }
      .stat__label {
        display: block;
        margin-top: 6px;
        font-size: 11px;
        font-weight: 500;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }

      /* Sections */
      .section {
        position: relative;
        z-index: 1;
        max-width: 1024px;
        margin: 0 auto;
        padding: 80px 24px;
      }
      .section__title {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.5px;
        margin-bottom: 32px;
      }
      .section__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 32px;
      }
      .section__header .section__title {
        margin-bottom: 0;
      }
      .section__link {
        font-size: 13px;
        font-weight: 500;
        color: var(--text-muted);
        transition: color 0.2s;
      }
      .section__link:hover {
        color: var(--accent);
      }

      /* Country cloud */
      .country-cloud {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: center;
        align-items: center;
      }
      .country-cloud__item {
        font-weight: 600;
        color: var(--text);
        transition: color 0.2s, transform 0.2s;
        cursor: default;
      }
      .country-cloud__item:hover {
        color: var(--accent);
        transform: scale(1.1);
      }

      /* Latest articles */
      .latest-articles {
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.7fr);
        gap: 20px;
      }
      .article-lead,
      .article-dispatch {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        background: var(--glass);
        color: var(--text);
        text-decoration: none;
        backdrop-filter: blur(8px);
        transition: transform 0.25s, border-color 0.25s;
      }
      .article-lead:hover,
      .article-dispatch:hover {
        transform: translateY(-4px);
        border-color: var(--accent);
        color: var(--text);
      }
      .article-lead {
        min-height: 430px;
      }
      .article-lead > img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.45s ease;
      }
      .article-lead:hover > img,
      .article-dispatch:hover img {
        transform: scale(1.04);
      }
      .article-lead__shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(0deg, rgba(8, 8, 12, 0.97) 5%, rgba(8, 8, 12, 0.55) 54%, rgba(8, 8, 12, 0.06) 86%);
      }
      .article-lead__content {
        position: absolute;
        z-index: 1;
        left: 28px;
        right: 28px;
        bottom: 25px;
      }
      .article-showcase__meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        color: var(--accent-3);
        font-family: var(--font-mono);
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .article-showcase__meta time {
        color: rgba(241, 245, 249, 0.58);
      }
      .article-showcase__meta time::before {
        content: '·';
        margin-right: 8px;
        color: var(--text-dim);
      }
      .article-lead h3 {
        max-width: 650px;
        margin: 11px 0 9px;
        font-size: clamp(25px, 3.3vw, 36px);
        line-height: 1.1;
        letter-spacing: -0.045em;
      }
      .article-lead p {
        display: -webkit-box;
        max-width: 680px;
        margin: 0;
        overflow: hidden;
        color: rgba(241, 245, 249, 0.65);
        font-size: 12px;
        line-height: 1.65;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .article-showcase__cta {
        display: inline-block;
        margin-top: 16px;
        color: var(--text);
        font-family: var(--font-mono);
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      .article-dispatches {
        display: grid;
        grid-template-rows: repeat(2, minmax(0, 1fr));
        gap: 20px;
      }
      .article-dispatch {
        display: grid;
        grid-template-columns: 145px minmax(0, 1fr);
        min-height: 205px;
      }
      .article-dispatch__media {
        overflow: hidden;
      }
      .article-dispatch__media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }
      .article-dispatch__content {
        display: flex;
        min-width: 0;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
      }
      .article-dispatch .article-showcase__meta {
        display: grid;
        gap: 5px;
      }
      .article-dispatch .article-showcase__meta time::before {
        content: '';
        margin: 0;
      }
      .article-dispatch h3 {
        display: -webkit-box;
        margin: 10px 0 8px;
        overflow: hidden;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
        letter-spacing: -0.02em;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .article-dispatch p {
        display: -webkit-box;
        margin: 0;
        overflow: hidden;
        color: var(--text-muted);
        font-size: 10px;
        line-height: 1.55;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      @media (max-width: 900px) {
        .latest-articles {
          grid-template-columns: 1fr;
        }
        .article-dispatches {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: none;
        }
        .article-dispatch {
          grid-template-columns: 1fr;
        }
        .article-dispatch__media {
          height: 150px;
        }
      }

      /* Featured videos */
      .featured-videos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
      .video-card {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        overflow: hidden;
        backdrop-filter: blur(8px);
        transition: transform 0.2s, border-color 0.2s;
        text-decoration: none;
        color: var(--text);
        display: flex;
        flex-direction: column;
      }
      .video-card:hover {
        transform: translateY(-4px);
        border-color: var(--accent);
        color: var(--text);
      }
      .video-card__thumb {
        position: relative;
        aspect-ratio: 16 / 9;
        overflow: hidden;
      }
      .video-card__thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .video-card__duration {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        font-family: var(--font-mono);
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .video-card__body {
        padding: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .video-card__title {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .video-card__meta {
        margin-top: auto;
        padding-top: 10px;
        font-size: 11px;
        color: var(--text-muted);
      }

      /* Timeline */
      .timeline {
        position: relative;
        padding-left: 32px;
      }
      .timeline::before {
        content: '';
        position: absolute;
        left: 7px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--glass-border);
      }
      .timeline__year {
        position: relative;
        margin-bottom: 8px;
      }
      .timeline__year-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 12px 0;
        user-select: none;
      }
      .timeline__year-header::before {
        content: '';
        position: absolute;
        left: -32px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--bg);
        border: 2px solid var(--accent);
      }
      .timeline__year-label {
        font-family: var(--font-mono);
        font-size: 18px;
        font-weight: 500;
        color: var(--accent);
      }
      .timeline__year-summary {
        font-size: 13px;
        color: var(--text-muted);
      }
      .timeline__year-toggle {
        margin-left: auto;
        color: var(--text-dim);
        font-size: 12px;
        transition: transform 0.3s;
      }
      .timeline__year.open .timeline__year-toggle {
        transform: rotate(180deg);
      }
      .timeline__events {
        display: none;
        padding-bottom: 16px;
      }
      .timeline__year.open .timeline__events {
        display: block;
      }
      .timeline__event {
        padding: 12px 16px;
        margin-bottom: 4px;
        border-radius: 8px;
        transition: background 0.2s;
      }
      .timeline__event:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      .timeline__event-name {
        font-weight: 500;
        font-size: 14px;
      }
      .timeline__event-name a {
        color: var(--text);
        text-decoration: none;
      }
      .timeline__event-name a:hover {
        color: var(--accent);
      }
      .timeline__event-roles {
        display: inline-flex;
        gap: 6px;
        margin-left: 8px;
      }
      .timeline__role {
        font-size: 10px;
        font-weight: 600;
        padding: 1px 6px;
        border-radius: 4px;
      }
      .timeline__role--speaker {
        color: #60a5fa;
        background: rgba(96, 165, 250, 0.1);
      }
      .timeline__role--mentor {
        color: #fb923c;
        background: rgba(251, 146, 60, 0.1);
      }
      .timeline__role--organizer {
        color: var(--accent-3);
        background: rgba(52, 211, 153, 0.1);
      }
      .timeline__role--host {
        color: var(--accent-2);
        background: rgba(244, 114, 182, 0.1);
      }
      .timeline__role--jury {
        color: #fbbf24;
        background: rgba(251, 191, 36, 0.1);
      }
      .timeline__role--panellist {
        color: #c084fc;
        background: rgba(192, 132, 252, 0.1);
      }
      .timeline__event-talks {
        margin-top: 4px;
        list-style-type: circle;
        padding-left: 18px;
      }
      .timeline__event-talks li {
        font-size: 13px;
        color: var(--text-muted);
        margin-bottom: 2px;
      }
      .timeline__event-meta {
        font-size: 11px;
        color: var(--text-dim);
        margin-top: 4px;
      }
      .timeline__event-soon {
        color: var(--accent-2);
        font-weight: 600;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 8px;
      }

      /* Footer */
      .footer {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 60px 24px;
        border-top: 1px solid var(--glass-border);
      }
      .footer__links {
        display: flex;
        justify-content: center;
        gap: 32px;
      }
      .footer__links a {
        color: var(--text-muted);
        font-size: 20px;
        transition: color 0.2s, transform 0.2s;
      }
      .footer__links a:hover {
        color: var(--accent);
        transform: translateY(-2px);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .hero__name {
          font-size: 32px;
          letter-spacing: -1px;
        }
        .stats-ribbon {
          grid-template-columns: repeat(2, 1fr);
          max-width: 400px;
        }
        .stat__number {
          font-size: 28px;
        }
        .section {
          padding: 60px 16px;
        }
        .article-lead {
          min-height: 410px;
        }
        .article-lead__content {
          left: 20px;
          right: 20px;
          bottom: 20px;
        }
        .article-lead h3 {
          font-size: 26px;
        }
        .article-dispatches {
          grid-template-columns: 1fr;
        }
        .article-dispatch {
          grid-template-columns: 115px minmax(0, 1fr);
          min-height: 170px;
        }
        .article-dispatch__media {
          height: auto;
        }
        .article-dispatch__content {
          padding: 16px;
        }
        .featured-videos {
          grid-template-columns: 1fr;
        }
        .timeline {
          padding-left: 28px;
        }
      }
    `,
  ];

  constructor() {
    super();
    this._conferences = [];
    this._videos = [];
    this._articleGroups = [];
    this._openYears = new Set();
    this._statTalks = 0;
    this._statCountries = 0;
    this._statVideos = 0;
    this._statsObserver = null;
    this._revealObserver = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._statsObserver?.disconnect();
    this._revealObserver?.disconnect();
  }

  async _loadData() {
    try {
      const [confRes, vidRes, articleRes] = await Promise.all([
        fetch('/assets/data/conferences.json'),
        fetch('/assets/data/videos2.json'),
        fetch('/assets/data/articles.json'),
      ]);
      const [conferences, videoGroups, articleGroups] = await Promise.all([
        confRes.json(),
        vidRes.json(),
        articleRes.json(),
      ]);
      const videos = videoGroups.filter((g) => g.display !== false).flatMap((g) =>
        (g.videos || []).map((v) => ({ ...v, groupTitle: g.title, _event: v.event || g.event })),
      );
      this._conferences = conferences;
      this._videos = videos;
      this._articleGroups = articleGroups;

      const currentYear = new Date().getFullYear().toString();
      this._openYears = new Set([currentYear]);
    } catch (err) {
      console.error('Failed to load home data', err);
    }
  }

  updated(changed) {
    if (
      changed.has('_conferences') ||
      changed.has('_videos') ||
      changed.has('_articleGroups')
    ) {
      this._setupObservers();
    }
  }

  _setupObservers() {
    if (!this._conferences.length) return;

    // Stats counters: animate when ribbon enters viewport.
    const ribbon = this.renderRoot.querySelector('#stats-ribbon');
    if (ribbon && !this._statsObserver) {
      this._statsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this._animateStats();
            this._statsObserver.disconnect();
            this._statsObserver = null;
          }
        },
        { threshold: 0.3 },
      );
      this._statsObserver.observe(ribbon);
    }

    // Reveal-on-scroll for sections.
    if (!this._revealObserver) {
      this._revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              this._revealObserver.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.1 },
      );
    }
    this.renderRoot
      .querySelectorAll('.reveal:not(.visible)')
      .forEach((el) => this._revealObserver.observe(el));
  }

  _animateStats() {
    const talks = this._conferences.reduce(
      (s, c) => s + (c.talks || []).length,
      0,
    );
    const countries = new Set(
      this._conferences
        .map((c) => (c.location && c.location.country) || '')
        .filter(Boolean),
    ).size;
    const videos = this._videos.length;

    this._countTo('_statTalks', talks);
    this._countTo('_statCountries', countries);
    this._countTo('_statVideos', videos);
  }

  _countTo(prop, target) {
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this[prop] = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  _toggleYear(year) {
    const next = new Set(this._openYears);
    if (next.has(year)) next.delete(year);
    else next.add(year);
    this._openYears = next;
  }

  // ─── Computed views ───

  get _countries() {
    const counts = {};
    for (const c of this._conferences) {
      const country = (c.location && c.location.country) || '';
      if (country && country !== 'Online') {
        counts[country] = (counts[country] || 0) + 1;
      }
    }
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const max = sorted[0] ? sorted[0][1] : 1;
    return sorted.map(([country, count]) => ({
      country,
      count,
      size: Math.max(14, Math.round((count / max) * 42)),
    }));
  }

  get _featuredVideos() {
    const withDate = this._videos
      .map((v) => {
        const m = (v.date || '').match(/(\w+)\s+(\d+),\s+(\d{4})/);
        const ts = m ? new Date(`${m[1]} ${m[2]}, ${m[3]}`).getTime() : 0;
        return { ...v, ts };
      })
      .sort((a, b) => b.ts - a.ts);
    return withDate.slice(0, 3);
  }

  get _featuredArticles() {
    const entries = [];

    for (const group of this._articleGroups) {
      if (group.kind === 'series') {
        const latest = [...(group.articles || [])]
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''))[0];
        if (!latest) continue;
        entries.push({
          id: group.id,
          kind: 'series',
          title: group.title,
          description: group.description || group.subtitle || '',
          image: latest.image,
          date: latest.date,
          context: `${group.articles.length}-part series`,
          href: '/articles',
          external: false,
        });
        continue;
      }

      for (const article of group.articles || []) {
        const primaryLink = article.links?.[0];
        if (!primaryLink) continue;
        entries.push({
          ...article,
          kind: 'article',
          context: article.links.map((link) => link.label).join(' · '),
          href: primaryLink.url,
          external: true,
        });
      }
    }

    return entries
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 3);
  }

  _formatArticleDate(date) {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
  }

  _renderArticleLead(entry) {
    return html`
      <a
        class="article-lead"
        href=${entry.href}
        target=${entry.external ? '_blank' : '_self'}
        rel=${entry.external ? 'noopener' : ''}
        aria-label="${entry.kind === 'series' ? 'Explore' : 'Read'} ${entry.title}"
      >
        <img src=${entry.image} alt="" loading="lazy" />
        <div class="article-lead__shade"></div>
        <div class="article-lead__content">
          <div class="article-showcase__meta">
            <span>${entry.context}</span>
            <time datetime=${entry.date}>${this._formatArticleDate(entry.date)}</time>
          </div>
          <h3>${entry.title}</h3>
          <p>${entry.description}</p>
          <span class="article-showcase__cta">
            ${entry.kind === 'series' ? 'Explore the series' : 'Read the article'} →
          </span>
        </div>
      </a>
    `;
  }

  _renderArticleDispatch(entry) {
    return html`
      <a
        class="article-dispatch"
        href=${entry.href}
        target=${entry.external ? '_blank' : '_self'}
        rel=${entry.external ? 'noopener' : ''}
        aria-label="${entry.kind === 'series' ? 'Explore' : 'Read'} ${entry.title}"
      >
        <div class="article-dispatch__media">
          <img src=${entry.image} alt="" loading="lazy" />
        </div>
        <div class="article-dispatch__content">
          <div class="article-showcase__meta">
            <span>${entry.context}</span>
            <time datetime=${entry.date}>${this._formatArticleDate(entry.date)}</time>
          </div>
          <h3>${entry.title}</h3>
          <p>${entry.description}</p>
        </div>
      </a>
    `;
  }

  get _timelineYears() {
    const byYear = {};
    for (const c of this._conferences) {
      const year = c.date ? c.date.split('-')[0] : 'Unknown';
      if (year === 'Unknown') continue;
      (byYear[year] ||= []).push(c);
    }
    return Object.keys(byYear)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => {
        const events = byYear[year];
        const talkCount = events.reduce(
          (s, c) => s + (c.talks || []).length,
          0,
        );
        const countries = new Set(
          events.map((c) => (c.location && c.location.country) || '').filter(Boolean),
        ).size;
        return { year, events, talkCount, countries };
      });
  }

  // ─── Renderers ───

  _renderEvent(c) {
    const now = Date.now();
    const isFuture = c.date && new Date(c.date).getTime() > now;
    const roles =
      c.roles ||
      [...new Set((c.talks || []).map((t) => t.role).filter(Boolean))];
    return html`
      <div class="timeline__event">
        <div class="timeline__event-name">
          ${c.link
            ? html`<a href=${c.link} target="_blank" rel="noopener">${c.name}</a>`
            : c.name}
          ${isFuture
            ? html`<span class="timeline__event-soon">Soon</span>`
            : null}
          <span class="timeline__event-roles">
            ${roles.map(
              (r) => html`<span class="timeline__role timeline__role--${r}">${r}</span>`,
            )}
          </span>
        </div>
        ${(c.talks || []).length
          ? html`<ul class="timeline__event-talks">
              ${(c.talks || []).map((t) => html`<li>${t.title}</li>`)}
            </ul>`
          : null}
        <div class="timeline__event-meta">
          ${(c.location && c.location.name) || ''} · ${c.date || ''}
        </div>
      </div>
    `;
  }

  render() {
    const featuredArticles = this._featuredArticles;

    return html`
      <!-- HERO -->
      <section class="hero">
        <div class="hero__visual">
          <img
            class="hero__avatar"
            src="/assets/avatar.jpeg"
            alt="Olivier Leplus"
          />
          <div class="hero__glow"></div>
        </div>
        <h1 class="hero__name">Olivier Leplus</h1>
        <p class="hero__title">
          Developer Relations
          <a href="https://aws.amazon.com/" target="_blank" rel="noopener">@AWS</a>
        </p>
        <p class="hero__title">
          <a
            href="https://developers.google.com/community/experts/directory/profile/profile-olivier-leplus"
            target="_blank"
            rel="noopener"
          >Google Developer Expert</a>
          — Web Technologies
        </p>
        <div class="hero__scroll">
          <i class="fas fa-chevron-down"></i>
        </div>
      </section>

      <!-- STATS RIBBON -->
      <section class="stats-ribbon" id="stats-ribbon">
        <div class="stat">
          <span class="stat__number">${this._statTalks}</span>
          <span class="stat__label">Talks</span>
        </div>
        <div class="stat">
          <span class="stat__number">${this._statCountries}</span>
          <span class="stat__label">Countries</span>
        </div>
        <div class="stat">
          <span class="stat__number">${this._statVideos}</span>
          <span class="stat__label">Videos</span>
        </div>
      </section>

      <!-- COUNTRY CLOUD -->
      <section class="section reveal">
        <h2 class="section__title">Where I've spoken</h2>
        <div class="country-cloud">
          ${this._countries.map(
            (c) => html`
              <span
                class="country-cloud__item"
                style="font-size:${c.size}px"
                title="${c.count} conferences"
              >${c.country}</span>
            `,
          )}
        </div>
      </section>

      <!-- LATEST ARTICLES -->
      ${featuredArticles.length
        ? html`
            <section class="section reveal">
              <div class="section__header">
                <h2 class="section__title">Latest articles</h2>
                <a href="/articles" class="section__link">See all →</a>
              </div>
              <div class="latest-articles">
                ${this._renderArticleLead(featuredArticles[0])}
                <div class="article-dispatches">
                  ${featuredArticles.slice(1).map((entry) =>
                    this._renderArticleDispatch(entry),
                  )}
                </div>
              </div>
            </section>
          `
        : null}

      <!-- FEATURED VIDEOS -->
      <section class="section reveal">
        <div class="section__header">
          <h2 class="section__title">Latest videos</h2>
          <a href="/videos" class="section__link">See all →</a>
        </div>
        <div class="featured-videos">
          ${this._featuredVideos.map(
            (v) => html`
              <a
                href="https://www.youtube.com/watch?v=${v.youtubeId}"
                class="video-card"
                target="_blank"
                rel="noopener"
              >
                <div class="video-card__thumb">
                  <img
                    src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg"
                    alt=${v.title}
                    loading="lazy"
                  />
                  <span class="video-card__duration">${v.duration || ''}</span>
                </div>
                <div class="video-card__body">
                  <div class="video-card__title">${v.title}</div>
                  <div class="video-card__meta">
                    ${(v._event && (v._event.name || v._event)) || v.groupTitle} ·
                    ${v.date || ''}
                  </div>
                </div>
              </a>
            `,
          )}
        </div>
      </section>

      <!-- TIMELINE -->
      <section class="section reveal">
        <h2 class="section__title">Talks & Conferences</h2>
        <div class="timeline">
          ${this._timelineYears.map(
            ({ year, events, talkCount, countries }) => html`
              <div
                class="timeline__year ${this._openYears.has(year) ? 'open' : ''}"
              >
                <div
                  class="timeline__year-header"
                  @click=${() => this._toggleYear(year)}
                >
                  <span class="timeline__year-label">${year}</span>
                  <span class="timeline__year-summary">
                    ${events.length} events · ${talkCount} talks ·
                    ${countries} countries
                  </span>
                  <span class="timeline__year-toggle">
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </div>
                <div class="timeline__events">
                  ${events.map((c) => this._renderEvent(c))}
                </div>
              </div>
            `,
          )}
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="footer__links">
          <a
            href="https://www.linkedin.com/in/olivierleplus/"
            target="_blank"
            rel="noopener"
            title="LinkedIn"
          ><i class="fab fa-linkedin-in"></i></a>
          <a
            href="https://github.com/tagazok"
            target="_blank"
            rel="noopener"
            title="GitHub"
          ><i class="fab fa-github"></i></a>
          <a
            href="https://twitter.com/olivierleplus"
            target="_blank"
            rel="noopener"
            title="Twitter"
          ><i class="fab fa-twitter"></i></a>
        </div>
      </footer>
    `;
  }
}

customElements.define('taga-home', TagaHome);
