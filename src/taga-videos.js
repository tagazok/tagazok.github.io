import { LitElement, html, css } from 'lit';
import { tokens, baseStyles } from './styles.js';

/**
 * `<taga-videos>` — videos browsing page.
 *
 * Fetches the grouped video catalog, renders category tabs (All + each
 * group), and a grid of video cards sorted by date descending.
 */
export class TagaVideos extends LitElement {
  static properties = {
    _categories: { state: true },
    _currentTab: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    css`
      :host {
        display: block;
        position: relative;
        z-index: 1;
      }
      .videos-page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 100px 24px 80px;
      }
      .videos-hero {
        text-align: center;
        margin-bottom: 40px;
      }
      .videos-hero__title {
        font-size: 36px;
        font-weight: 800;
        letter-spacing: -1px;
      }
      .videos-hero__count {
        margin-top: 8px;
        font-size: 14px;
        color: var(--text-muted);
      }
      .videos-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 32px;
        justify-content: center;
      }
      .tab {
        font-family: var(--font);
        font-size: 13px;
        font-weight: 500;
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid var(--glass-border);
        background: transparent;
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.2s;
      }
      .tab:hover {
        border-color: var(--accent);
        color: var(--text);
      }
      .tab--active {
        background: var(--accent);
        border-color: var(--accent);
        color: #fff;
      }
      .videos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
      .vcard {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        overflow: hidden;
        backdrop-filter: blur(8px);
        text-decoration: none;
        color: var(--text);
        display: flex;
        flex-direction: column;
        transition: transform 0.2s, border-color 0.2s;
      }
      .vcard:hover {
        transform: translateY(-4px);
        border-color: var(--accent);
        color: var(--text);
      }
      .vcard__thumb {
        position: relative;
        aspect-ratio: 16 / 9;
        overflow: hidden;
      }
      .vcard__thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }
      .vcard:hover .vcard__thumb img {
        transform: scale(1.05);
      }
      .vcard__duration {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 4px;
      }
      .vcard__body {
        padding: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .vcard__title {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .vcard__meta {
        margin-top: auto;
        padding-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
      }
      .vcard__event {
        color: var(--accent);
        font-weight: 600;
      }
      .vcard__date {
        color: var(--text-dim);
      }
      @media (max-width: 768px) {
        .videos-page {
          padding: 80px 16px 60px;
        }
        .videos-hero__title {
          font-size: 28px;
        }
        .videos-grid {
          grid-template-columns: 1fr;
        }
        .videos-tabs {
          padding-bottom: 8px;
        }
        .tab {
          white-space: nowrap;
        }
      }
    `,
  ];

  constructor() {
    super();
    this._categories = [];
    this._currentTab = 'all';
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    try {
      const res = await fetch('/assets/data/videos2.json');
      const data = await res.json();
      this._categories = data.filter((c) => c.display !== false);
    } catch (err) {
      console.error('Failed to load videos', err);
    }
  }

  _setTab(id) {
    this._currentTab = id;
  }

  _parseDate(str) {
    if (!str) return 0;
    const m = str.match(/(\w+)\s+(\d+),\s+(\d{4})/);
    return m ? new Date(`${m[1]} ${m[2]}, ${m[3]}`).getTime() : 0;
  }

  get _videos() {
    let videos;
    if (this._currentTab === 'all') {
      videos = this._categories.flatMap((c) =>
        c.videos.map((v) => ({ ...v, category: c.title, _event: v.event || c.event })),
      );
    } else {
      const cat = this._categories.find((c) => c.title === this._currentTab);
      videos = cat ? cat.videos.map((v) => ({ ...v, category: cat.title })) : [];
    }
    return videos.sort(
      (a, b) => this._parseDate(b.date) - this._parseDate(a.date),
    );
  }

  get _totalCount() {
    return this._categories.reduce((s, c) => s + c.videos.length, 0);
  }

  render() {
    const tabs = [{ id: 'all', label: 'All' }].concat(
      this._categories.map((c) => ({ id: c.title, label: c.title })),
    );

    return html`
      <main class="videos-page">
        <div class="videos-hero">
          <h1 class="videos-hero__title">Videos</h1>
          <p class="videos-hero__count">
            ${this._totalCount} videos across ${this._categories.length} series
          </p>
        </div>

        <div class="videos-tabs">
          ${tabs.map(
            (t) => html`
              <button
                class="tab ${t.id === this._currentTab ? 'tab--active' : ''}"
                @click=${() => this._setTab(t.id)}
              >${t.label}</button>
            `,
          )}
        </div>

        <section class="videos-grid">
          ${this._videos.map(
            (v) => html`
              <a
                href="https://www.youtube.com/watch?v=${v.youtubeId}"
                class="vcard"
                target="_blank"
                rel="noopener"
              >
                <div class="vcard__thumb">
                  <img
                    src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg"
                    alt=${v.title}
                    loading="lazy"
                  />
                  <span class="vcard__duration">${v.duration || ''}</span>
                </div>
                <div class="vcard__body">
                  <h3 class="vcard__title">${v.title}</h3>
                  <div class="vcard__meta">
                    <span class="vcard__event">
                      ${(v._event && (v._event.name || v._event)) || v.category}
                    </span>
                    <span class="vcard__date">${v.date || ''}</span>
                  </div>
                </div>
              </a>
            `,
          )}
        </section>
      </main>
    `;
  }
}

customElements.define('taga-videos', TagaVideos);
