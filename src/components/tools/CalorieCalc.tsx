import { useState } from 'react';

export default function CalorieCalc() {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(170);
  const [height, setHeight] = useState(70);
  const [activity, setActivity] = useState(1.55);

  const wKg = weight * 0.4536, hCm = height * 2.54;
  const bmr = sex === 'male' ? 10*wKg + 6.25*hCm - 5*age + 5 : 10*wKg + 6.25*hCm - 5*age - 161;
  const tdee = bmr * activity;

  const levels: [string,number,string][] = [['Sedentary',1.2,'Little/no exercise'],['Light',1.375,'1-3 days/week'],['Moderate',1.55,'3-5 days/week'],['Active',1.725,'6-7 days/week'],['Very Active',1.9,'Athlete/physical job']];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">{(['male','female'] as const).map(s => (
        <button key={s} onClick={() => setSex(s)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize ${sex===s?'bg-red-600 text-white':'bg-gray-100 text-gray-600'}`}>{s}</button>
      ))}</div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-xs text-gray-500">Age</label><input type="number" value={age} onChange={e => setAge(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Weight (lbs)</label><input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Height (in)</label><input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <div><label className="text-xs text-gray-500">Activity Level</label>
        <div className="space-y-1 mt-1">{levels.map(([name,val,desc]) => (
          <button key={name} onClick={() => setActivity(val)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${activity===val?'bg-red-600 text-white':'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}><span className="font-medium">{name}</span> <span className={activity===val?'text-red-200':'text-gray-400'}>— {desc}</span></button>
        ))}</div></div>
      <div className="bg-red-600 rounded-2xl p-6 text-white text-center">
        <div className="text-sm text-red-200">Daily Calories (TDEE)</div>
        <div className="text-5xl font-bold">{Math.round(tdee)}</div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-green-50 rounded-xl p-3"><div className="text-xl font-bold text-green-600">{Math.round(tdee-500)}</div><div className="text-xs text-gray-500">Lose weight</div></div>
        <div className="bg-blue-50 rounded-xl p-3"><div className="text-xl font-bold text-blue-600">{Math.round(tdee)}</div><div className="text-xs text-gray-500">Maintain</div></div>
        <div className="bg-purple-50 rounded-xl p-3"><div className="text-xl font-bold text-purple-600">{Math.round(tdee+500)}</div><div className="text-xs text-gray-500">Gain weight</div></div>
      </div>
      <div className="text-center text-xs text-gray-400">BMR: {Math.round(bmr)} cal/day (Mifflin-St Jeor)</div>
    </div>
  );
}
