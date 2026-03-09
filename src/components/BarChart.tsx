import { useState, useRef } from 'react'
import { tokens } from '../tokens'
import type { CostNode } from '../types'

interface Props {
  items:  CostNode[]
  active: boolean
}

export function BarChart({ items, active }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const max = Math.max(...items.map(i => i.total), 1)
  const hoveredItem = hovered ? items.find(i => i.id === hovered) : null

  const handleMouseEnter = (_e: React.MouseEvent, itemId: string) => {
    setHovered(itemId)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setTooltipPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 20,
      })
    }
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <div
        role="img"
        aria-label="Cost comparison bar chart"
        style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '140px', padding: '0 8px' }}
      >
        {items.map((item, idx) => {
          const pct = (item.total / max) * 100
          const isHovered = hovered === item.id
          return (
            <div
              key={item.id}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              onMouseEnter={(e) => handleMouseEnter(e, item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ width: '100%', height: '110px', display: 'flex', alignItems: 'flex-end' }}>
                <div
                  style={{
                    width:        '100%',
                    height:       active ? `${pct}%` : '0%',
                    background:   tokens.effects.accentGradient,
                    borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 2px 2px`,
                    transition:   `height 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s`,
                    transitionDelay: `${idx * 80}ms`,
                    boxShadow:    isHovered ? tokens.shadows.glowHover : active ? tokens.shadows.glow : 'none',
                    position:     'relative',
                    overflow:     'hidden',
                    opacity:      hovered && !isHovered ? 0.5 : 1,
                  }}
                >
                  <div style={{
                    position:   'absolute',
                    inset:      0,
                    background: tokens.effects.shimmerGradient,
                  }} />
                </div>
              </div>
              <span style={{
                fontSize:   '11px',
                color:      tokens.colors.textSecondary,
                fontFamily: tokens.font.sans,
                textAlign:  'center',
                lineHeight: 1.2,
              }}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {hoveredItem && (
        <div style={{
          position:     'fixed',
          left:         `${tooltipPos.x}px`,
          top:          `${tooltipPos.y}px`,
          transform:    'translate(-50%, -100%)',
          background:   tokens.colors.bgSurface,
          border:       `1px solid ${tokens.colors.borderSubtle}`,
          borderRadius: tokens.radius.md,
          padding:      '12px 16px',
          zIndex:       10001,
          minWidth:     '240px',
          boxShadow:    tokens.shadows.tooltip,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize:     '12px',
            fontWeight:   700,
            color:        tokens.colors.accentGreen,
            marginBottom: '8px',
            fontFamily:   tokens.font.sans,
          }}>
            {hoveredItem.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '11px', fontFamily: tokens.font.mono }}>
              <span style={{ color: tokens.colors.textMuted }}>CPU:</span>
              <span style={{ color: tokens.colors.cpu, fontWeight: 600 }}>${hoveredItem.cpu}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '11px', fontFamily: tokens.font.mono }}>
              <span style={{ color: tokens.colors.textMuted }}>RAM:</span>
              <span style={{ color: tokens.colors.ram, fontWeight: 600 }}>${hoveredItem.ram}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '11px', fontFamily: tokens.font.mono }}>
              <span style={{ color: tokens.colors.textMuted }}>Storage:</span>
              <span style={{ color: tokens.colors.storage, fontWeight: 600 }}>${hoveredItem.storage}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '11px', fontFamily: tokens.font.mono }}>
              <span style={{ color: tokens.colors.textMuted }}>Network:</span>
              <span style={{ color: tokens.colors.network, fontWeight: 600 }}>${hoveredItem.network}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '11px', fontFamily: tokens.font.mono }}>
              <span style={{ color: tokens.colors.textMuted }}>GPU:</span>
              <span style={{ color: tokens.colors.gpu, fontWeight: 600 }}>${hoveredItem.gpu}</span>
            </div>
            <div style={{
              borderTop:   `1px solid ${tokens.colors.borderSubtle}`,
              marginTop:   '6px',
              paddingTop:  '6px',
              display:     'flex',
              justifyContent: 'space-between',
              gap:         '16px',
              fontSize:    '11px',
              fontFamily:  tokens.font.mono,
            }}>
              <span style={{ color: tokens.colors.textMuted }}>Efficiency:</span>
              <span style={{ color: tokens.colors.effHigh, fontWeight: 600 }}>{hoveredItem.efficiency}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '11px', fontFamily: tokens.font.mono, fontWeight: 700, color: tokens.colors.accentGreen }}>
              <span>Total:</span>
              <span>${hoveredItem.total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
