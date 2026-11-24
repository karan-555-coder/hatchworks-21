// Variant: Cyber Hazard (black, cyber yellow, hazard red, cyan).
//
// A dark identity: every original surface, light or dark, lands on a navy step, and text
// lands on mist. Accent fills become violet; the orange call-to-action fills become aqua with
// navy text. Surface-aware custom properties (--cy-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  void: '#050505', navy: '#0a0a0a', navy2: '#121212', navy3: '#191919', navy4: '#232323',
  indigo: '#3a0010', indigoDeep: '#1a0006', indigoPale: '#161616',
  violet: '#ff003c', violetHi: '#ff4d6d', lilac: '#00f0ff',
  aqua: '#fcee0a', aquaPale: '#fff79a',
  mist: '#f2f2f2', mist2: '#cfcfcf', muted: '#8f8f8f',
};
const P = PALETTE;

const BASE = [
  `--cy-accent:${P.aqua}`, `--cy-accent2:${P.aquaPale}`, `--cy-white:${P.mist}`, `--cy-fg:${P.mist}`,
  `--cy-fg2:${P.mist2}`, `--cy-muted:${P.muted}`, `--cy-deep:${P.lilac}`, `--cy-hot:${P.violetHi}`,
  '--cy-line:rgba(242, 242, 242,.14)', '--cy-line2:rgba(242, 242, 242,.3)', `--cy-glow:${P.violet}`,
].join(';');

// text-like entry: the surface variable when opaque, and the same variable at the token's
// opacity (color-mix) when translucent, so ink follows the surface it lands on
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });

export default {
  name: 'cyber',
  dist: 'dist',
  port: 4321,
  prefix: '--cy-',
  styles: ['/styles/cyber.css'],
  scripts: ['/scripts/cyber.js'],

  ctx: {
    dark: BASE,
    light: BASE,
    // violet / indigo fills
    accent: [`--cy-accent:#ffffff`, `--cy-accent2:#ffffff`, `--cy-white:#ffffff`, `--cy-fg:#ffffff`, `--cy-fg2:#f5f5f5`,
      `--cy-muted:#e5e5e5`, `--cy-deep:#ffffff`, `--cy-hot:#ffffff`, '--cy-line:rgba(255,255,255,.3)',
      '--cy-line2:rgba(255,255,255,.5)', `--cy-glow:${P.violet}`].join(';'),
    // aqua fills (were orange call-to-actions): navy ink on top
    orange: [`--cy-accent:${P.navy}`, `--cy-accent2:${P.navy}`, `--cy-white:${P.navy}`, `--cy-fg:${P.navy}`, `--cy-fg2:${P.navy}`,
      '--cy-muted:rgba(10, 10, 10,.72)', `--cy-deep:${P.navy}`, `--cy-hot:${P.navy}`, '--cy-line:rgba(10, 10, 10,.25)',
      '--cy-line2:rgba(10, 10, 10,.45)', `--cy-glow:${P.aqua}`].join(';'),
  },
  whiteTextCtx: '',
  lineVar: 'var(--cy-line,rgba(242, 242, 242,.14))',
  // custom properties are mapped by what they paint where they are read (see collectUses)
  varRoles: true,
  // off-palette pale tints (creams, blush, pastel washes) are light surfaces too: on a dark skin
  // they must land on navy like the rest
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.navy, paper: P.navy2, silver: P.navy3, grey: P.navy4, ink: P.void, ink2: '#0e0e0e',
      teal: P.violet, blue: P.violet, mint: P.indigo, mintPale: P.indigoPale, deep: P.indigoDeep, orange: P.aqua },
    grad: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#0e0e0e',
      teal: P.violet, mint: '#5a0016', mintPale: P.navy2, deep: '#2a000a', blue: P.violet, orange: P.aqua },
    // gradients clipped to text (background-clip: text): light, glowing stops
    gradText: { white: P.mist, paper: P.mist2, silver: P.muted, grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violetHi, mint: P.aquaPale, mintPale: P.aquaPale, deep: P.lilac, orange: P.violetHi },
    text: {
      white: t('--cy-white', P.mist), paper: t('--cy-white', P.mist),
      silver: t('--cy-muted', '#b0b0b0', P.mist), grey: t('--cy-muted', P.muted, P.mist),
      ink: t('--cy-fg', P.mist), ink2: t('--cy-fg2', P.mist2, P.mist),
      teal: t('--cy-accent', P.aqua), blue: t('--cy-accent', P.aqua),
      mint: t('--cy-accent2', P.aquaPale, P.aqua), mintPale: t('--cy-accent2', P.aquaPale, P.aqua),
      deep: t('--cy-deep', P.lilac), orange: t('--cy-hot', P.violetHi, P.violet),
    },
    border: {
      white: { solid: 'rgba(242, 242, 242,.55)', alpha: P.mist },
      paper: { solid: 'var(--cy-line,rgba(242, 242, 242,.14))', alpha: null },
      silver: { solid: 'var(--cy-line,rgba(242, 242, 242,.14))', alpha: null },
      mintPale: { solid: 'var(--cy-line,rgba(242, 242, 242,.14))', alpha: null },
      grey: { solid: 'rgba(242, 242, 242,.22)', alpha: P.mist },
      ink: { solid: 'var(--cy-line2,rgba(242, 242, 242,.3))', alpha: P.mist },
      ink2: { solid: 'var(--cy-line2,rgba(242, 242, 242,.3))', alpha: P.mist },
      teal: t('--cy-accent', P.aqua), mint: t('--cy-accent', P.aqua), blue: t('--cy-accent', P.aqua),
      deep: P.violet, orange: P.aqua,
    },
    svg: { white: P.mist, paper: P.navy3, silver: '#3a4378', grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violet, mint: P.aquaPale, mintPale: P.navy3, deep: P.lilac, orange: P.aqua },
    // fallback for custom properties read both as text and as a surface (or never read):
    // neutrals act as surfaces, saturated colours as accents that must stay readable on navy
    var: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#0e0e0e',
      teal: { solid: `var(--cy-accent,${P.aqua})`, alpha: P.violet }, blue: { solid: `var(--cy-accent,${P.aqua})`, alpha: P.violet },
      mint: P.aquaPale, mintPale: P.indigoPale, deep: P.aqua, orange: P.violetHi },
    canvas: { white: P.mist, ink: P.navy, ink2: P.navy2, teal: P.aqua, mint: P.aquaPale, mintPale: P.indigoPale,
      deep: P.violet, blue: P.violet, orange: P.aqua },
  },
};
