import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Heart, 
  Baby, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Apple,
  Info,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { PREGNANCY_WEEKS } from '../data/pregnancyWeeksData';

export default function Dashboard({ 
  pregnancyInfo, 
  settings, 
  onNavigateTab,
  onOpenSettings 
}) {
  // Allow user to navigate weeks while keeping track of current actual week
  const [viewWeek, setViewWeek] = useState(pregnancyInfo.currentWeek);

  const weekData = PREGNANCY_WEEKS[viewWeek] || PREGNANCY_WEEKS[40];
  const isActualCurrentWeek = viewWeek === pregnancyInfo.currentWeek;

  const handlePrevWeek = () => {
    if (viewWeek > 1) setViewWeek(viewWeek - 1);
  };

  const handleNextWeek = () => {
    if (viewWeek < 42) setViewWeek(viewWeek + 1);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome & Main Gestational Age Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 p-6 sm:p-8 text-white shadow-xl shadow-rose-200/50">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-pink-300/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Week & Progress */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/95">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {pregnancyInfo.method === 'ovulation' 
                  ? 'Calculated from Ovulation / Conception' 
                  : pregnancyInfo.method === 'due_date' 
                  ? 'Calculated from Due Date' 
                  : pregnancyInfo.method === 'ultrasound'
                  ? 'Calculated from Ultrasound Scan'
                  : 'Calculated from Last Menstrual Period'}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Week {pregnancyInfo.currentWeek}
                <span className="text-xl sm:text-2xl font-light text-rose-100 ml-2">
                  + Day {pregnancyInfo.currentDayInWeek}
                </span>
              </h1>
              <p className="text-rose-100 text-sm sm:text-base mt-1 font-medium">
                {pregnancyInfo.trimesterLabel} • Estimated Delivery Date:{' '}
                <strong className="text-white underline decoration-amber-300 underline-offset-4">
                  {pregnancyInfo.formattedDueDate}
                </strong>
              </p>
            </div>

            {/* Delivery Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold text-rose-100">
                <span>{pregnancyInfo.totalDays} Days Completed</span>
                <span>{pregnancyInfo.daysRemaining} Days to Delivery</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-3.5 p-0.5 overflow-hidden backdrop-blur-xs">
                <div 
                  className="bg-gradient-to-r from-amber-200 via-white to-pink-100 h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${pregnancyInfo.progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-white/80">
                <span>Conception</span>
                <span className="font-bold text-amber-200">{pregnancyInfo.progressPercent}% Complete</span>
                <span>Due Date (W40)</span>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button 
                onClick={() => onNavigateTab('nutrition')} 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition"
              >
                <Apple className="w-3.5 h-3.5" />
                <span>Week {pregnancyInfo.currentWeek} Diet Plan</span>
              </button>
              <button 
                onClick={() => onNavigateTab('ai-doctor')} 
                className="bg-amber-300 text-slate-900 hover:bg-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-sm"
              >
                <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
                <span>Ask Dr. Bloom AI</span>
              </button>
            </div>
          </div>

          {/* Right: Baby Size Illustration Card */}
          <div className="lg:col-span-5 bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-6 text-center shadow-inner relative">
            <div className="text-6xl sm:text-7xl mb-2 drop-shadow-md animate-bounce duration-1000">
              {weekData.fruitEmoji}
            </div>
            <p className="text-xs font-bold text-amber-200 uppercase tracking-widest">
              Baby Size Comparison
            </p>
            <h3 className="text-2xl font-black text-white mt-0.5">
              {weekData.fruit}
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/20 text-left">
              <div className="bg-white/10 rounded-2xl p-2.5 text-center">
                <span className="text-[10px] text-rose-200 block uppercase font-bold">Length</span>
                <span className="text-base font-extrabold text-white">
                  {weekData.lengthCm} cm
                </span>
                <span className="text-[11px] text-white/80 block">
                  ({weekData.lengthIn} in)
                </span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5 text-center">
                <span className="text-[10px] text-rose-200 block uppercase font-bold">Weight</span>
                <span className="text-base font-extrabold text-white">
                  {weekData.weightG} g
                </span>
                <span className="text-[11px] text-white/80 block">
                  ({weekData.weightOz} oz)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Navigator Controller */}
      <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            W{viewWeek}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">
              Exploring Week {viewWeek}
              {!isActualCurrentWeek && (
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  Preview (You are on W{pregnancyInfo.currentWeek})
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-500">
              Trimester {weekData.trimester} • {weekData.fruit}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevWeek}
            disabled={viewWeek <= 1}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Previous Week"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Jump to current week button */}
          {!isActualCurrentWeek && (
            <button
              onClick={() => setViewWeek(pregnancyInfo.currentWeek)}
              className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 font-semibold text-xs hover:bg-rose-200 transition"
            >
              Back to Week {pregnancyInfo.currentWeek}
            </button>
          )}

          <select
            value={viewWeek}
            onChange={(e) => setViewWeek(Number(e.target.value))}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-rose-500"
          >
            {Array.from({ length: 42 }, (_, i) => i + 1).map((w) => (
              <option key={w} value={w}>
                Week {w} {w === pregnancyInfo.currentWeek ? '(Current)' : ''}
              </option>
            ))}
          </select>

          <button
            onClick={handleNextWeek}
            disabled={viewWeek >= 42}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Next Week"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Deep Dive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Baby Development Card */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              {weekData.fruitEmoji}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Baby's Development
              </h3>
              <p className="text-xs text-slate-500">
                Milestones & Anatomical Growth at Week {viewWeek}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100/60 font-medium">
            {weekData.babyHighlights}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-500 block">Length (Crown to Heel)</span>
              <strong className="text-slate-800 text-sm">{weekData.lengthCm} cm / {weekData.lengthIn} inches</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-500 block">Estimated Weight</span>
              <strong className="text-slate-800 text-sm">{weekData.weightG} g / {weekData.weightOz}</strong>
            </div>
          </div>
        </div>

        {/* Mom's Body & Common Symptoms */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Mom's Body Changes
              </h3>
              <p className="text-xs text-slate-500">
                What you may feel physically and emotionally
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100/60">
            {weekData.momBody}
          </p>

          <div className="mt-4">
            <span className="text-xs font-bold text-slate-600 block mb-2">Common Symptoms This Week:</span>
            <div className="flex flex-wrap gap-1.5">
              {weekData.symptoms.map((symptom, idx) => (
                <span 
                  key={idx} 
                  className="bg-rose-100/70 text-rose-800 text-xs px-2.5 py-1 rounded-full font-medium"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Week's Checklist & Medical Care */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Doctor's Checklist for Week {viewWeek}
              </h3>
              <p className="text-xs text-slate-500">
                Essential tests, appointments, and prep tasks
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {weekData.checklist.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  ✓
                </div>
                <span className="font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Targeted Nutrition Focus */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Apple className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Targeted Nutrition Focus
              </h3>
              <p className="text-xs text-slate-500">
                Fuel for baby's current developmental stage
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-xs text-pink-900 leading-relaxed font-medium">
            {weekData.nutritionFocus}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Looking for full meal plans and foods to avoid?</span>
            <button 
              onClick={() => onNavigateTab('nutrition')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
            >
              <span>View Diet Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Major Pregnancy Milestones Roadmap */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Pregnancy Milestones Journey
            </h3>
            <p className="text-xs text-slate-500">
              From conception to birth: key biological waypoints
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700">
            {pregnancyInfo.milestones.filter(m => m.passed).length} of {pregnancyInfo.milestones.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {pregnancyInfo.milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition ${
                milestone.passed
                  ? 'bg-rose-50/50 border-rose-200 text-slate-800'
                  : 'bg-slate-50/60 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  milestone.passed ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  Week {milestone.week}
                </span>
                {milestone.passed && (
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                )}
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-1">
                {milestone.name}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {milestone.date ? milestone.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
