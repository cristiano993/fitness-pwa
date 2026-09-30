"use client";
import { useState, useEffect } from 'react';
import { useStorage, UserData } from '@/lib/store';
import { Pill, CheckCircle, RotateCcw, Plus } from 'lucide-react';

export default function SupplementsPage() {
  const { load, save } = useStorage();
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => { setData(load()); }, []);

  const toggleSupplement = (id: string) => {
    if (!data) return;
    const newData = { ...data };
    const supp = newData.supplements.find(s => s.id === id);
    if (supp) supp.completed = !supp.completed;
    setData(newData);
    save(newData);
  };

  const resetAll = () => {
    if (!data) return;
    const newData = { ...data };
    newData.supplements.forEach(s => s.completed = false);
    setData(newData);
    save(newData);
  };

  const addPreset = (name: string, dose: string) => {
    if (!data) return;
    const newData = { ...data };
    newData.supplements.push({ id: Date.now().toString(), name, dose, time: 'Ogni giorno', completed: false });
    setData(newData);
    save(newData);
  };

  if (!data) return <div className="p-8 text-center">Caricamento...</div>;

  return (
    <div className="p-4 pb-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Integratori</h1>
        <button onClick={resetAll} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
          <RotateCcw size={20}/>
        </button>
      </div>

      <div className="space-y-3">
        {data.supplements.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed text-gray-400">
            Nessun integratore aggiunto.
          </div>
        )}
        {data.supplements.map((s) => (
          <div 
            key={s.id} 
            onClick={() => toggleSupplement(s.id)}
            className={`p-4 rounded-2xl border transition-all active:scale-95 cursor-pointer flex items-center justify-between ${s.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
          >
            <div>
              <p className={`font-bold ${s.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>{s.name}</p>
              <p className="text-xs text-gray-500">{s.dose} • {s.time}</p>
            </div>
            {s.completed ? <CheckCircle className="text-green-600" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-300" />}
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl border space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase">Aggiungi Rapido</p>
        <div className="grid grid-cols-2 gap-2">
          {['Creatina (5g)', 'Whey (30g)', 'Omega 3 (1cap)', 'Multivitaminico'].map(p => (
            <button 
              key={p} 
              onClick={() => addPreset(p.split(' (')[0], p.split(' (')[1].replace(')', ''))}
              className="p-2 bg-white border rounded-lg text-xs font-medium active:scale-95 transition-transform flex items-center gap-1"
            >
              <Plus size={12}/> {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
