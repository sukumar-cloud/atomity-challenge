import { tokens } from '../tokens'

interface Props {
  isDark:  boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        position:     'fixed',
        top:          '20px',
        right:        '20px',
        zIndex:       1000,
        width:        '44px',
        height:       '44px',
        borderRadius: tokens.radius.md,
        background:   tokens.colors.bgCard,
        border:       `1px solid ${tokens.colors.borderSubtle}`,
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        cursor:       'pointer',
        transition:   'background 0.2s, border-color 0.2s, transform 0.15s',
        fontSize:     '18px',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
