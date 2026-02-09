import { useState } from 'react';

export default function OneRepMax() {
  const [weight, setWeight] = useState(185);
  const [reps, setReps] = useState(5);

  const orm = weight * (1 + reps / 30); // Epley
  const pcts = [100,95,90,85,80,75,70,65,60];

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Weight Lifted (lbs)</label><input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Reps Completed</label><input type="number" value={reps} onChange={e => setReps(Math.max(1,+e.target.value))} min="1" max="30" className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 text-white text-center">
        <div className="text-sm text-gray-400">Estimated One Rep Max (Epley)</div>
        <div className="text-5xl font-bold text-red-400">{Math.round(orm)} lbs</div>
        <div className="text-sm text-gray-500 mt-1">{(orm*0.4536).toFixed(1)} kg</div>
      </div>
      <div className="space-y-1">{pcts.map(p => (
        <div key={p} className="flex items-center gap-2">
          <span className="w-12 text-right text-xs text-gray-500">{p}%</span>
          <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden"><div className="h-full bg-red-500 rounded flex items-center px-2" style={{width:`${p}%`}}><span className="text-xs text-white font-bold">{Math.round(orm*p/100)} lbs</span></div></div>
        </div>
      ))}</div>
    </div>
  );
}
