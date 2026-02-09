import { useState } from 'react';

export default function BodyFat() {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [waist, setWaist] = useState(34);
  const [neck, setNeck] = useState(15);
  const [height, setHeight] = useState(70);
  const [hip, setHip] = useState(38);

  let bf: number;
  if (sex === 'male') {
    bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }
  bf = Math.max(0, bf);
  const cat = sex === 'male'
    ? (bf < 6 ? 'Essential' : bf < 14 ? 'Athletic' : bf < 18 ? 'Fitness' : bf < 25 ? 'Average' : 'Above Average')
    : (bf < 14 ? 'Essential' : bf < 21 ? 'Athletic' : bf < 25 ? 'Fitness' : bf < 32 ? 'Average' : 'Above Average');

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">{(['male','female'] as const).map(s => (
        <button key={s} onClick={() => setSex(s)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize ${sex===s?'bg-red-600 text-white':'bg-gray-100 text-gray-600'}`}>{s}</button>
      ))}</div>
      <p className="text-xs text-gray-500">All measurements in inches (US Navy method)</p>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Waist</label><input type="number" value={waist} onChange={e => setWaist(+e.target.value)} step="0.5" className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Neck</label><input type="number" value={neck} onChange={e => setNeck(+e.target.value)} step="0.5" className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Height</label><input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        {sex === 'female' && <div><label className="text-xs text-gray-500">Hip</label><input type="number" value={hip} onChange={e => setHip(+e.target.value)} step="0.5" className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>}
      </div>
      <div className="bg-red-50 rounded-2xl p-6 text-center">
        <div className="text-5xl font-bold text-red-600">{bf.toFixed(1)}%</div>
        <div className="text-red-500 font-medium mt-1">{cat}</div>
      </div>
    </div>
  );
}
