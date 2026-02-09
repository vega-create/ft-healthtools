import { useState } from 'react';

export default function BmiCalc() {
  const [unit, setUnit] = useState<'metric'|'imperial'>('imperial');
  const [weight, setWeight] = useState(170);
  const [height, setHeight] = useState(70);
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(77);

  const bmi = unit === 'metric' ? weightKg / (heightCm/100)**2 : (weight / height**2) * 703;
  const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
  const color = bmi < 18.5 ? 'text-blue-500' : bmi < 25 ? 'text-green-500' : bmi < 30 ? 'text-yellow-500' : 'text-red-500';
  const bg = bmi < 18.5 ? 'bg-blue-50' : bmi < 25 ? 'bg-green-50' : bmi < 30 ? 'bg-yellow-50' : 'bg-red-50';

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">{(['imperial','metric'] as const).map(u => (
        <button key={u} onClick={() => setUnit(u)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize ${unit===u?'bg-red-600 text-white':'bg-gray-100 text-gray-600'}`}>{u}</button>
      ))}</div>
      {unit === 'imperial' ? (
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-gray-500">Weight (lbs)</label><input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
          <div><label className="text-xs text-gray-500">Height (inches)</label><input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-gray-500">Weight (kg)</label><input type="number" value={weightKg} onChange={e => setWeightKg(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
          <div><label className="text-xs text-gray-500">Height (cm)</label><input type="number" value={heightCm} onChange={e => setHeightCm(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        </div>
      )}
      <div className={`${bg} rounded-2xl p-6 text-center`}>
        <div className={`text-5xl font-bold ${color}`}>{bmi.toFixed(1)}</div>
        <div className={`text-lg font-medium mt-1 ${color}`}>{cat}</div>
      </div>
      <div className="flex gap-1 h-3 rounded-full overflow-hidden">
        <div className="bg-blue-400 flex-[18.5]" /><div className="bg-green-400 flex-[6.5]" /><div className="bg-yellow-400 flex-[5]" /><div className="bg-red-400 flex-[10]" />
      </div>
      <div className="flex justify-between text-xs text-gray-400"><span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span></div>
      <p className="text-xs text-gray-400">⚠️ BMI is a screening tool, not a diagnostic measure. Consult a healthcare professional.</p>
    </div>
  );
}
