import { tokens } from '../tokens'

export function LoadingState() {
  return (
    <div style={{
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '16px',
      padding:        '80px 24px',
      color:          tokens.colors.textMuted,
      fontFamily:     tokens.font.sans,
    }}>
      <div style={{
        width:        '36px',
        height:       '36px',
        borderRadius: '50%',
        border:       `3px solid ${tokens.colors.borderSubtle}`,
        borderTopColor: tokens.colors.accentGreen,
        animation:    'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ fontSize: '14px' }}>Fetching cost data…</span>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div style={{
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '12px',
      padding:        '80px 24px',
      textAlign:      'center',
    }}>
      <span style={{ fontSize: '32px' }}>⚠️</span>
      <p style={{ color: tokens.colors.effLow, fontFamily: tokens.font.sans, fontSize: '14px' }}>
        {message}
      </p>
      <p style={{ color: tokens.colors.textMuted, fontFamily: tokens.font.sans, fontSize: '13px' }}>
        Showing static fallback data.
      </p>
    </div>
  )
}
