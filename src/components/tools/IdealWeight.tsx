import { useState } from 'react';

export default function IdealWeight() {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [height, setHeight] = useState(70);

  const inOver5ft = Math.max(0, height - 60);
  const formulas = [
    { name: 'Devine', value: sex === 'male' ? 50 + 2.3 * inOver5ft : 45.5 + 2.3 * inOver5ft },
    { name: 'Robinson', value: sex === 'male' ? 52 + 1.9 * inOver5ft : 49 + 1.7 * inOver5ft },
    { name: 'Miller', value: sex === 'male' ? 56.2 + 1.41 * inOver5ft : 53.1 + 1.36 * inOver5ft },
    { name: 'Hamwi', value: sex === 'male' ? 48 + 2.7 * inOver5ft : 45.5 + 2.2 * inOver5ft },
  ];
  const avg = formulas.reduce((s, f) => s + f.value, 0) / formulas.length;
  const ft = Math.floor(height/12), inch = height%12;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">{(['male','female'] as const).map(s => (
        <button key={s} onClick={() => setSex(s)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize ${sex===s?'bg-red-600 text-white':'bg-gray-100 text-gray-600'}`}>{s}</button>
      ))}</div>
      <div><label className="text-xs text-gray-500">Height: {ft}'{inch}" ({height} in)</label>
        <input type="range" min="48" max="84" value={height} onChange={e => setHeight(+e.target.value)} className="w-full accent-red-500" /></div>
      <div className="bg-blue-50 rounded-2xl p-6 text-center">
        <div className="text-sm text-blue-600">Average Ideal Weight</div>
        <div className="text-4xl font-bold text-blue-700">{(avg * 2.205).toFixed(0)} lbs</div>
        <div className="text-sm text-blue-500">{avg.toFixed(1)} kg</div>
      </div>
      <div className="space-y-2">{formulas.map(f => (
        <div key={f.name} className="flex justify-between items-center bg-white border border-gray-100 rounded-xl p-3">
          <span className="text-sm text-gray-600">{f.name} Formula</span>
          <span className="font-mono font-bold">{(f.value*2.205).toFixed(0)} lbs <span className="text-gray-400 text-xs">({f.value.toFixed(1)} kg)</span></span>
        </div>
      ))}</div>
    </div>
  );
}
