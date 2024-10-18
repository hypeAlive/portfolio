export enum EffectColor {
  PRIMARY = 'primary',
  PRIMARY_CONTENT = 'primary-content',
  SECONDARY = 'secondary',
  SECONDARY_CONTENT = 'secondary-content',
  ACCENT = 'accent',
  ACCENT_CONTENT = 'accent-content',
  MY_ACCENT = 'my-accent',
  MY_SECONDARY = 'my-secondary',
}

export function getVarFromEffectColor(color: EffectColor): string {
  const parts = color.split('-');
  const code = parts.map((part) => part.charAt(0)).join('');
  if(code.startsWith('m')) return `var(--${code})`;

  return  `oklch(var(--${code}))`;
}
