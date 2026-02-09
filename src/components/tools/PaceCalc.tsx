import { useState } from 'react';

export default function PaceCalc() {
  const [mode, setMode] = useState<'pace'|'time'|'distance'>('pace');
  const [dist, setDist] = useState(5);
  const [unit, setUnit] = useState<'km'|'mi'>('km');
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);
  const [paceMin, setPaceMin] = useState(5);
  const [paceSec, setPaceSec] = useState(0);

  const totalSec = timeMin*60+timeSec;
  const pTotalSec = paceMin*60+paceSec;

  let result = '';
  if (mode === 'pace' && dist > 0) {
    const p = totalSec / dist;
    result = `${Math.floor(p/60)}:${String(Math.floor(p%60)).padStart(2,'0')} per ${unit}`;
  } else if (mode === 'time' && dist > 0) {
    const t = pTotalSec * dist;
    result = `${Math.floor(t/3600)}h ${Math.floor((t%3600)/60)}m ${Math.floor(t%60)}s`;
  } else if (mode === 'distance' && pTotalSec > 0) {
    const d = totalSec / pTotalSec;
    result = `${d.toFixed(2)} ${unit}`;
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-1">{(['pace','time','distance'] as const).map(m => (
        <button key={m} onClick={() => setMode(m)} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium capitalize ${mode===m?'bg-red-600 text-white':'bg-gray-100 text-gray-600'}`}>Find {m}</button>
      ))}</div>
      <div className="flex gap-2 items-end">{(['km','mi'] as const).map(u => (
        <button key={u} onClick={() => setUnit(u)} className={`px-3 py-1.5 rounded-lg text-xs ${unit===u?'bg-gray-800 text-white':'bg-gray-100 text-gray-600'}`}>{u}</button>
      ))}</div>
      {mode !== 'distance' && <div><label className="text-xs text-gray-500">Distance ({unit})</label><input type="number" value={dist} onChange={e => setDist(+e.target.value)} step="0.1" className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>}
      {mode !== 'time' && <div className="grid grid-cols-2 gap-2"><div><label className="text-xs text-gray-500">Time (min)</label><input type="number" value={timeMin} onChange={e => setTimeMin(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Sec</label><input type="number" value={timeSec} onChange={e => setTimeSec(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div></div>}
      {mode !== 'pace' && <div className="grid grid-cols-2 gap-2"><div><label className="text-xs text-gray-500">Pace (min/{unit})</label><input type="number" value={paceMin} onChange={e => setPaceMin(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Sec</label><input type="number" value={paceSec} onChange={e => setPaceSec(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div></div>}
      {result && <div className="bg-red-50 rounded-2xl p-6 text-center"><div className="text-sm text-red-500 capitalize">Your {mode}</div><div className="text-3xl font-bold text-red-700">{result}</div></div>}
    </div>
  );
}
