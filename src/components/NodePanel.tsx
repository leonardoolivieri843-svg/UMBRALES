import type { KnowledgeNode } from '../types'
import {
  certaintyColor,
  certaintyLabel,
  statusColor,
  statusLabel,
} from '../utils/colors'
import { knowledgeEdges, knowledgeNodes } from '../data/knowledge'
import { edgeLabel } from '../utils/colors'

interface Props {
  node: KnowledgeNode
  onClose: () => void
}

export default function NodePanel({ node, onClose }: Props) {
  const color = certaintyColor(node.certainty)

  // Related nodes
  const related = knowledgeEdges
    .filter(e => e.source === node.id || e.target === node.id)
    .map(e => {
      const otherId = e.source === node.id ? e.target : e.source
      const other = knowledgeNodes.find(n => n.id === otherId)
      const direction = e.source === node.id ? 'out' : 'in'
      return other ? { node: other, edgeType: e.edgeType, direction } : null
    })
    .filter(Boolean) as { node: KnowledgeNode; edgeType: string; direction: string }[]

  return (
    <div
      className="absolute top-0 right-0 h-full w-80 flex flex-col overflow-hidden"
      style={{
        background: '#08081a',
        borderLeft: `1px solid ${color}33`,
        boxShadow: `-8px 0 32px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4 flex-shrink-0"
        style={{ borderBottom: `1px solid #1e1e3a` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Certainty dots */}
            <div className="flex gap-[3px] mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  style={{
                    width: 12,
                    height: 4,
                    borderRadius: 2,
                    background: i <= node.certainty ? color : '#1e1e3a',
                  }}
                />
              ))}
            </div>
            <h2 className="text-base font-semibold text-slate-100 leading-tight">
              {node.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors mt-0.5 flex-shrink-0 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className="text-[11px] font-mono px-2 py-0.5 rounded"
            style={{ background: `${color}22`, color }}
          >
            {certaintyLabel(node.certainty)}
          </span>
          <span
            className="text-[11px] font-mono px-2 py-0.5 rounded"
            style={{
              background: `${statusColor(node.status)}22`,
              color: statusColor(node.status),
            }}
          >
            {statusLabel(node.status)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Description */}
        <p className="text-[13px] text-slate-300 leading-relaxed">
          {node.description}
        </p>

        {/* Meta */}
        <div
          className="text-[11px] font-mono space-y-1 p-3 rounded"
          style={{ background: '#0f0f22', border: '1px solid #1e1e3a' }}
        >
          <div className="flex justify-between">
            <span className="text-slate-500">Dominio</span>
            <span className="text-slate-300">{node.domain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Última verificación</span>
            <span
              style={{
                color: parseInt(node.lastVerified) < 2010 ? '#f97316' : '#94a3b8',
              }}
            >
              {node.lastVerified}
              {parseInt(node.lastVerified) < 2010 && ' ⚠'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Certeza</span>
            <span style={{ color }}>{node.certainty} / 5</span>
          </div>
        </div>

        {/* Sources */}
        {node.sources.length > 0 && (
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
              Fuentes
            </div>
            <ul className="space-y-1">
              {node.sources.map((s, i) => (
                <li key={i} className="text-[12px] text-slate-400 font-mono">
                  · {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related nodes */}
        {related.length > 0 && (
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
              Nodos relacionados
            </div>
            <div className="space-y-2">
              {related.map(({ node: other, edgeType, direction }, i) => {
                const otherColor = certaintyColor(other.certainty)
                const label = edgeLabel(edgeType as never)
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[12px] p-2 rounded"
                    style={{ background: '#0f0f22', border: '1px solid #1e1e3a' }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: otherColor,
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-slate-300 flex-1 leading-snug">
                      {other.title}
                    </span>
                    <span
                      className="text-[10px] font-mono"
                      style={{
                        color:
                          edgeType === 'apoya'
                            ? '#22c55e'
                            : edgeType === 'contradice'
                            ? '#ef4444'
                            : edgeType === 'depende_de'
                            ? '#6366f1'
                            : '#eab308',
                      }}
                    >
                      {direction === 'out' ? '→' : '←'} {label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
