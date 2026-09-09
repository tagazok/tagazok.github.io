import { LitElement, html, css } from 'lit';
import { tokens, baseStyles, orbsStyles } from './styles.js';
import './taga-header.js';

const PAGE_ROUTES = {
  '/': {
    tag: 'taga-home',
    load: () => import('./taga-home.js'),
  },
  '/videos': {
    tag: 'taga-videos',
    load: () => import('./taga-videos.js'),
  },
  '/articles': {
    tag: 'taga-articles',
    load: () => import('./taga-articles.js'),
  },
  '/statistics': {
    tag: 'taga-statistics',
    load: () => import('./taga-statistics.js'),
  },
};

export class TagaApp extends LitElement {
  static properties = {
    _path: { state: true },
    _pageTag: { state: true },
    _pageReady: { state: true },
    _pageError: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    orbsStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
        min-height: 100vh;
        overflow-x: clip;
      }
      main {
        width: 100%;
        min-width: 0;
        padding-top: 60px;
      }
      .page-status {
        position: relative;
        z-index: 1;
        display: grid;
        min-height: calc(100vh - 60px);
        place-items: center;
        padding: 24px;
        color: var(--text-muted);
        font-size: 13px;
        text-align: center;
      }
    `,
  ];

  constructor() {
    super();
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('p');
    if (redirectPath) {
      window.history.replaceState(null, '', redirectPath);
      this._path = redirectPath;
    } else {
      this._path = window.location.pathname;
    }
    this._pageTag = '';
    this._pageReady = false;
    this._pageError = '';
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this._onPopState);
    this.addEventListener('click', this._onClick);
    this._loadPage(this._path);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._onPopState);
    this.removeEventListener('click', this._onClick);
  }

  _routeFor(path) {
    return PAGE_ROUTES[path] || PAGE_ROUTES['/'];
  }

  async _loadPage(path) {
    const route = this._routeFor(path);
    const requestedTag = route.tag;
    this._pageTag = requestedTag;
    this._pageError = '';

    if (customElements.get(requestedTag)) {
      this._pageReady = true;
      return;
    }

    this._pageReady = false;
    try {
      await route.load();
      if (this._pageTag === requestedTag) this._pageReady = true;
    } catch (error) {
      console.error(`Failed to load ${requestedTag}`, error);
      if (this._pageTag === requestedTag) {
        this._pageError = 'This page could not be loaded. Please refresh and try again.';
      }
    }
  }

  _onPopState = () => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('p');
    if (redirectPath) {
      window.history.replaceState(null, '', redirectPath);
      this._path = redirectPath;
    } else {
      this._path = window.location.pathname;
    }
    this._loadPage(this._path);
  };

  _onClick = (event) => {
    const anchor = event.composedPath().find(
      (element) =>
        element.tagName === 'A' &&
        element.href &&
        !element.target &&
        element.origin === location.origin,
    );
    if (!anchor) return;

    event.preventDefault();
    if (anchor.pathname !== this._path) {
      window.history.pushState(null, '', anchor.pathname);
      this._path = anchor.pathname;
      this._loadPage(this._path);
      window.scrollTo(0, 0);
    }
  };

  _renderPage() {
    if (this._pageError) {
      return html`<div class="page-status" role="alert">${this._pageError}</div>`;
    }
    if (!this._pageReady) {
      return html`<div class="page-status" role="status">Loading page…</div>`;
    }

    switch (this._pageTag) {
      case 'taga-videos':
        return html`<taga-videos></taga-videos>`;
      case 'taga-articles':
        return html`<taga-articles></taga-articles>`;
      case 'taga-statistics':
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
