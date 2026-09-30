"use client";
import { useState, useEffect } from 'react';
import { useStorage, UserData } from '@/lib/store';
import { Utensils, Plus, History } from 'lucide-react';

export default function NutritionPage() {
  const { load, save } = useStorage();
  const [data, setData] = useState<UserData | null>(null);
  const [current, setCurrent] = useState({ cal: 0, p: 0, c: 0, f: 0 });

  useEffect(() => { setData(load()); }, []);

  const addMacro = (p: number, c: number, f: number, cal: number) => {
    setCurrent(prev => ({
      cal: prev.cal + cal,
      p: prev.p + p,
      c: prev.c + c,
      f: prev.f + f
    }));
  };

  if (!data) return <div className="p-8 text-center">Caricamento...</div>;

  const targets = data.nutrition.targets;
  const ProgressBar = ({ label, current: val, target, unit }: any) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-bold uppercase text-gray-400">
        <span>{label}</span>
        <span>{val}/{target}{unit}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500" 
          style={{ width: `${Math.min((val/target)*100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 pb-24 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Nutrizione</h1>

      <div className="p-4 bg-white rounded-2xl border shadow-sm space-y-6">
        <h2 className="font-bold text-lg flex items-center gap-2"><Utensils size={20}/> Target Giornalieri</h2>
        <ProgressBar label="Calorie" current={current.cal} target={targets.cal} unit="kcal" />
        <ProgressBar label="Proteine" current={current.p} target={targets.p} unit="g" />
        <ProgressBar label="Carboidrati" current={current.c} target={targets.c} unit="g" />
        <ProgressBar label="Grassi" current={current.f} target={targets.f} unit="g" />
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-lg">Aggiunta Rapida</h2>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => addMacro(30, 10, 5, 250)} className="p-3 bg-white border rounded-xl text-sm font-medium active:scale-95 transition-transform">
            🥚 Colazione Standard
          </button>
          <button onClick={() => addMacro(40, 50, 10, 450)} className="p-3 bg-white border rounded-xl text-sm font-medium active:scale-95 transition-transform">
            🍗 Pranzo Pollo/Riso
          </button>
        </div>
      </div>

      <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
        <Plus size={20}/> Aggiungi Pasto Personalizzato
      </button>
    </div>
  );
}
