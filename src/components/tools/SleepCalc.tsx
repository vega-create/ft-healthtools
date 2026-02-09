import { useState } from 'react';

export default function SleepCalc() {
  const [mode, setMode] = useState<'wake'|'sleep'>('wake');
  const [time, setTime] = useState('07:00');

  const cycles = [4,5,6]; // 90 min each + 15 min fall asleep
  const results = cycles.map(c => {
    const [h,m] = time.split(':').map(Number);
    const d = new Date(); d.setHours(h,m,0);
    if (mode === 'wake') d.setMinutes(d.getMinutes() - c*90 - 15);
    else d.setMinutes(d.getMinutes() + c*90 + 15);
    return { cycles: c, hours: c*1.5, time: d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}) };
  });

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">{(['wake','sleep'] as const).map(m => (
        <button key={m} onClick={() => setMode(m)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${mode===m?'bg-indigo-600 text-white':'bg-gray-100 text-gray-600'}`}>{m === 'wake' ? '⏰ I wake up at...' : '😴 I go to bed at...'}</button>
      ))}</div>
      <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl font-mono" />
      <div className="space-y-3">{results.map(r => (
        <div key={r.cycles} className={`rounded-xl p-4 text-center ${r.cycles===6?'bg-indigo-600 text-white ring-2 ring-indigo-300':'bg-white border border-gray-100'}`}>
          <div className={`text-2xl font-bold ${r.cycles===6?'text-white':'text-gray-900'}`}>{r.time}</div>
          <div className={`text-sm ${r.cycles===6?'text-indigo-200':'text-gray-500'}`}>{r.cycles} cycles · {r.hours} hours {r.cycles===6?'⭐ Recommended':''}</div>
        </div>
      ))}</div>
      <p className="text-xs text-gray-400 text-center">Based on 90-minute sleep cycles + 15 minutes to fall asleep.</p>
    </div>
  );
}
