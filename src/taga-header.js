import { LitElement, html, css } from 'lit';
import { tokens, baseStyles, topbarStyles } from './styles.js';

export class TagaHeader extends LitElement {
  static properties = {
    path: { type: String },
  };

  static styles = [tokens, baseStyles, topbarStyles, css`:host { display: block; }`];

  constructor() {
    super();
    this.path = '/';
  }

  _isActive(target) {
    if (target === '/') return this.path === '/';
    return this.path === target || this.path.startsWith(target + '/');
  }

  render() {
    return html`
      <header class="topbar">
        <a href="/" class="topbar__brand" aria-current=${this.path === '/' ? 'page' : null}>
          olivier<span class="topbar__dot">.</span>
        </a>
        <nav class="topbar__nav" aria-label="Primary navigation">
          <a href="/" class=${this._isActive('/') ? 'active' : ''} aria-current=${this._isActive('/') ? 'page' : null}>Home</a>
          <a href="/talks" class=${this._isActive('/talks') ? 'active' : ''} aria-current=${this._isActive('/talks') ? 'page' : null}>Talks</a>
          <a href="/videos" class=${this._isActive('/videos') ? 'active' : ''} aria-current=${this._isActive('/videos') ? 'page' : null}>Videos</a>
          <a href="/articles" class=${this._isActive('/articles') ? 'active' : ''} aria-current=${this._isActive('/articles') ? 'page' : null}>Articles</a>
          <a href="https://www.linkedin.com/in/olivierleplus/" target="_blank" rel="noopener">LinkedIn ↗</a>
        </nav>
      </header>
    `;
  }
}

customElements.define('taga-header', TagaHeader);
