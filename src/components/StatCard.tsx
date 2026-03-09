import { tokens } from '../tokens'
import { AnimNum } from './AnimNum'

interface Props {
  label:  string
  value:  number
  color?: string
  active: boolean
  delay:  string
  prefix?: string
  suffix?: string
}

export function StatCard({ label, value, color, active, delay, prefix = '$', suffix = '' }: Props) {
  return (
    <div
      style={{
        background:    tokens.colors.bgSurface,
        border:        `1px solid ${tokens.colors.borderSubtle}`,
        borderRadius:  tokens.radius.md,
        padding:       '14px 18px',
        opacity:       active ? 1 : 0,
        transform:     active ? 'translateY(0)' : 'translateY(10px)',
        transition:    `opacity 0.4s ease, transform 0.4s ease`,
        transitionDelay: delay,
        containerType: 'inline-size',
      }}
    >
      <div style={{
        fontSize:      '11px',
        color:         tokens.colors.textMuted,
        fontFamily:    tokens.font.sans,
        marginBottom:  '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight:    600,
      }}>
        {label}
      </div>
      <div style={{
        fontSize:   'clamp(16px, 4cqi, 22px)',
        fontFamily: tokens.font.mono,
        fontWeight: 700,
        color:      color ?? tokens.colors.textPrimary,
      }}>
        <AnimNum value={value} prefix={prefix} suffix={suffix} active={active} />
      </div>
    </div>
  )
}
