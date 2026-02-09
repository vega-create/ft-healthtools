import { useState } from 'react';

export default function WaterIntake() {
  const [weight, setWeight] = useState(170);
  const [exercise, setExercise] = useState(30);
  const [climate, setClimate] = useState<'normal'|'hot'|'cold'>('normal');

  const base = weight * 0.5; // oz
  const exBonus = (exercise / 30) * 12;
  const climateBonus = climate === 'hot' ? 16 : climate === 'cold' ? -4 : 0;
  const totalOz = base + exBonus + climateBonus;
  const totalL = totalOz * 0.02957;
  const cups = Math.round(totalOz / 8);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div><label className="text-xs text-gray-500">Weight (lbs)</label><input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      <div><label className="text-xs text-gray-500">Daily Exercise (min)</label><input type="range" min="0" max="120" value={exercise} onChange={e => setExercise(+e.target.value)} className="w-full accent-blue-500" /><div className="text-center text-sm text-gray-600">{exercise} minutes</div></div>
      <div className="flex gap-2">{(['cold','normal','hot'] as const).map(c => (
        <button key={c} onClick={() => setClimate(c)} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium capitalize ${climate===c?'bg-blue-500 text-white':'bg-gray-100 text-gray-600'}`}>{c === 'cold' ? '❄️' : c === 'hot' ? '☀️' : '🌤️'} {c}</button>
      ))}</div>
      <div className="bg-blue-500 rounded-2xl p-6 text-white text-center">
        <div className="text-6xl mb-2">💧</div>
        <div className="text-4xl font-bold">{totalL.toFixed(1)} L</div>
        <div className="text-blue-100">{Math.round(totalOz)} oz — about {cups} cups</div>
      </div>
    </div>
  );
}
