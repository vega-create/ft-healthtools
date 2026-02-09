import { useState } from 'react';

export default function BacCalc() {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [weight, setWeight] = useState(170);
  const [drinks, setDrinks] = useState(3);
  const [hours, setHours] = useState(2);

  const r = sex === 'male' ? 0.73 : 0.66;
  const bac = Math.max(0, (drinks * 0.6 * 5.14) / (weight * r) - 0.015 * hours);
  const status = bac >= 0.08 ? 'Over legal limit' : bac >= 0.05 ? 'Impaired' : bac > 0 ? 'Mild effects' : 'Sober';
  const color = bac >= 0.08 ? 'bg-red-600' : bac >= 0.05 ? 'bg-orange-500' : bac > 0 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">{(['male','female'] as const).map(s => (
        <button key={s} onClick={() => setSex(s)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize ${sex===s?'bg-red-600 text-white':'bg-gray-100 text-gray-600'}`}>{s}</button>
      ))}</div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-xs text-gray-500">Weight (lbs)</label><input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Drinks</label><input type="number" value={drinks} onChange={e => setDrinks(Math.max(0,+e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Hours</label><input type="number" value={hours} onChange={e => setHours(Math.max(0,+e.target.value))} step="0.5" className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <div className={`${color} rounded-2xl p-6 text-white text-center`}>
        <div className="text-5xl font-bold">{bac.toFixed(3)}%</div>
        <div className="mt-1 font-medium">{status}</div>
      </div>
      <p className="text-xs text-gray-400">⚠️ This is an estimate only. Do not drink and drive. One standard drink = 12oz beer, 5oz wine, 1.5oz spirits.</p>
    </div>
  );
}
