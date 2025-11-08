import React, { useState } from 'react';
import { X, Save, Sparkles } from 'lucide-react';

export default function NotesPanel({ selectedDate, notes, onClose, onSave, onGenerateMap }) {
  const [text, setText] = useState('');

  React.useEffect(() => {
    setText('');
  }, [selectedDate]);

  const label = selectedDate?.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-30">
      <div className="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-slate-900 font-semibold">Aggiungi nota</h3>
            <p className="text-sm text-slate-600">{label}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-md" aria-label="Chiudi">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Scrivi qui la tua nota..."
            className="w-full min-h-[120px] p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {notes && notes.length > 0 && (
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <p className="text-sm font-medium text-slate-700 mb-2">Note esistenti</p>
              <ul className="space-y-1 list-disc list-inside text-sm text-slate-700">
                {notes.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => onGenerateMap((text || '').trim())}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700"
          >
            <Sparkles size={16} /> Genera mappa concettuale
          </button>
          <button
            onClick={() => onSave((text || '').trim())}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            <Save size={16} /> Salva nota
          </button>
        </div>
      </div>
    </div>
  );
}
