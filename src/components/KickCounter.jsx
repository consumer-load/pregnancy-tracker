import React, { useState, useEffect } from 'react';
import { Activity, Plus, RotateCcw, CheckCircle2, History, Trash2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredKickLogs, saveStoredKickLogs } from '../utils/storage';

export default function KickCounter() {
  const [kickCount, setKickCount] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [kickLogs, setKickLogs] = useState([]);

  useEffect(() => {
    setKickLogs(getStoredKickLogs());
  }, []);

  // Timer
  useEffect(() => {
    let interval = null;
    if (isSessionActive && kickCount < 10) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, kickCount]);

  const handleAddKick = () => {
    if (!isSessionActive) {
      setIsSessionActive(true);
      setSessionStartTime(new Date());
    }

    const nextCount = kickCount + 1;
    setKickCount(nextCount);

    // If reached 10 kicks, complete session!
    if (nextCount === 10) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      const endTime = new Date();
      const durationMins = Math.max(1, Math.round(elapsedSeconds / 60));
      const newLog = {
        id: Date.now().toString(),
        date: endTime.toLocaleDateString(),
        time: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationMinutes: durationMins,
        count: 10,
        status: 'Healthy Movement',
      };

      const updated = [newLog, ...kickLogs];
      setKickLogs(updated);
      saveStoredKickLogs(updated);
    }
  };

  const handleReset = () => {
    setKickCount(0);
    setIsSessionActive(false);
    setSessionStartTime(null);
    setElapsedSeconds(0);
  };

  const handleDeleteLog = (id) => {
    const updated = kickLogs.filter((log) => log.id !== id);
    setKickLogs(updated);
    saveStoredKickLogs(updated);
  };

  const formatSec = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Educational Banner */}
      <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-4 text-xs text-rose-900 flex items-start space-x-3">
        <Heart className="w-4 h-4 text-rose-600 shrink-0 mt-0.5 fill-rose-500" />
        <div>
          <strong className="font-bold">ACOG Fetal Movement Guideline:</strong> Starting at Week 28, count baby's kicks daily. Lie on your left side after a meal or cold drink. Healthy babies usually reach <strong>10 kicks within 2 hours</strong> (and often in less than 30 minutes!).
        </div>
      </div>

      {/* Main Kick Counter Circle Box */}
      <div className="bg-white rounded-3xl border border-rose-100 p-8 shadow-sm text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
          Session Kick Target: 10 Movements
        </span>

        {/* Circular Display */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              className="stroke-slate-100"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              className="stroke-rose-500 transition-all duration-500"
              strokeWidth="8"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * Math.min(10, kickCount)) / 10}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {kickCount}
            </span>
            <span className="text-xs font-bold text-rose-500 uppercase">
              of 10 Kicks
            </span>
          </div>
        </div>

        {/* Session Timer */}
        <div className="mt-4 text-xs text-slate-500 font-medium">
          {isSessionActive && kickCount < 10 ? (
            <span className="text-rose-600 font-semibold">
              ⏱️ Elapsed Time: {formatSec(elapsedSeconds)}
            </span>
          ) : kickCount >= 10 ? (
            <span className="text-emerald-600 font-bold flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Target Reached in {formatSec(elapsedSeconds)}! Wonderful baby activity!</span>
            </span>
          ) : (
            <span>Tap "+ Count Kick" whenever you feel baby kick, roll, or flutter</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-3">
          {kickCount < 10 ? (
            <button
              onClick={handleAddKick}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-base flex items-center space-x-2 shadow-lg shadow-rose-200 transition transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-6 h-6" />
              <span>Count Baby Kick</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start New Kick Session</span>
            </button>
          )}

          {isSessionActive && (
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* History Log */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <History className="w-4 h-4 text-slate-500" />
          <h3 className="font-extrabold text-slate-900 text-base">
            Kick Count History ({kickLogs.length})
          </h3>
        </div>

        {kickLogs.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No completed kick sessions yet. Reach 10 kicks to save your first record.
          </div>
        ) : (
          <div className="space-y-2.5">
            {kickLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{log.date} at {log.time}</span>
                  <span className="text-slate-500 block text-[11px]">
                    Completed 10 kicks in <strong>{log.durationMinutes} min</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                    {log.status}
                  </span>
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
