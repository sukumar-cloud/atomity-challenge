// src/components/Breadcrumb.tsx

import { tokens } from '../tokens'
import type { BreadcrumbItem } from '../types'

interface Props {
  crumbs: BreadcrumbItem[]
  onNav:  (depth: number) => void
}

export function Breadcrumb({ crumbs, onNav }: Props) {
  return (
    <nav aria-label="drill-down navigation" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      {crumbs.map((c, i) => {
        const isActive = i === crumbs.length - 1
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => !isActive && onNav(c.depth)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                background:    isActive ? tokens.effects.accentGradientBold : tokens.colors.bgSurface,
                color:         isActive ? tokens.colors.bgPrimary : tokens.colors.textSecondary,
                border:        `1px solid ${isActive ? 'transparent' : tokens.colors.borderSubtle}`,
                borderRadius:  tokens.radius.sm,
                padding:       '5px 14px',
                fontFamily:    tokens.font.sans,
                fontWeight:    isActive ? 700 : 500,
                fontSize:      '13px',
                cursor:        isActive ? 'default' : 'pointer',
                transition:    'all 0.2s',
                whiteSpace:    'nowrap',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = tokens.colors.bgHover }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = tokens.colors.bgSurface }}
            >
              {c.label}
            </button>
            {!isActive && (
              <span aria-hidden style={{ color: tokens.colors.textMuted, fontSize: '12px' }}>›</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
