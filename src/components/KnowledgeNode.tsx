import { Handle, Position } from '@xyflow/react'
import type { NodeProps } from '@xyflow/react'
import { certaintyColor } from '../utils/colors'
import type { KnowledgeNode } from '../types'

export default function KnowledgeNodeComponent({ data, selected }: NodeProps) {
  const node = data as unknown as KnowledgeNode
  const color = certaintyColor(node.certainty)

  const statusBadge = () => {
    if (node.status === 'superado')
      return <span className="text-[10px] font-mono text-red-400 mt-1 block">✕ refutado</span>
    if (node.status === 'en_disputa')
      return <span className="text-[10px] font-mono text-yellow-400 mt-1 block">⚡ en disputa</span>
    if (node.status === 'sin_verificar')
      return <span className="text-[10px] font-mono text-slate-400 mt-1 block">? sin verificar</span>
    return null
  }

  return (
    <div
      style={{
        background: selected ? `${color}18` : '#0d0d20',
        border: `1.5px solid ${selected ? color : color + '55'}`,
        borderRadius: '8px',
        padding: '8px 12px',
        minWidth: '130px',
        maxWidth: '190px',
        boxShadow: selected
          ? `0 0 18px ${color}55, 0 0 6px ${color}33`
          : `0 0 6px ${color}22`,
        transition: 'all 0.15s ease',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: color, border: 'none', width: 6, height: 6 }}
      />

      {/* Certainty bar */}
      <div className="flex gap-[2px] mb-[5px]">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            style={{
              width: 10,
              height: 3,
              borderRadius: 2,
              background: i <= node.certainty ? color : '#1e1e3a',
            }}
          />
        ))}
      </div>

      <div className="text-[12px] font-medium text-slate-100 leading-snug">
        {node.title}
      </div>

      {statusBadge()}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: color, border: 'none', width: 6, height: 6 }}
      />
    </div>
  )
}
