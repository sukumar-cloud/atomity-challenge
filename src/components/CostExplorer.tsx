import { useState, useCallback } from 'react'
import { tokens } from '../tokens'
import { useInView } from '../hooks/useInView'
import { BarChart } from './BarChart'
import { Breadcrumb } from './Breadcrumb'
import { CostRow } from './CostRow'
import { StatCard } from './StatCard'
import type { Cluster, CostNode, BreadcrumbItem, DrillLevel } from '../types'

const HEADERS = ['Name', 'CPU', 'RAM', 'Storage', 'Network', 'GPU', 'Efficiency', 'Total']
const HEADER_COLORS = [
  null,
  tokens.colors.cpu,
  tokens.colors.ram,
  tokens.colors.storage,
  tokens.colors.network,
  tokens.colors.gpu,
  null,
  null,
]

function TableHeader() {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: '1fr repeat(5, 1fr) 90px 100px',
      gap:                 '4px',
      padding:             '8px 16px 12px',
      borderBottom:        `1px solid ${tokens.colors.borderSubtle}`,
      marginBottom:        '4px',
    }}>
      {HEADERS.map((h, i) => (
        <span key={h} style={{
          fontSize:      '11px',
          fontFamily:    tokens.font.sans,
          fontWeight:    600,
          color:         HEADER_COLORS[i] ?? tokens.colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          textAlign:     i > 0 ? 'right' : 'left',
        }}>
          {h}
        </span>
      ))}
    </div>
  )
}

function LegendPill({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color }} />
      <span style={{ fontSize: '11px', color: tokens.colors.textMuted, fontFamily: tokens.font.sans }}>{label}</span>
    </div>
  )
}

function effColor(e: number) {
  if (e < 20) return tokens.colors.effLow
  if (e < 50) return tokens.colors.effMid
  return tokens.colors.effHigh
}

interface Props { clusters: Cluster[] }

