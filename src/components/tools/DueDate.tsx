import { useState } from 'react';

export default function DueDate() {
  const [lmp, setLmp] = useState('');

  const due = lmp ? new Date(new Date(lmp).getTime() + 280 * 86400000) : null;
  const now = new Date();
  const weeksPreg = lmp ? Math.floor((now.getTime() - new Date(lmp).getTime()) / (7*86400000)) : 0;
  const daysLeft = due ? Math.max(0, Math.ceil((due.getTime() - now.getTime()) / 86400000)) : 0;
  const trimester = weeksPreg < 13 ? '1st' : weeksPreg < 27 ? '2nd' : '3rd';

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div><label className="text-sm font-medium text-gray-700">First Day of Last Period</label>
        <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl mt-1" /></div>
      {due && (
        <>
          <div className="bg-pink-50 rounded-2xl p-6 text-center">
            <div className="text-sm text-pink-600">Estimated Due Date</div>
            <div className="text-3xl font-bold text-pink-700">{due.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border border-gray-100 rounded-xl p-3"><div className="text-2xl font-bold text-gray-900">{weeksPreg}</div><div className="text-xs text-gray-500">Weeks</div></div>
            <div className="bg-white border border-gray-100 rounded-xl p-3"><div className="text-2xl font-bold text-gray-900">{daysLeft}</div><div className="text-xs text-gray-500">Days left</div></div>
            <div className="bg-white border border-gray-100 rounded-xl p-3"><div className="text-2xl font-bold text-gray-900">{trimester}</div><div className="text-xs text-gray-500">Trimester</div></div>
          </div>
          <div><div className="flex justify-between text-xs text-gray-500 mb-1"><span>Week 0</span><span>Week 40</span></div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-pink-500 rounded-full" style={{width:`${Math.min(100,weeksPreg/40*100)}%`}} /></div></div>
          <p className="text-xs text-gray-400">⚠️ This is an estimate based on Naegele's rule. Consult your healthcare provider.</p>
        </>
      )}
    </div>
  );
}
