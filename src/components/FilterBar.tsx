import type { FilterState, CertaintyLevel, NodeStatus } from '../types'
import { certaintyColor, certaintyLabel, statusColor } from '../utils/colors'

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
  totalNodes: number
  visibleNodes: number
}

const ALL_CERTAINTY: CertaintyLevel[] = [5, 4, 3, 2, 1]
const ALL_STATUSES: NodeStatus[] = ['activo', 'en_disputa', 'superado', 'sin_verificar']

export default function FilterBar({ filters, onChange, totalNodes, visibleNodes }: Props) {
  const toggleCertainty = (level: CertaintyLevel) => {
    const has = filters.certainty.includes(level)
    onChange({
      ...filters,
      certainty: has
        ? filters.certainty.filter(c => c !== level)
        : [...filters.certainty, level],
    })
  }

  const toggleStatus = (status: NodeStatus) => {
    const has = filters.statuses.includes(status)
    onChange({
      ...filters,
      statuses: has
        ? filters.statuses.filter(s => s !== status)
        : [...filters.statuses, status],
    })
  }

  const resetAll = () =>
    onChange({ certainty: [5, 4, 3, 2, 1], statuses: [], domains: [] })

  return (
    <div
      className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2.5 rounded-xl"
      style={{
        background: 'rgba(8,8,26,0.92)',
        border: '1px solid #1e1e3a',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '90vw',
      }}
    >
      {/* Certainty filters */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono text-slate-500 mr-1">CERTEZA</span>
        {ALL_CERTAINTY.map(level => {
          const active = filters.certainty.includes(level)
          const color = certaintyColor(level)
          return (
            <button
              key={level}
              onClick={() => toggleCertainty(level)}
              title={certaintyLabel(level)}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono transition-all"
              style={{
                background: active ? `${color}22` : 'transparent',
                border: `1px solid ${active ? color : '#2a2a40'}`,
                color: active ? color : '#4a4a6a',
              }}
            >
              {level}
            </button>
          )
        })}
      </div>

      <div className="w-px h-4" style={{ background: '#1e1e3a' }} />

      {/* Status filters */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono text-slate-500 mr-1">ESTADO</span>
        {ALL_STATUSES.map(status => {
          const active =
            filters.statuses.length === 0 || filters.statuses.includes(status)
          const color = statusColor(status)
          const label =
            status === 'activo' ? 'Activo' :
            status === 'en_disputa' ? 'Disputa' :
            status === 'superado' ? 'Refutado' : 'Sin verificar'
          return (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono transition-all"
              style={{
                background: active ? `${color}22` : 'transparent',
                border: `1px solid ${active ? color : '#2a2a40'}`,
                color: active ? color : '#4a4a6a',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="w-px h-4" style={{ background: '#1e1e3a' }} />

      {/* Count + reset */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-slate-500">
          {visibleNodes}/{totalNodes} nodos
        </span>
        <button
          onClick={resetAll}
          className="text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-colors px-1"
        >
          reset
        </button>
      </div>
    </div>
  )
}
