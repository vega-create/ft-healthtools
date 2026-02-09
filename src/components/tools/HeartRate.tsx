import { useState } from 'react';

export default function HeartRate() {
  const [age, setAge] = useState(30);
  const [restHr, setRestHr] = useState(70);

  const maxHr = 220 - age;
  const zones = [
    { name: 'Zone 1 — Recovery', min: 50, max: 60, color: 'bg-blue-100 text-blue-700' },
    { name: 'Zone 2 — Fat Burn', min: 60, max: 70, color: 'bg-green-100 text-green-700' },
    { name: 'Zone 3 — Aerobic', min: 70, max: 80, color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Zone 4 — Threshold', min: 80, max: 90, color: 'bg-orange-100 text-orange-700' },
    { name: 'Zone 5 — Maximum', min: 90, max: 100, color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Age</label><input type="number" value={age} onChange={e => setAge(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Resting HR (bpm)</label><input type="number" value={restHr} onChange={e => setRestHr(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <div className="bg-red-600 rounded-2xl p-4 text-white text-center">
        <div className="text-sm text-red-200">Max Heart Rate</div>
        <div className="text-4xl font-bold">{maxHr} bpm</div>
      </div>
      <div className="space-y-2">{zones.map(z => {
        const low = Math.round(maxHr * z.min / 100);
        const high = Math.round(maxHr * z.max / 100);
        return (
          <div key={z.name} className={`${z.color} rounded-xl p-3 flex justify-between items-center`}>
            <span className="text-sm font-medium">{z.name}</span>
            <span className="font-mono font-bold">{low}–{high} bpm</span>
          </div>
        );
      })}</div>
    </div>
  );
}
