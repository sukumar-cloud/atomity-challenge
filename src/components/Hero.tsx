import { tokens } from '../tokens'

export function Hero() {
  return (
    <header style={{
      minHeight:      'clamp(300px, 40vh, 500px)',
      background:     `radial-gradient(ellipse 80% 60% at 50% 0%, ${tokens.colors.accentGreenGlow} 0%, transparent 70%), ${tokens.colors.bgPrimary}`,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        'clamp(60px, 10vw, 100px) 24px 60px',
      textAlign:      'center',
      position:       'relative',
      overflow:       'hidden',
    }}>
      {/* Grid overlay */}
      <div aria-hidden style={{
        position:        'absolute',
        inset:           0,
        opacity:         0.03,
        backgroundImage: `linear-gradient(${tokens.colors.accentGreen} 1px, transparent 1px), linear-gradient(90deg, ${tokens.colors.accentGreen} 1px, transparent 1px)`,
        backgroundSize:  '60px 60px',
        pointerEvents:   'none',
      }} />

      {/* Badge */}
      <div style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '8px',
        background:   tokens.colors.accentGreenDim,
        border:       `1px solid ${tokens.colors.borderAccent}`,
        borderRadius: '999px',
        padding:      '5px 14px',
        marginBottom: '20px',
        animation:    'fadeSlideUp 0.6s ease both',
      }}>
        <div style={{
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   tokens.colors.accentGreen,
          animation:    'pulse-dot 2s ease-in-out infinite',
        }} />
        <span style={{
          fontSize:      '12px',
          color:         tokens.colors.accentGreen,
          fontFamily:    tokens.font.sans,
          fontWeight:    600,
          letterSpacing: '0.06em',
        }}>
          LIVE COST INTELLIGENCE
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily:    tokens.font.sans,
        fontWeight:    700,
        fontSize:      'clamp(2rem, 5vw, 3.5rem)',
        color:         tokens.colors.textPrimary,
        lineHeight:    1.1,
        marginBottom:  '16px',
        letterSpacing: '-0.02em',
        animation:     'fadeSlideUp 0.6s ease 0.1s both',
      }}>
        Drill into every dollar<br />
        <span style={{ color: tokens.colors.accentGreen }}>your cloud spends.</span>
      </h1>

      {/* Subtext */}
      <p style={{
        fontFamily: tokens.font.sans,
        color:      tokens.colors.textSecondary,
        fontSize:   'clamp(0.95rem, 2vw, 1.1rem)',
        maxWidth:   '520px',
        lineHeight: 1.6,
        animation:  'fadeSlideUp 0.6s ease 0.2s both',
      }}>
        Cluster → Namespace → Pod. Instant cost attribution, zero guesswork.
        Scroll down to explore.
      </p>

      {/* Scroll cue */}
      <div aria-hidden style={{ marginTop: '32px', animation: 'bounce 2s infinite' }}>
        <span style={{ color: tokens.colors.textMuted, fontSize: '20px' }}>↓</span>
      </div>
    </header>
  )
}
