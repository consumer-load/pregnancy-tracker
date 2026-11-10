import React, { useState, useEffect } from 'react';
import { Timer, Play, Square, AlertCircle, RotateCcw, Trash2, HeartPulse, CheckCircle2 } from 'lucide-react';
import { getStoredContractions, saveStoredContractions } from '../utils/storage';

export default function ContractionTimer() {
  const [contractions, setContractions] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    setContractions(getStoredContractions());
  }, []);

  // Timer tick effect
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setStartTime(new Date());
    setElapsedSeconds(0);
  };

  const handleStop = () => {
    if (!isActive || !startTime) return;
    setIsActive(false);

    const endTime = new Date();
    const durationSec = Math.max(1, elapsedSeconds);

    // Calculate interval from previous contraction start time
    let intervalMinutes = null;
    if (contractions.length > 0) {
      const lastStart = new Date(contractions[0].startTime);
      const diffMs = startTime.getTime() - lastStart.getTime();
      intervalMinutes = Math.round(diffMs / 60000);
    }

    const newEntry = {
      id: Date.now().toString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationSeconds: durationSec,
      intervalMinutes: intervalMinutes,
    };

    const updated = [newEntry, ...contractions];
    setContractions(updated);
    saveStoredContractions(updated);
    setElapsedSeconds(0);
    setStartTime(null);
  };

  const handleDelete = (id) => {
    const updated = contractions.filter((c) => c.id !== id);
    setContractions(updated);
    saveStoredContractions(updated);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your contraction history?")) {
      setContractions([]);
      saveStoredContractions([]);
    }
  };

  // Evaluate 5-1-1 Rule:
  // Are recent contractions ~5 minutes apart, lasting ~1 minute each, for at least 1 hour?
  const checkRule511 = () => {
    if (contractions.length < 5) return false;
    const recent = contractions.slice(0, 6);
    const avgDuration = recent.reduce((sum, c) => sum + c.durationSeconds, 0) / recent.length;
    const intervals = recent.filter((c) => c.intervalMinutes !== null).map((c) => c.intervalMinutes);
    if (intervals.length === 0) return false;
    const avgInterval = intervals.reduce((sum, v) => sum + v, 0) / intervals.length;

    // Contractions 3-6 mins apart, lasting 45-90 seconds
    return avgDuration >= 45 && avgDuration <= 90 && avgInterval <= 6 && avgInterval >= 3;
  };

  const is511Active = checkRule511();

  const formatTimeStr = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 70;
    return `${m.toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 5-1-1 Rule Alert Banner */}
      {is511Active ? (
        <div className="bg-red-500 text-white rounded-3xl p-6 shadow-lg shadow-red-200 flex items-start space-x-4 animate-pulse">
          <AlertCircle className="w-8 h-8 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-black text-xl">
              🚨 5-1-1 Rule Met: It's Time to Go to Hospital!
            </h3>
            <p className="text-sm text-red-100 mt-1 leading-relaxed">
              Your contractions have been coming approximately 5 minutes apart, lasting 1 minute each, consistently. Contact your doctor, midwife, or head to the labor and delivery department now!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 text-xs text-amber-900 flex items-start space-x-3">
          <HeartPulse className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">What is the 5-1-1 Rule?</strong> When your contractions occur every <strong>5 minutes</strong> apart, last for <strong>1 minute (60 seconds)</strong>, and continue for at least <strong>1 hour</strong>, it's time to call your maternity hospital or midwife!
          </div>
        </div>
      )}

      {/* Main Contraction Timer Box */}
      <div className="bg-white rounded-3xl border border-rose-100 p-8 shadow-sm text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
          Contraction Timing Session
        </span>

        {/* Live Timer Display */}
        <div className="text-6xl sm:text-7xl font-mono font-black text-slate-900 tracking-tight my-4">
          {formatTimeStr(elapsedSeconds)}
        </div>

        <p className="text-xs text-slate-500 mb-6 font-medium">
          {isActive ? 'Contraction in progress... Breathe deeply and relax your shoulders' : 'Tap the button below when your next contraction begins'}
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-base flex items-center space-x-3 shadow-lg shadow-rose-200 transition transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Contraction Started</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base flex items-center space-x-3 shadow-lg shadow-red-200 transition transform hover:scale-105 active:scale-95 animate-pulse"
            >
              <Square className="w-5 h-5 fill-white" />
              <span>Contraction Ended</span>
            </button>
          )}
        </div>
      </div>

      {/* Contraction History Table */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Contraction History ({contractions.length})
            </h3>
            <p className="text-xs text-slate-500">
              Track duration and intervals between surges
            </p>
          </div>

          {contractions.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 flex items-center space-x-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          )}
        </div>

        {contractions.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No contractions recorded yet. Press "Contraction Started" when you feel a surge.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Interval (From Previous)</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contractions.map((c) => {
                  const dateObj = new Date(c.startTime);
                  const timeFormatted = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-800">
                        {timeFormatted}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-rose-600">
                          {c.durationSeconds}s
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-600">
                        {c.intervalMinutes !== null ? `${c.intervalMinutes} min apart` : 'First entry'}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleDelete(c.id)}
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
        )}
      </div>
    </div>
  );
}
