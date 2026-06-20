import { useMemo, useState } from 'react'
import type { KnowledgeNode } from '../types'
import { certaintyColor } from '../utils/colors'

interface Props {
  nodes: KnowledgeNode[]
  onSelect: (node: KnowledgeNode) => void
}

export default function SearchBar({ nodes, onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return nodes
      .filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.cluster.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, nodes])

  const handleSelect = (node: KnowledgeNode) => {
    onSelect(node)
    setQuery(node.title)
    setOpen(false)
  }

  return (
    <div className="absolute top-4 left-4 z-20" style={{ width: 260 }}>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder="Buscar nodo..."
        className="w-full px-3 py-2 rounded-lg text-[12px] font-mono outline-none placeholder:text-slate-600"
        style={{
          background: 'rgba(8,8,26,0.92)',
          border: '1px solid #1e1e3a',
          color: '#cbd5e1',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        }}
      />

      {open && query.trim().length >= 2 && (
        <div
          className="mt-1.5 rounded-lg overflow-hidden"
          style={{
            background: 'rgba(8,8,26,0.97)',
            border: '1px solid #1e1e3a',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}
        >
          {results.length > 0 ? (
            results.map(node => (
              <button
                key={node.id}
                onMouseDown={e => e.preventDefault()}
                onClick={() => handleSelect(node)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-[11px] font-mono transition-colors hover:bg-white/5"
                style={{ color: '#cbd5e1' }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: certaintyColor(node.certainty),
                    boxShadow: `0 0 4px ${certaintyColor(node.certainty)}88`,
                    flexShrink: 0,
                  }}
                />
                <span className="truncate">{node.title}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-[11px] font-mono text-slate-500">
              sin resultados
            </div>
          )}
        </div>
      )}
    </div>
  )
}
