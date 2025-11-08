import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // 0-6, Sun-Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks = [];
  let current = 1 - (startDay === 0 ? 6 : startDay - 1); // Monday-first

  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(year, month, current);
      week.push({
        date,
        inMonth: date.getMonth() === month,
        day: date.getDate(),
      });
      current++;
    }
    weeks.push(week);
  }
  return weeks;
}

export default function Calendar({ currentDate, notesByDate, onPrev, onNext, onSelectDay }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const weeks = getMonthMatrix(year, month);

  const monthLabel = currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <button onClick={onPrev} className="p-2 hover:bg-slate-200 rounded-md" aria-label="Mese precedente">
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-slate-800 font-medium capitalize">{monthLabel}</h2>
        <button onClick={onNext} className="p-2 hover:bg-slate-200 rounded-md" aria-label="Mese successivo">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-500 p-2">
        {dayNames.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-slate-200">
        {weeks.map((week, wi) => (
          <React.Fragment key={wi}>
            {week.map(({ date, inMonth, day }) => {
              const key = date.toISOString().slice(0, 10);
              const today = new Date();
              const isToday = date.toDateString() === today.toDateString();
              const hasNotes = (notesByDate[key] || []).length > 0;

              return (
                <button
                  key={key}
                  onClick={() => onSelectDay(date)}
                  className={`relative aspect-square bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    inMonth ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  <div className="absolute top-1 left-1 text-xs">{day}</div>
                  {isToday && (
                    <span className="absolute top-1 right-1 text-[10px] px-1 py-0.5 rounded bg-blue-600 text-white">Oggi</span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plus size={16} className="text-slate-300" />
                  </div>
                  {hasNotes && (
                    <div className="absolute bottom-1 left-1 right-1 flex gap-1 justify-center">
                      {(notesByDate[key] || []).slice(0,3).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
