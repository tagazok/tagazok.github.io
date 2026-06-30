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
        <span class="topbar__brand">olivier<span class="topbar__dot">.</span></span>
        <nav class="topbar__nav">
          <a href="/" class=${this._isActive('/') ? 'active' : ''}>Home</a>
          <a href="/videos" class=${this._isActive('/videos') ? 'active' : ''}>Videos</a>
          <a href="https://www.linkedin.com/in/olivierleplus/" target="_blank" rel="noopener">LinkedIn ↗</a>
        </nav>
      </header>
    `;
  }
}

customElements.define('taga-header', TagaHeader);