export function CostExplorer({ clusters }: Props) {
  const [sectionRef, inView] = useInView(0.1)
  const [path, setPath]       = useState<number[]>([])
  const [animKey, setAnimKey] = useState(0)

  const triggerAnim = useCallback(() => setAnimKey(k => k + 1), [])
  let items: CostNode[]   = clusters
  let level: DrillLevel   = 'cluster'
  const crumbs: BreadcrumbItem[] = [{ label: 'All Clusters', depth: -1 }]

  if (path.length >= 1) {
    const cluster = clusters[path[0]]
    crumbs.push({ label: cluster.label, depth: 0 })
    items = cluster.namespaces
    level = 'namespace'
  }
  if (path.length >= 2) {
    const ns = (clusters[path[0]]).namespaces[path[1]]
    crumbs.push({ label: ns.label, depth: 1 })
    items = ns.pods
    level = 'pod'
  }

  const isClickable = (idx: number): boolean => {
    if (level === 'cluster') return clusters[idx].namespaces.length > 0
    if (level === 'namespace') return !!clusters[path[0]].namespaces[idx]
    return false
  }

  const handleRowClick = (idx: number) => {
    if (level === 'cluster' && clusters[idx].namespaces.length > 0) {
      setPath([idx]); triggerAnim()
    } else if (level === 'namespace' && clusters[path[0]].namespaces[idx]) {
      setPath([path[0], idx]); triggerAnim()
    }
  }

  const handleNav = (depth: number) => {
    if (depth === -1) { setPath([]); triggerAnim() }
    else if (depth === 0) { setPath([path[0]]); triggerAnim() }
  }

  const totalSpend    = items.reduce((s, i) => s + i.total, 0)
  const avgEfficiency = items.length
    ? Math.round(items.reduce((s, i) => s + i.efficiency, 0) / items.length)
    : 0
  const topItem = items.reduce<CostNode | null>((a, b) => (!a || b.total > a.total ? b : a), null)
  const levelLabel = level === 'cluster' ? 'Clusters' : level === 'namespace' ? 'Namespaces' : 'Pods'

  return (
    <section
      ref={sectionRef}
      aria-label="Cloud Cost Explorer"
      style={{ padding: '0 clamp(16px, 5vw, 60px) 120px', maxWidth: '1100px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{
          background:   tokens.colors.bgSurface,
          border:       `1px solid ${tokens.colors.borderSubtle}`,
          borderRadius: tokens.radius.sm,
          padding:      '6px 14px',
          fontSize:     '13px',
          fontFamily:   tokens.font.sans,
          color:        tokens.colors.textSecondary,
          fontWeight:   500,
        }}>
          Last 30 Days
        </div>
        <Breadcrumb crumbs={crumbs} onNav={handleNav} />
      </div>

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap:                 '12px',
        marginBottom:        '24px',
      }}>
        <StatCard label="Total Spend"  value={totalSpend}    color={tokens.colors.accentGreen} active={inView} delay="0ms"   />
        <StatCard label={`Top ${levelLabel.slice(0, -1)}`} value={topItem?.total ?? 0}    color={tokens.colors.cpu}         active={inView} delay="80ms"  />
        <StatCard label="Avg Efficiency" value={avgEfficiency} color={effColor(avgEfficiency)} active={inView} delay="160ms" prefix="" suffix="%" />
      </div>

      <div style={{
        background:   tokens.colors.bgCard,
        border:       `1px solid ${tokens.colors.borderSubtle}`,
        borderRadius: tokens.radius.xl,
        overflow:     'visible',
        opacity:      inView ? 1 : 0,
        transform:    inView ? 'translateY(0)' : 'translateY(24px)',
        transition:   'opacity 0.6s ease, transform 0.6s ease',
        boxShadow:    tokens.shadows.card,
      }}>
        <div style={{
          padding:    '32px 32px 20px',
          borderBottom: `1px solid ${tokens.colors.borderSubtle}`,
          background: `linear-gradient(180deg, ${tokens.colors.accentGreenGlow} 0%, transparent 100%)`,
          overflow:   'visible',
        }}>
          {items.length > 0
            ? <BarChart key={animKey} items={items} active={inView} />
            : (
              <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: tokens.colors.textMuted, fontFamily: tokens.font.sans, fontSize: '14px' }}>
                  No nested data available
                </span>
              </div>
            )
          }
        </div>

        <div style={{
          padding:      '12px 32px',
          display:      'flex',
          gap:          '16px',
          flexWrap:     'wrap',
          borderBottom: `1px solid ${tokens.colors.borderSubtle}`,
        }}>
          <LegendPill color={tokens.colors.cpu}     label="CPU"     />
          <LegendPill color={tokens.colors.ram}     label="RAM"     />
          <LegendPill color={tokens.colors.storage} label="Storage" />
          <LegendPill color={tokens.colors.network} label="Network" />
          <LegendPill color={tokens.colors.gpu}     label="GPU"     />
        </div>

        <div style={{ padding: '16px 16px 24px' }}>
          <TableHeader />
          {items.length > 0
            ? items.map((item, idx) => (
              <CostRow
                key={`${animKey}-${item.id}`}
                item={item}
                idx={idx}
                active={inView}
                clickable={isClickable(idx)}
                onClick={() => handleRowClick(idx)}
              />
            ))
            : (
              <div style={{ padding: '40px', textAlign: 'center', color: tokens.colors.textMuted, fontFamily: tokens.font.sans }}>
                {level === 'cluster' ? 'Select a cluster to drill down' : 'No pods in this namespace'}
              </div>
            )
          }
        </div>

        {level !== 'pod' && items.some((_, i) => isClickable(i)) && (
          <div style={{
            padding:     '12px 32px',
            background:  tokens.colors.accentGreenGlow,
            borderTop:   `1px solid ${tokens.colors.borderSubtle}`,
            display:     'flex',
            alignItems:  'center',
            gap:         '6px',
          }}>
            <span style={{ color: tokens.colors.accentGreen, fontSize: '11px' }}>→</span>
            <span style={{ fontSize: '12px', color: tokens.colors.textMuted, fontFamily: tokens.font.sans }}>
              Click a row to drill into {level === 'cluster' ? 'namespaces' : 'pods'}
            </span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: tokens.colors.textMuted, fontFamily: tokens.font.sans }}>
          Aggregated by:
        </span>
        <span style={{
          fontSize:     '12px',
          fontFamily:   tokens.font.sans,
          fontWeight:   600,
          color:        tokens.colors.accentGreen,
          background:   tokens.colors.accentGreenDim,
          border:       `1px solid ${tokens.colors.borderAccent}`,
          borderRadius: tokens.radius.sm,
          padding:      '2px 10px',
        }}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </div>
    </section>
  )
}
