import React, { useState } from 'react';
import { Settings, X, Calendar, Sparkles, Scale, Key, HelpCircle } from 'lucide-react';
import { CALC_METHODS } from '../utils/pregnancyCalculator';

export default function SetupModal({ 
  settings, 
  onSave, 
  onClose 
}) {
  const [form, setForm] = useState({ ...settings });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 my-8 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Pregnancy Dates & Calculation
              </h3>
              <p className="text-xs text-slate-500">
                Choose how your weeks and due date are calculated
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Method Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Calculation Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, method: CALC_METHODS.LMP })}
                className={`p-3 rounded-2xl border text-left font-bold transition ${
                  form.method === CALC_METHODS.LMP
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                📅 By Last Period (LMP)
                <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                  Standard clinical standard (40 weeks)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, method: CALC_METHODS.OVULATION })}
                className={`p-3 rounded-2xl border text-left font-bold transition ${
                  form.method === CALC_METHODS.OVULATION
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🥚 By Ovulation / Conception
                <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                  Accurate for tracked ovulation or IVF
                </span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, method: CALC_METHODS.DUE_DATE })}
                className={`p-3 rounded-2xl border text-left font-bold transition ${
                  form.method === CALC_METHODS.DUE_DATE
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🎯 By Known Due Date (EDD)
                <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                  Provided by your doctor or midwife
                </span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, method: CALC_METHODS.ULTRASOUND })}
                className={`p-3 rounded-2xl border text-left font-bold transition ${
                  form.method === CALC_METHODS.ULTRASOUND
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🔬 By Ultrasound Scan
                <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                  Based on fetal crown-rump length scan
                </span>
              </button>
            </div>
          </div>

          {/* Dynamic Date Inputs based on Method */}
          {form.method === CALC_METHODS.LMP && (
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                First Day of Last Menstrual Period (LMP) *
              </label>
              <input
                type="date"
                value={form.lmpDate || ''}
                onChange={(e) => setForm({ ...form, lmpDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-rose-500"
                required
              />
            </div>
          )}

          {form.method === CALC_METHODS.OVULATION && (
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Date of Ovulation or Conception *
              </label>
              <input
                type="date"
                value={form.ovulationDate || ''}
                onChange={(e) => setForm({ ...form, ovulationDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-rose-500"
                required
              />
            </div>
          )}

          {form.method === CALC_METHODS.DUE_DATE && (
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Estimated Delivery Date (EDD) *
              </label>
              <input
                type="date"
                value={form.dueDate || ''}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-rose-500"
                required
              />
            </div>
          )}

          {form.method === CALC_METHODS.ULTRASOUND && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Scan Date *
                </label>
                <input
                  type="date"
                  value={form.scanDate || ''}
                  onChange={(e) => setForm({ ...form, scanDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Gestational Age at Scan (Weeks)
                </label>
                <input
                  type="number"
                  min="4"
                  max="40"
                  value={form.scanWeeks || 12}
                  onChange={(e) => setForm({ ...form, scanWeeks: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-rose-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Personalization & BMI Parameters */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Pre-Pregnancy Weight ({form.weightUnit || 'kg'})
              </label>
              <input
                type="number"
                step="0.1"
                value={form.prePregnancyWeight || 62}
                onChange={(e) => setForm({ ...form, prePregnancyWeight: parseFloat(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={form.heightCm || 165}
                onChange={(e) => setForm({ ...form, heightCm: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-md shadow-rose-200"
            >
              Save & Recalculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
