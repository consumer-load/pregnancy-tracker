import React, { useState, useEffect } from 'react';
import { Scale, Plus, Trash2, TrendingUp, Info } from 'lucide-react';
import { getStoredWeightLogs, saveStoredWeightLogs } from '../utils/storage';
import { getWeightGainGuidelines } from '../utils/pregnancyCalculator';

export default function WeightTracker({ currentWeek, settings }) {
  const [logs, setLogs] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [entryWeek, setEntryWeek] = useState(currentWeek || 20);

  useEffect(() => {
    setLogs(getStoredWeightLogs());
  }, []);

  const preWeight = Number(settings.prePregnancyWeight) || 62;
  const heightM = (Number(settings.heightCm) || 165) / 100;
  const preBmi = Math.round((preWeight / (heightM * heightM)) * 10) / 10;
  const guidelines = getWeightGainGuidelines(preBmi);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;

    const entry = {
      week: Number(entryWeek),
      weight: parseFloat(newWeight),
      date: new Date().toISOString().split('T')[0],
    };

    // Sort by week ascending
    const updated = [...logs.filter((l) => l.week !== entry.week), entry].sort((a, b) => a.week - b.week);
    setLogs(updated);
    saveStoredWeightLogs(updated);
    setNewWeight('');
  };

  const handleDelete = (week) => {
    const updated = logs.filter((l) => l.week !== week);
    setLogs(updated);
    saveStoredWeightLogs(updated);
  };

  // Latest entry
  const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;
  const currentTotalGain = latestLog ? Math.round((latestLog.weight - preWeight) * 10) / 10 : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* BMI & IOM Clinical Guidelines Header */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
              Pre-Pregnancy Baseline
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {preWeight} {settings.weightUnit || 'kg'}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Pre-BMI: <strong>{preBmi}</strong> ({guidelines.category})
            </p>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
              Recommended Total Gain
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {guidelines.minKg} - {guidelines.maxKg} {settings.weightUnit || 'kg'}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              IOM standard: {guidelines.note}
            </p>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
              Current Net Gain
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {currentTotalGain >= 0 ? `+${currentTotalGain}` : currentTotalGain} {settings.weightUnit || 'kg'}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Recorded at Week {latestLog?.week || currentWeek}
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start space-x-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Clinical Note:</strong> Weight gain comes from the baby (3.5kg), placenta (0.7kg), amniotic fluid (0.9kg), expanded blood volume (1.5kg), fluid retention, and uterine growth. Healthy maternal weight gain nourishes baby's vital organs.
          </span>
        </div>
      </div>

      {/* Add New Entry Form */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
        <h3 className="font-extrabold text-slate-900 text-base mb-4">
          Log Weight Entry
        </h3>

        <form onSubmit={handleAddEntry} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Pregnancy Week
            </label>
            <select
              value={entryWeek}
              onChange={(e) => setEntryWeek(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-rose-500"
            >
              {Array.from({ length: 42 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>
                  Week {w} {w === currentWeek ? '(Now)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Current Weight ({settings.weightUnit || 'kg'})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 68.5"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-rose-500"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Save Log</span>
            </button>
          </div>
        </form>
      </div>

      {/* Weight History Table */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
        <h3 className="font-extrabold text-slate-900 text-base mb-4">
          Weight Progression Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Week</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Recorded Weight</th>
                <th className="py-2.5 px-3">Net Change</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => {
                const diff = Math.round((log.weight - preWeight) * 10) / 10;
                return (
                  <tr key={log.week} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-bold text-slate-800">
                      Week {log.week}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {log.date}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {log.weight} {settings.weightUnit || 'kg'}
                    </td>
                    <td className="py-3 px-3 font-bold text-rose-600">
                      {diff >= 0 ? `+${diff}` : diff} {settings.weightUnit || 'kg'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDelete(log.week)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
