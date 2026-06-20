const LEGEND = [
  { color: '#22c55e', label: 'Ley establecida (5)' },
  { color: '#06b6d4', label: 'Consenso sólido (4)' },
  { color: '#eab308', label: 'Consenso frágil (3)' },
  { color: '#f97316', label: 'Especulación (2)' },
  { color: '#ef4444', label: 'Mito / Refutado (1)' },
]

const EDGE_LEGEND = [
  { color: '#22c55e', label: 'apoya' },
  { color: '#ef4444', label: 'contradice' },
  { color: '#6366f1', label: 'depende de' },
  { color: '#eab308', label: 'emergió de' },
]

export default function Header() {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-5 py-3 z-10"
      style={{
        background: 'rgba(5,5,16,0.95)',
        borderBottom: '1px solid #1e1e3a',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Title */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-base font-semibold tracking-widest text-slate-100 font-mono">
            UMBRALES
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider">
            Cartografía del conocimiento · Neurociencia de la memoria
          </p>
        </div>
      </div>

      {/* Legends */}
      <div className="hidden md:flex items-center gap-6">
        {/* Node certainty */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-600 mr-1">CERTEZA</span>
          {LEGEND.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1" title={label}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: color,
                  boxShadow: `0 0 5px ${color}88`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="w-px h-4" style={{ background: '#1e1e3a' }} />

        {/* Edge types */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-600 mr-1">RELACIONES</span>
          {EDGE_LEGEND.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1" title={label}>
              <div
                style={{
                  width: 18,
                  height: 2,
                  background: color,
                  borderRadius: 1,
                  opacity: 0.8,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hint + link público */}
      <div className="hidden lg:flex items-center gap-3">
        <p className="text-[10px] font-mono text-slate-600">
          clic en un nodo para explorar
        </p>
        <div className="w-px h-4" style={{ background: '#1e1e3a' }} />
        <a
          href="https://impulsotech24-umbrales.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono tracking-wide transition-colors"
          style={{ color: '#6366f1' }}
        >
          impulsotech24-umbrales.vercel.app
        </a>
      </div>
    </div>
  )
}
