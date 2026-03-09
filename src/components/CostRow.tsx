import { useState } from 'react'
import { tokens } from '../tokens'
import { AnimNum } from './AnimNum'
import type { CostNode } from '../types'

const RESOURCE_COLS: { key: keyof CostNode; color: string }[] = [
  { key: 'cpu',     color: tokens.colors.cpu     },
  { key: 'ram',     color: tokens.colors.ram     },
  { key: 'storage', color: tokens.colors.storage },
  { key: 'network', color: tokens.colors.network },
  { key: 'gpu',     color: tokens.colors.gpu     },
]

function efficiencyColor(e: number) {
  if (e < 20) return tokens.colors.effLow
  if (e < 50) return tokens.colors.effMid
  return tokens.colors.effHigh
}

interface Props {
  item:      CostNode
  idx:       number
  active:    boolean
  clickable: boolean
  onClick:   () => void
}

export function CostRow({ item, idx, active, clickable, onClick }: Props) {
  const [hovered, setHovered] = useState(false)
  const ec = efficiencyColor(item.efficiency)

  return (
    <div
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `Drill into ${item.label}` : undefined}
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? (e) => e.key === 'Enter' && onClick() : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:             'grid',
        gridTemplateColumns: '1fr repeat(5, 1fr) 90px 100px',
        gap:                 '4px',
        padding:             '10px 16px',
        borderRadius:        tokens.radius.md,
        background:          hovered && clickable ? tokens.colors.bgHover : 'transparent',
        cursor:              clickable ? 'pointer' : 'default',
        transition:          'background 0.2s, opacity 0.4s, transform 0.4s, border-left-color 0.2s',
        opacity:             active ? 1 : 0,
        transform:           active ? 'translateX(0)' : 'translateX(-14px)',
        transitionDelay:     `${idx * 60 + 200}ms`,
        alignItems:          'center',
        borderLeft:          clickable && hovered
          ? `2px solid ${tokens.colors.accentGreen}`
          : '2px solid transparent',
      }}
    >
      {/* Name */}
      <span style={{ fontFamily: tokens.font.sans, fontWeight: 600, color: tokens.colors.textPrimary, fontSize: '14px' }}>
        {item.label}
        {clickable && (
          <span style={{
            marginLeft: '6px', color: tokens.colors.accentGreen,
            fontSize: '10px', opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
          }}>
            →
          </span>
        )}
      </span>

      {/* Resource columns */}
      {RESOURCE_COLS.map(col => (
        <span key={col.key} style={{
          fontFamily: tokens.font.mono, fontSize: '13px',
          color: col.color, textAlign: 'right',
        }}>
          <AnimNum value={item[col.key] as number} prefix="$" active={active} />
        </span>
      ))}

      {/* Efficiency */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
        <div style={{
          width: '36px', height: '4px',
          background: tokens.colors.bgSurface, borderRadius: '2px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${item.efficiency}%`,
            background:  ec, borderRadius: '2px',
            transition:  'width 0.8s ease',
            transitionDelay: `${idx * 60 + 400}ms`,
          }} />
        </div>
        <span style={{ fontFamily: tokens.font.mono, fontSize: '12px', color: ec }}>
          {item.efficiency}%
        </span>
      </div>

      {/* Total */}
      <span style={{
        fontFamily: tokens.font.mono, fontSize: '14px', fontWeight: 700,
        color: tokens.colors.textPrimary, textAlign: 'right',
      }}>
        <AnimNum value={item.total} prefix="$" active={active} />
      </span>
    </div>
  )
}
