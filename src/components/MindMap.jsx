import React from 'react';

// Semplice renderer di mappa concettuale basato su parole chiave e relazioni generiche
// Non richiede backend: crea nodi dalle frasi separate da punto o newline

function extractConcepts(text) {
  if (!text) return [];
  const parts = text
    .split(/[\n\.\!\?]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.map((p, idx) => ({ id: `n${idx}`, label: p }));
}

export default function MindMap({ seedText }) {
  const nodes = React.useMemo(() => extractConcepts(seedText), [seedText]);

  if (!seedText) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
        Scrivi o seleziona una nota per generare la mappa concettuale
      </div>
    );
  }

  // Layout a griglia circolare semplice
  const radius = 120;
  const centerX = 200;
  const centerY = 140;

  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 400 280" className="w-full h-72">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>
        {/* Nodo centrale */}
        <g>
          <circle cx={centerX} cy={centerY} r="38" fill="#2563eb" filter="url(#shadow)" />
          <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#fff">
            Concetto
          </text>
        </g>
        {nodes.map((n, i) => {
          const angle = (i / Math.max(nodes.length, 1)) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          return (
            <g key={n.id}>
              <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="#94a3b8" strokeWidth="1.5" />
              <rect x={x - 50} y={y - 18} width="100" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" filter="url(#shadow)" />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#0f172a">
                {n.label.length > 32 ? n.label.slice(0, 29) + '…' : n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
