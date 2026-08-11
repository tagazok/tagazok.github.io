import { LitElement, html, css } from 'lit';
import { tokens, baseStyles } from './styles.js';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'ai', label: 'AI & agents' },
  { id: 'aws', label: 'Cloud & AWS' },
  { id: 'web', label: 'Web' },
  { id: 'series', label: 'Series' },
];

export class TagaArticles extends LitElement {
  static properties = {
    _groups: { state: true },
    _filter: { state: true },
    _loading: { state: true },
    _error: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    css`
      :host { display: block; position: relative; z-index: 1; box-sizing: border-box; width: 100%; min-width: 0; max-width: 100%; overflow-x: clip; }
      .page { width: calc(100% - 48px); max-width: 1100px; margin: 0 auto; padding: 92px 0 90px; }
      .layout { display: grid; grid-template-columns: 230px minmax(0, 1fr); width: 100%; min-width: 0; gap: 68px; align-items: start; }
      .sidebar { min-width: 0; position: sticky; top: 96px; }
      .eyebrow { color: var(--accent-3); font-family: var(--font-mono); font-size: 10px; font-weight: 500; letter-spacing: .15em; text-transform: uppercase; }
      h1 { margin: 12px 0 18px; font-size: 46px; line-height: 1; letter-spacing: -.055em; }
      .intro { margin: 0; color: var(--text-muted); font-size: 13px; line-height: 1.75; }
      .summary { margin-top: 22px; color: var(--text-dim); font-family: var(--font-mono); font-size: 10px; line-height: 1.7; }
      .filters { display: grid; gap: 5px; margin-top: 32px; }
      .filter { display: flex; justify-content: space-between; gap: 14px; width: 100%; padding: 10px 12px; border: 0; border-radius: 8px; color: var(--text-muted); background: transparent; font: 500 12px var(--font); text-align: left; cursor: pointer; transition: color .2s, background .2s; }
      .filter:hover { color: var(--text); background: var(--surface); }
      .filter[aria-pressed='true'] { color: var(--text); background: var(--accent-soft); }
      .filter b { color: var(--text-dim); font-family: var(--font-mono); font-size: 10px; font-weight: 400; }
      .filter:focus-visible, a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
      .content { width: 100%; min-width: 0; max-width: 100%; padding-top: 8px; }
      .timeline-block { min-width: 0; max-width: 100%; }
      .section-kicker { margin: 0 0 18px; color: var(--text-dim); font-family: var(--font-mono); font-size: 10px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; }
      .article-row { display: grid; grid-template-columns: 150px minmax(0, 1fr); min-width: 0; max-width: 100%; gap: 22px; padding: 20px 0; border-top: 1px solid var(--glass-border); }
      .article-row > div, .series-row > div, .series-header > div { min-width: 0; }
      .article-image { display: block; height: 92px; overflow: hidden; border-radius: 10px; background: var(--surface); }
      .article-image img, .series-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
      .article-row:hover img, .series-row:hover img { transform: scale(1.04); }
      .article-title { display: inline; margin: 0; overflow-wrap: anywhere; color: var(--text); font-size: 16px; font-weight: 600; line-height: 1.4; letter-spacing: -.025em; }
      .article-title:hover { color: #a5b4fc; }
      .description { margin: 7px 0 8px; overflow-wrap: anywhere; color: var(--text-muted); font-size: 11px; line-height: 1.6; }
      .published { display: block; margin: 0 0 10px; color: var(--accent-3); font-family: var(--font-mono); font-size: 8px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
      .published--series { margin: 4px 0 0; color: var(--text-muted); }
      .platforms { display: flex; flex-wrap: wrap; gap: 6px; }
      .platform { display: inline-flex; align-items: center; gap: 6px; min-height: 24px; padding: 0 8px; border: 1px solid var(--glass-border); border-radius: 999px; color: var(--text-muted); background: rgba(15,15,19,.45); font-family: var(--font-mono); font-size: 8px; font-weight: 500; letter-spacing: .07em; text-transform: uppercase; }
      .platform::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
      .platform--dev::before { background: var(--text); }
      .platform:hover { border-color: var(--accent); color: var(--text); }
      .series-header { display: flex; align-items: end; justify-content: space-between; gap: 24px; padding: 17px 0 16px; border-bottom: 1px solid var(--glass-border); }
      .series-header h2 { margin: 7px 0 0; font-size: 27px; letter-spacing: -.045em; }
      .series-description { max-width: 590px; margin: 10px 0 0; overflow-wrap: anywhere; color: var(--text-muted); font-size: 11px; line-height: 1.65; }
      .series-meta { display: grid; gap: 6px; text-align: right; }
      .series-subtitle { color: var(--text-muted); font-family: var(--font-mono); font-size: 9px; line-height: 1.55; }
      .series-latest { color: var(--accent-3); font-family: var(--font-mono); font-size: 8px; letter-spacing: .05em; text-transform: uppercase; }
      .timeline-block + .timeline-block { margin-top: 30px; }
      .timeline-block--series { padding: 0 16px 8px; border: 1px solid var(--glass-border); border-radius: var(--radius); background: var(--glass); backdrop-filter: blur(8px); }
      .series-row { display: grid; grid-template-columns: 34px 116px minmax(0, 1fr) auto; align-items: center; min-width: 0; max-width: 100%; gap: 17px; padding: 14px 0; border-bottom: 1px solid var(--glass-border); }
      .series-row:last-child { border-bottom: 0; }
      .timeline-block--series + .timeline-block .article-row { border-top: 0; }
      .series-number { color: var(--accent-3); font-family: var(--font-mono); font-size: 10px; }
      .series-image { display: block; height: 67px; overflow: hidden; border-radius: 9px; background: var(--surface); }
      .series-title { display: block; overflow-wrap: anywhere; color: var(--text); font-size: 12px; font-weight: 500; line-height: 1.45; }
      .series-title:hover { color: #a5b4fc; }
      .topics { margin: 5px 0 0; color: var(--text-dim); font-family: var(--font-mono); font-size: 8px; line-height: 1.4; text-transform: uppercase; }
      .status { padding: 80px 24px; border: 1px solid var(--glass-border); border-radius: var(--radius); color: var(--text-muted); background: var(--glass); text-align: center; line-height: 1.6; }
      .status strong { display: block; margin-bottom: 7px; color: var(--text); font-size: 16px; }
      @media (max-width: 800px) {
        .page { width: calc(100% - 30px); max-width: 620px; padding: 70px 0 60px; }
        .layout { grid-template-columns: 1fr; gap: 34px; }
        .sidebar { position: static; }
        h1 { font-size: 40px; }
        .intro { max-width: 440px; }
        .summary { margin-top: 16px; }
        .filters { display: flex; max-width: 100%; gap: 6px; margin-top: 24px; padding-bottom: 5px; overflow-x: auto; overscroll-behavior-inline: contain; scrollbar-width: none; }
        .filters::-webkit-scrollbar { display: none; }
        .filter { flex: 0 0 auto; width: auto; white-space: nowrap; border: 1px solid var(--glass-border); }
        .article-row { grid-template-columns: 105px minmax(0, 1fr); gap: 14px; }
        .article-image { height: 78px; }
        .article-title { font-size: 13px; }
        .description { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .series-row { grid-template-columns: 28px 78px minmax(0, 1fr); gap: 11px; }
        .series-image { height: 56px; }
        .series-row .platforms { display: none; }
        .series-title { font-size: 11px; }
      }
      @media (max-width: 430px) {
        .page { padding-top: 54px; }
        .article-row { grid-template-columns: minmax(0, 1fr); }
        .article-image { width: 100%; height: 180px; }
        .series-header { align-items: start; flex-direction: column; gap: 8px; }
        .series-meta { text-align: left; }
        .timeline-block--series { padding: 0 12px 6px; }
        .series-row { grid-template-columns: 24px 72px minmax(0, 1fr); gap: 10px; }
        .series-image { width: 100%; }
        .series-subtitle { text-align: left; }
      }
    `,
  ];

