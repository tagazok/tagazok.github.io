import { LitElement, html, css } from 'lit';
import { tokens, baseStyles } from './styles.js';

const BIO = `Olivier Leplus is a Developer Advocate at AWS. He is a developer and technical writer with a passion for emerging web standards and open-source tooling. He specializes in modern web technologies, JavaScript, generative and agentic AI. When he isn't coding or speaking at conferences, Olivier enjoys running, traveling and exploring.`;

const PHOTOS = [
  {
    title: 'Studio portrait',
    description: 'Neutral black background · vertical crop',
    preview: '/assets/bio/originals/olivier-leplus-studio.jpeg',
    original: '/assets/bio/originals/olivier-leplus-studio.jpeg',
    filename: 'Olivier-Leplus-studio-portrait.jpeg',
    dimensions: '120 × 160 JPEG',
    position: 'center',
  },
  {
    title: 'Casual portrait',
    description: 'Friendly, informal portrait · square crop',
    preview: '/assets/bio/originals/olivier-leplus-casual.jpeg',
    original: '/assets/bio/originals/olivier-leplus-casual.jpeg',
    filename: 'Olivier-Leplus-casual-portrait.jpeg',
    dimensions: '512 × 512 JPEG',
    position: 'center',
  },
  {
    title: 'Conference portrait',
    description: 'Professional event setting · high resolution',
    preview: '/assets/bio/previews/olivier-leplus-conference.jpg',
    original: '/assets/bio/originals/olivier-leplus-conference.jpg',
    filename: 'Olivier-Leplus-conference-portrait.jpg',
    dimensions: '1045 × 1568 JPEG',
    position: 'center 30%',
  },
];

export class TagaBio extends LitElement {
  static properties = {
    _copyStatus: { state: true },
  };

  static styles = [
    tokens,
    baseStyles,
    css`
      :host { display: block; position: relative; z-index: 1; min-width: 0; }
      .page { width: min(1080px, calc(100% - 48px)); margin: 0 auto; padding: 88px 0 100px; }
      .hero { max-width: 720px; margin-bottom: 44px; }
      .eyebrow { color: var(--accent-3); font: 500 10px var(--font-mono); letter-spacing: .15em; text-transform: uppercase; }
      h1 { margin: 12px 0 18px; font-size: clamp(42px, 7vw, 68px); line-height: .95; letter-spacing: -.06em; }
      .intro { margin: 0; color: var(--text-muted); font-size: 14px; line-height: 1.75; }
      .section { margin-top: 48px; }
      .section-header { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
      .section-header h2 { margin: 0; font-size: 24px; letter-spacing: -.04em; }
      .section-header p { max-width: 480px; margin: 0; color: var(--text-dim); font-size: 10px; line-height: 1.55; text-align: right; }
      .bio-card { position: relative; padding: 30px; border: 1px solid var(--glass-border); border-radius: var(--radius); background: var(--glass); backdrop-filter: blur(12px); }
      .bio-card blockquote { margin: 0; color: var(--text); font-size: clamp(15px, 2vw, 18px); line-height: 1.8; letter-spacing: -.01em; }
      .bio-card__footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--glass-border); }
      .copy-status { min-height: 18px; color: var(--accent-3); font: 500 9px var(--font-mono); letter-spacing: .05em; text-transform: uppercase; }
      .button { display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 16px; border: 1px solid var(--glass-border); border-radius: 999px; color: var(--text); background: var(--surface); font: 600 10px var(--font); text-decoration: none; cursor: pointer; transition: transform .2s, border-color .2s, background .2s; }
      .button:hover { color: var(--text); border-color: var(--accent); background: var(--surface-hover); transform: translateY(-2px); }
      .button--primary { border-color: transparent; color: #fff; background: var(--accent); }
      .button--primary:hover { color: #fff; background: #818cf8; }
      .button:focus-visible { outline: 2px solid var(--accent-3); outline-offset: 3px; }
      .photos { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .photo-card { min-width: 0; overflow: hidden; border: 1px solid var(--glass-border); border-radius: var(--radius); background: var(--glass); backdrop-filter: blur(10px); }
      .photo-card__media { aspect-ratio: 4 / 5; overflow: hidden; background: var(--surface); }
      .photo-card__media img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .35s ease; }
      .photo-card:hover img { transform: scale(1.025); }
      .photo-card__body { display: flex; min-height: 178px; flex-direction: column; padding: 18px; }
      .photo-card h3 { margin: 0 0 7px; font-size: 15px; letter-spacing: -.025em; }
      .photo-card__description { margin: 0; color: var(--text-muted); font-size: 10px; line-height: 1.55; }
      .photo-card__dimensions { display: block; margin: 12px 0 16px; color: var(--accent-3); font: 500 8px var(--font-mono); letter-spacing: .06em; text-transform: uppercase; }
      .photo-card .button { align-self: flex-start; margin-top: auto; }
      .note { margin: 16px 0 0; color: var(--text-dim); font-size: 10px; line-height: 1.6; }
      @media (max-width: 760px) {
        .page { width: calc(100% - 30px); padding: 64px 0 70px; }
        .photos { grid-template-columns: 1fr; }
        .photo-card { display: grid; grid-template-columns: minmax(130px, .8fr) minmax(0, 1.2fr); }
        .photo-card__media { min-height: 260px; aspect-ratio: auto; }
        .section-header { align-items: flex-start; flex-direction: column; gap: 8px; }
        .section-header p { text-align: left; }
      }
      @media (max-width: 480px) {
        .bio-card { padding: 22px; }
        .bio-card__footer { align-items: flex-start; flex-direction: column-reverse; }
        .bio-card .button { width: 100%; }
        .photo-card { display: block; }
        .photo-card__media { min-height: 0; aspect-ratio: 4 / 5; }
      }
    `,
  ];

