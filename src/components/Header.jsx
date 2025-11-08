import React from 'react';
import { CalendarDays, Brain } from 'lucide-react';

export default function Header({ monthLabel }) {
  return (
    <header className="w-full px-6 py-4 bg-white/70 backdrop-blur sticky top-0 z-20 border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white">
            <CalendarDays size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Note & Calendario</h1>
            <p className="text-sm text-slate-600">Organizza le tue giornate e crea mappe concettuali</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-700">
          <Brain size={18} />
          <span className="text-sm">Mese corrente: {monthLabel}</span>
        </div>
      </div>
    </header>
  );
}
