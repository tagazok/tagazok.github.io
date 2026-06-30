import { css } from 'lit';

/**
 * Shared design tokens (CSS custom properties) made available to every
 * component. CSS variables defined on `:host` cascade through the shadow DOM.
 */
export const tokens = css`
  :host {
    --bg: #0f0f13;
    --surface: rgba(255, 255, 255, 0.04);
    --surface-hover: rgba(255, 255, 255, 0.07);
    --glass: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.08);
    --accent: #6366f1;
    --accent-soft: rgba(99, 102, 241, 0.15);
    --accent-2: #f472b6;
    --accent-3: #34d399;
    --text: #f1f5f9;
    --text-muted: rgba(241, 245, 249, 0.45);
    --text-dim: rgba(241, 245, 249, 0.3);
    --radius: 16px;
    --font: 'Sora', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
`;

/** Reset + base typography fragment, scoped to a host. */
export const baseStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    color: var(--text);
    font-family: var(--font);
    font-size: 15px;
    font-weight: 400;
  }

  a {
    color: var(--accent);
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover {
    color: #818cf8;
  }
`;

/** Glass panel utility used by several pages. */
export const glassPanel = css`
  .glass-panel {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    backdrop-filter: blur(12px);
  }
`;

/** Ambient background orbs. Used by `<taga-app>`. */
export const orbsStyles = css`
  .orbs {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.35;
    animation: drift 20s ease-in-out infinite;
  }
  .orb--1 {
    width: 500px;
    height: 500px;
    background: var(--accent);
    top: -10%;
    left: -5%;
    animation-duration: 25s;
  }
  .orb--2 {
    width: 400px;
    height: 400px;
    background: var(--accent-2);
    bottom: -10%;
    right: -5%;
    animation-duration: 30s;
    animation-delay: -5s;
  }
  .orb--3 {
    width: 300px;
    height: 300px;
    background: var(--accent-3);
    top: 50%;
    left: 50%;
    animation-duration: 22s;
    animation-delay: -10s;
  }
  @keyframes drift {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(30px, -20px) scale(1.05);
    }
    50% {
      transform: translate(-20px, 30px) scale(0.95);
    }
    75% {
      transform: translate(15px, 15px) scale(1.02);
    }
  }
`;

/** Top bar / header styles. Used by `<taga-header>`. */
export const topbarStyles = css`
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    background: rgba(15, 15, 19, 0.7);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
  }
  .topbar__brand {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--text);
  }
  .topbar__dot {
    color: var(--accent);
  }
  .topbar__nav {
    display: flex;
    gap: 28px;
  }
  .topbar__nav a {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .topbar__nav a:hover,
  .topbar__nav a.active {
    color: var(--text);
  }
  @media (max-width: 768px) {
    .topbar {
      padding: 14px 20px;
    }
    .topbar__nav {
      gap: 18px;
    }
  }
`;

/** Reveal-on-scroll utility used by `<taga-home>`. */
export const revealStyles = css`
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
