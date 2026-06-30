import { LitElement, html, css } from 'lit';
import { tokens, baseStyles, orbsStyles } from './styles.js';

export class TagaApp extends LitElement {
  static properties = {
    _path: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    orbsStyles,
    css`
      :host {
        display: block;
        min-height: 100vh;
      }
      main {
        padding-top: 60px;
      }
    `,
  ];

  constructor() {
    super();
    this._path = window.location.pathname;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this._onPopState);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._onPopState);
    this.removeEventListener('click', this._onClick);
  }

  _onPopState = () => {
    this._path = window.location.pathname;
  };

  _onClick = (e) => {
    const anchor = e.composedPath().find(
      (el) => el.tagName === 'A' && el.href && !el.target && el.origin === location.origin,
    );
    if (!anchor) return;
    e.preventDefault();
    if (anchor.pathname !== this._path) {
      window.history.pushState(null, '', anchor.pathname);
      this._path = anchor.pathname;
      window.scrollTo(0, 0);
    }
  };

  _renderPage() {
    switch (this._path) {
      case '/videos':
        return html`<taga-videos></taga-videos>`;
      case '/statistics':
        return html`<taga-statistics></taga-statistics>`;
      default:
        return html`<taga-home></taga-home>`;
    }
  }

  render() {
    return html`
      <div class="orbs">
        <div class="orb orb--1"></div>
        <div class="orb orb--2"></div>
        <div class="orb orb--3"></div>
      </div>
      <taga-header .path=${this._path}></taga-header>
      <main>${this._renderPage()}</main>
    `;
  }
}

customElements.define('taga-app', TagaApp);