  constructor() {
    super();
    this._copyStatus = '';
    this._copyTimer = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._copyTimer) window.clearTimeout(this._copyTimer);
  }

  async _copyBio() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(BIO);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = BIO;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.append(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      this._copyStatus = 'Bio copied to clipboard';
    } catch (error) {
      console.error('Unable to copy bio', error);
      this._copyStatus = 'Copy failed — select the text manually';
    }
    if (this._copyTimer) window.clearTimeout(this._copyTimer);
    this._copyTimer = window.setTimeout(() => {
      this._copyStatus = '';
    }, 3000);
  }

  render() {
    return html`
      <main class="page">
        <header class="hero">
          <span class="eyebrow">Conference media kit</span>
          <h1>Bio & photos.</h1>
          <p class="intro">
            Approved biography and downloadable portraits for conference programs,
            speaker pages, promotional material, and event communications.
          </p>
        </header>

        <section class="section" aria-labelledby="bio-heading">
          <div class="section-header">
            <h2 id="bio-heading">Biography</h2>
            <p>Ready to paste into a speaker profile or event program.</p>
          </div>
          <div class="bio-card">
            <blockquote>${BIO}</blockquote>
            <div class="bio-card__footer">
              <span class="copy-status" role="status" aria-live="polite">${this._copyStatus}</span>
              <button class="button button--primary" type="button" @click=${this._copyBio}>
                Copy bio
              </button>
            </div>
          </div>
        </section>

        <section class="section" aria-labelledby="photos-heading">
          <div class="section-header">
            <h2 id="photos-heading">Photo options</h2>
            <p>Choose the tone that best fits the event. Downloads are the untouched originals.</p>
          </div>
          <div class="photos">
            ${PHOTOS.map((photo) => html`
              <article class="photo-card">
                <div class="photo-card__media">
                  <img src=${photo.preview} alt="${photo.title} of Olivier Leplus" style="object-position:${photo.position}" loading="lazy" />
                </div>
                <div class="photo-card__body">
                  <h3>${photo.title}</h3>
                  <p class="photo-card__description">${photo.description}</p>
                  <span class="photo-card__dimensions">${photo.dimensions}</span>
                  <a class="button" href=${photo.original} download=${photo.filename}>
                    Download original ↓
                  </a>
                </div>
              </article>
            `)}
          </div>
          <p class="note">
            The conference portrait is the highest-resolution option. Contact Olivier if your
            production team requires a larger studio or casual original.
          </p>
        </section>
      </main>
    `;
  }
}

customElements.define('taga-bio', TagaBio);
