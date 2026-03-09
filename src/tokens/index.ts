export const tokens = {
  colors: {
    // Backgrounds
    bgPrimary:   'var(--color-bg-primary)',
    bgCard:      'var(--color-bg-card)',
    bgSurface:   'var(--color-bg-surface)',
    bgHover:     'var(--color-bg-hover)',

    // Borders
    borderSubtle: 'var(--color-border-subtle)',
    borderAccent: 'var(--color-border-accent)',

    // Brand
    accentGreen:    'var(--color-accent-green)',
    accentGreenDim: 'var(--color-accent-green-dim)',
    accentGreenGlow:'var(--color-accent-green-glow)',

    // Text
    textPrimary:   'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted:     'var(--color-text-muted)',

    // Resource categories
    cpu:     'var(--color-cpu)',
    ram:     'var(--color-ram)',
    storage: 'var(--color-storage)',
    network: 'var(--color-network)',
    gpu:     'var(--color-gpu)',

    // Efficiency states
    effLow:  'var(--color-eff-low)',
    effMid:  'var(--color-eff-mid)',
    effHigh: 'var(--color-eff-high)',
  },

  spacing: {
    xs:  '4px',
    sm:  '8px',
    md:  '16px',
    lg:  '24px',
    xl:  '40px',
    xxl: '64px',
  },

  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
  },

  font: {
    sans: "'DM Sans', 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  shadows: {
    card:    '0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)',
    tooltip: '0 12px 32px rgba(0,0,0,0.6)',
    glow:    '0 0 20px rgba(52,211,153,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
    glowHover: '0 0 30px rgba(52,211,153,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
  },

  effects: {
    shimmerGradient: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
    accentGradient:  'linear-gradient(180deg, var(--color-accent-green) 0%, rgba(52,211,153,0.35) 100%)',
    accentGradientBold: 'linear-gradient(135deg, var(--color-accent-green), rgba(52,211,153,0.7))',
  },
} as const
