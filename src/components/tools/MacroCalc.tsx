import { useState } from 'react';

const presets: Record<string,[number,number,number]> = {Balanced:[30,35,35],LowCarb:[40,25,35],HighProtein:[40,30,30],Keto:[25,5,70],Zone:[30,40,30]};

export default function MacroCalc() {
  const [calories, setCalories] = useState(2000);
  const [preset, setPreset] = useState('Balanced');
  const [p, c, f] = presets[preset] || [30,35,35];
  const protein = Math.round(calories * p / 100 / 4);
  const carbs = Math.round(calories * c / 100 / 4);
  const fat = Math.round(calories * f / 100 / 9);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div><label className="text-xs text-gray-500">Daily Calories</label><input type="number" value={calories} onChange={e => setCalories(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xl font-mono" /></div>
      <div className="flex flex-wrap gap-2">{Object.keys(presets).map(k => (
        <button key={k} onClick={() => setPreset(k)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${preset===k?'bg-red-600 text-white':'bg-gray-100 text-gray-600'}`}>{k}</button>
      ))}</div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 rounded-xl p-4 text-center"><div className="text-3xl font-bold text-blue-600">{protein}g</div><div className="text-xs text-gray-500">Protein ({p}%)</div></div>
        <div className="bg-amber-50 rounded-xl p-4 text-center"><div className="text-3xl font-bold text-amber-600">{carbs}g</div><div className="text-xs text-gray-500">Carbs ({c}%)</div></div>
        <div className="bg-red-50 rounded-xl p-4 text-center"><div className="text-3xl font-bold text-red-500">{fat}g</div><div className="text-xs text-gray-500">Fat ({f}%)</div></div>
      </div>
      <div className="h-4 rounded-full overflow-hidden flex">
        <div className="bg-blue-500" style={{width:`${p}%`}} /><div className="bg-amber-500" style={{width:`${c}%`}} /><div className="bg-red-400" style={{width:`${f}%`}} />
      </div>
    </div>
  );
}
