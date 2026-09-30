"use client";
import { useState, useEffect } from 'react';
import { useStorage, UserData, Goal } from '@/lib/store';
import { Save, Download, Upload, TrendingUp, Lightbulb } from 'lucide-react';

export default function ProfilePage() {
  const { load, save } = useStorage();
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => { setData(load()); }, []);

  const updateProfile = (field: string, value: any) => {
    if (!data) return;
    const newData = { ...data, profile: { ...data.profile, [field]: value } };
    setData(newData);
    save(newData);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const importedData = JSON.parse(evt.target?.result as string);
      setData(importedData);
      save(importedData);
      alert("Backup ripristinato con successo!");
    };
    reader.readAsText(file);
  };

  if (!data) return <div className="p-8 text-center">Caricamento...</div>;

  return (
    <div className="p-4 pb-24 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Profilo</h1>

      <div className="p-4 bg-white rounded-2xl border shadow-sm space-y-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><Save size={20}/> Dati Personali</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Peso (kg)</label>
            <input type="number" value={data.profile.weight} onChange={(e)=>updateProfile('weight', Number(e.target.value))} className="w-full p-2 bg-gray-50 rounded-lg border" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Altezza (cm)</label>
            <input type="number" value={data.profile.height} onChange={(e)=>updateProfile('height', Number(e.target.value))} className="w-full p-2 bg-gray-50 rounded-lg border" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Obiettivo</label>
          <select value={data.profile.goal} onChange={(e)=>updateProfile('goal', e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg border">
            <option value="Ipertrofia">Ipertrofia</option>
            <option value="Forza">Forza</option>
            <option value="Definizione">Definizione</option>
            <option value="Mantenimento">Mantenimento</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-white rounded-2xl border shadow-sm space-y-4">
        <h2 className="font-bold text-lg flex items-center gap-2"><TrendingUp size={20}/> Backup Dati</h2>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={exportJSON} className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-xl font-medium text-sm active:scale-95 transition-transform">
            <Download size={18}/> Esporta
          </button>
          <label className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-xl font-medium text-sm cursor-pointer active:scale-95 transition-transform">
            <Upload size={18}/> Importa
            <input type="file" className="hidden" onChange={importJSON} accept=".json" />
          </label>
        </div>
      </div>

      <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg space-y-2">
        <h2 className="font-bold flex items-center gap-2"><Lightbulb size={20}/> Tip del Giorno</h2>
        <p className="text-sm opacity-90">
          {data.profile.goal === 'Ipertrofia' ? "Ricorda di mantenere un leggero surplus calorico e di dormire almeno 7-8 ore per ottimizzare la sintesi proteica." : "Bevi almeno 3 litri d'acqua al giorno per mantenere i muscoli idratati e performanti."}
        </p>
      </div>
    </div>
  );
}
