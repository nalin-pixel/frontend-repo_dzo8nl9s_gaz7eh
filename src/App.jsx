import React from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import NotesPanel from './components/NotesPanel';
import MindMap from './components/MindMap';

function formatKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function App() {
  const [current, setCurrent] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [notesByDate, setNotesByDate] = React.useState(() => {
    try {
      const raw = localStorage.getItem('notesByDate');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [mapSeed, setMapSeed] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('notesByDate', JSON.stringify(notesByDate));
  }, [notesByDate]);

  const monthLabel = current.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

  function handlePrev() {
    const d = new Date(current);
    d.setMonth(d.getMonth() - 1);
    setCurrent(d);
  }
  function handleNext() {
    const d = new Date(current);
    d.setMonth(d.getMonth() + 1);
    setCurrent(d);
  }

  function handleSelectDay(date) {
    setSelectedDate(date);
  }

  function handleSaveNote(text) {
    if (!selectedDate) return;
    if (!text) return setSelectedDate(null);
    const key = formatKey(selectedDate);
    setNotesByDate((prev) => {
      const next = { ...prev };
      next[key] = [...(next[key] || []), text];
      return next;
    });
    setMapSeed(text);
    setSelectedDate(null);
  }

  function handleGenerateMap(text) {
    const useText = text || (selectedDate ? (notesByDate[formatKey(selectedDate)] || []).join('. ') : '');
    setMapSeed(useText);
    setSelectedDate(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-slate-900">
      <Header monthLabel={monthLabel} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Calendar
            currentDate={current}
            notesByDate={notesByDate}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelectDay={handleSelectDay}
          />

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-slate-900 font-semibold mb-2">Mappa concettuale</h3>
            <p className="text-sm text-slate-600 mb-3">Generata automaticamente dal testo delle tue note.</p>
            <MindMap seedText={mapSeed} />
          </section>
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-slate-900 font-semibold mb-2">Note recenti</h3>
            <div className="space-y-2 max-h-80 overflow-auto pr-1">
              {Object.entries(notesByDate).length === 0 && (
                <p className="text-sm text-slate-600">Nessuna nota salvata. Clicca un giorno sul calendario per aggiungerne una.</p>
              )}
              {Object.entries(notesByDate)
                .sort(([a], [b]) => (a < b ? 1 : -1))
                .map(([date, notes]) => (
                  <div key={date} className="border border-slate-200 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-2">{new Date(date).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {notes.map((n, i) => (
                        <li key={i} className="text-slate-800">{n}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </aside>
      </main>

      {selectedDate && (
        <NotesPanel
          selectedDate={selectedDate}
          notes={notesByDate[formatKey(selectedDate)] || []}
          onClose={() => setSelectedDate(null)}
          onSave={handleSaveNote}
          onGenerateMap={handleGenerateMap}
        />
      )}

      <footer className="py-6 text-center text-xs text-slate-500">
        Creato con amore per lo studio e l'organizzazione
      </footer>
    </div>
  );
}