  constructor() {
    super();
    this._groups = [];
    this._filter = 'all';
    this._loading = true;
    this._error = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    try {
      const response = await fetch('/assets/data/articles.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this._groups = await response.json();
    } catch (error) {
      console.error('Failed to load articles', error);
      this._error = 'The article index could not be loaded. Please try again shortly.';
    } finally {
      this._loading = false;
    }
  }

  get _allArticles() {
    return this._groups.flatMap((group) => group.articles);
  }

  _matches(article) {
    return this._filter === 'all' || article.tags?.includes(this._filter);
  }

  _count(filter) {
    return filter === 'all'
      ? this._allArticles.length
      : this._allArticles.filter((article) => article.tags?.includes(filter)).length;
  }

  _formatDate(date) {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
  }

  _platforms(article) {
    return html`<div class="platforms">
      ${article.links.map((link) => html`
        <a class="platform platform--${link.platform}" href=${link.url} target="_blank" rel="noopener" aria-label="Read ${article.title} on ${link.label}">${link.label}</a>
      `)}
    </div>`;
  }

  _standaloneRow(article) {
    const primary = article.links[0].url;
    return html`<article class="article-row">
      <a class="article-image" href=${primary} target="_blank" rel="noopener" tabindex="-1"><img src=${article.image} alt="" loading="lazy" /></a>
      <div>
        <a class="article-title" href=${primary} target="_blank" rel="noopener">${article.title}</a>
        <p class="description">${article.description}</p>
        <time class="published" datetime=${article.date}>Published ${this._formatDate(article.date)}</time>
        ${this._platforms(article)}
      </div>
    </article>`;
  }

  _seriesRow(article) {
    const primary = article.links[0].url;
    return html`<article class="series-row">
      <span class="series-number">${String(article.order + 1).padStart(2, '0')}</span>
      <a class="series-image" href=${primary} target="_blank" rel="noopener" tabindex="-1"><img src=${article.image} alt="" loading="lazy" /></a>
      <div>
        <a class="series-title" href=${primary} target="_blank" rel="noopener">${article.title}</a>
        <time class="published published--series" datetime=${article.date}>Published ${this._formatDate(article.date)}</time>
        <p class="topics">${article.topics}</p>
      </div>
      ${this._platforms(article)}
    </article>`;
  }

  render() {
    if (this._loading) return html`<main class="page"><div class="status">Loading articles…</div></main>`;
    if (this._error) return html`<main class="page"><div class="status"><strong>Something went wrong</strong>${this._error}</div></main>`;

    const standalone = this._groups.find((group) => group.kind === 'standalone');
    const articleBlocks = (standalone?.articles || [])
      .filter((article) => this._matches(article))
      .map((article) => ({ kind: 'article', date: article.date, article }));
    const seriesBlocks = this._groups.filter((group) => group.kind === 'series')
      .map((group) => {
        const latestDate = group.articles.reduce(
          (latest, article) => article.date > latest ? article.date : latest,
          '',
        );
        return {
          kind: 'series',
          date: latestDate,
          group: {
            ...group,
            totalCount: group.articles.length,
            articles: group.articles.filter((article) => this._matches(article)),
          },
        };
      })
      .filter((block) => block.group.articles.length);
    const timeline = [...articleBlocks, ...seriesBlocks]
      .sort((a, b) => b.date.localeCompare(a.date));
    const visibleCount = articleBlocks.length + seriesBlocks.reduce(
      (sum, block) => sum + block.group.articles.length,
      0,
    );

    return html`<main class="page">
      <div class="layout">
        <aside class="sidebar">
          <span class="eyebrow">Writing archive</span>
          <h1>Articles.</h1>
          <p class="intro">Technical notes, detailed walkthroughs, and things I learned by building them for real.</p>
          <p class="summary">${this._allArticles.length} articles<br />${this._groups.filter((group) => group.kind === 'series').length} series · ${new Set(this._allArticles.flatMap((article) => article.links.map((link) => link.platform))).size} platforms</p>
          <div class="filters" aria-label="Filter articles">
            ${FILTERS.map((filter) => html`<button class="filter" aria-pressed=${this._filter === filter.id} @click=${() => { this._filter = filter.id; }}>${filter.label}<b>${this._count(filter.id)}</b></button>`)}
          </div>
        </aside>
        <section class="content" aria-live="polite">
          ${timeline.length ? html`
            <p class="section-kicker">Latest writing</p>
            ${timeline.map((block) => block.kind === 'article'
              ? html`<div class="timeline-block">${this._standaloneRow(block.article)}</div>`
              : html`<section class="timeline-block timeline-block--series">
                  <header class="series-header">
                    <div>
                      <span class="eyebrow">${block.group.totalCount}-part series</span>
                      <h2>${block.group.title}</h2>
                      ${block.group.description
                        ? html`<p class="series-description">${block.group.description}</p>`
                        : ''}
                    </div>
                    <div class="series-meta">
                      <span class="series-subtitle">${block.group.subtitle}</span>
                      <time class="series-latest" datetime=${block.date}>Latest article ${this._formatDate(block.date)}</time>
                    </div>
                  </header>
                  ${block.group.articles.map((article) => this._seriesRow(article))}
                </section>`)}
          ` : ''}
          ${visibleCount === 0 ? html`<div class="status"><strong>No articles here yet</strong>Try another filter.</div>` : ''}
        </section>
      </div>
    </main>`;
  }
}

customElements.define('taga-articles', TagaArticles);
