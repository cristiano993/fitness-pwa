"use client";
import { useState, useEffect } from 'react';
import { useStorage, UserData } from '@/lib/store';
import { Plus, Play, CheckCircle2, Trophy } from 'lucide-react';

export default function WorkoutPage() {
  const { load, save } = useStorage();
  const [data, setData] = useState<UserData | null>(null);
  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);

  useEffect(() => {
    setData(load());
  }, []);

  const calculate1RM = (weight: number, reps: number) => Math.round(weight * (1 + reps / 30));

  if (!data) return <div className="p-8 text-center">Caricamento...</div>;

  return (
    <div className="p-4 pb-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Workout</h1>
        <button className="p-2 bg-blue-600 text-white rounded-full shadow-lg">
          <Plus size={24} />
        </button>
      </div>

      {!activeRoutine ? (
        <div className="grid gap-4">
          <p className="text-sm text-gray-500 font-medium">Scegli la tua scheda:</p>
          {data.routines.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
              Nessuna scheda creata. Clicca + per iniziare!
            </div>
          )}
          {data.routines.map((r) => (
            <button 
              key={r.id} 
              onClick={() => setActiveRoutine(r.id)}
              className="p-4 bg-white rounded-2xl border shadow-sm flex justify-between items-center active:scale-95 transition-transform"
            >
              <span className="font-bold text-lg">{r.name}</span>
              <Play size={20} className="text-blue-600" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button 
            onClick={() => setActiveRoutine(null)}
            className="text-blue-600 text-sm font-medium mb-2"
          >
            ← Torna alle schede
          </button>
          
          {data.routines.find(r => r.id === activeRoutine)?.exercises.map((ex) => (
            <div key={ex.id} className="p-4 bg-white rounded-2xl border shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{ex.name}</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  <Trophy size={12} />
                  1RM: {calculate1RM(ex.lastSet.weight, ex.lastSet.reps)}kg
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-gray-400 uppercase">
                <div>Serie</div>
                <div>Peso (kg)</div>
                <div>Reps</div>
              </div>

              {[1, 2, 3].map((set) => (
                <div key={set} className="grid grid-cols-3 gap-2 items-center py-2 border-t border-gray-50">
                  <div className="text-center font-bold">{set}</div>
                  <input 
                    type="number" 
                    placeholder={ex.lastSet.weight.toString()} 
                    className="w-full p-2 bg-gray-50 rounded-lg text-center font-medium placeholder:text-gray-300"
                  />
                  <input 
                    type="number" 
                    placeholder={ex.lastSet.reps.toString()} 
                    className="w-full p-2 bg-gray-50 rounded-lg text-center font-medium placeholder:text-gray-300"
                  />
                </div>
              ))}
            </div>
          ))}
          
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
            <CheckCircle2 size={24} />
            Completa Allenamento
          </button>
        </div>
      )}
    </div>
  );
}
