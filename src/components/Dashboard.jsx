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
  Stethoscope,
  Activity,
  Luggage,
  CalendarDays
} from 'lucide-react';
import { PREGNANCY_WEEKS } from '../data/pregnancyWeeksData';

export default function Dashboard({ 
  pregnancyInfo, 
  settings, 
  onNavigateTab,
  onOpenSettings,
  language = 'en'
}) {
  const isUrdu = language === 'urdu';
  const [viewWeek, setViewWeek] = useState(pregnancyInfo.currentWeek);

  const weekData = PREGNANCY_WEEKS[viewWeek] || PREGNANCY_WEEKS[40];
  const isActualCurrentWeek = viewWeek === pregnancyInfo.currentWeek;

  // Approximate pregnancy month (1-9)
  const monthNumber = Math.min(9, Math.max(1, Math.ceil(pregnancyInfo.currentWeek / 4.4)));

  const handlePrevWeek = () => {
    if (viewWeek > 1) setViewWeek(viewWeek - 1);
  };

  const handleNextWeek = () => {
    if (viewWeek < 42) setViewWeek(viewWeek + 1);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Super Friendly Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 p-6 sm:p-8 text-white shadow-xl shadow-rose-200/50">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Week & Month Info */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white/95">
              <CalendarDays className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {isUrdu 
                  ? `Mahina ${monthNumber} (Month ${monthNumber}) • ${pregnancyInfo.trimesterLabel}`
                  : `Month ${monthNumber} of 9 • ${pregnancyInfo.trimesterLabel}`}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                {isUrdu ? `Hafta ${pregnancyInfo.currentWeek}` : `Week ${pregnancyInfo.currentWeek}`}
                <span className="text-xl sm:text-2xl font-light text-rose-100 ml-2">
                  (+{pregnancyInfo.currentDayInWeek} {isUrdu ? 'Din' : 'Days'})
                </span>
              </h1>
              <p className="text-rose-100 text-sm sm:text-base mt-1.5 font-medium">
                {isUrdu ? 'Delivery ki Tareekh:' : 'Estimated Due Date:'}{' '}
                <strong className="text-white underline decoration-amber-300 underline-offset-4">
                  {pregnancyInfo.formattedDueDate}
                </strong>
                <span className="ml-2 font-bold text-amber-200">
                  ({pregnancyInfo.daysRemaining} {isUrdu ? 'din baqi' : 'days left'})
                </span>
              </p>
            </div>

            {/* Delivery Progress Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-bold text-rose-100">
                <span>{pregnancyInfo.totalDays} {isUrdu ? 'Din Guzar Gaye' : 'Days Completed'}</span>
                <span>{pregnancyInfo.progressPercent}% {isUrdu ? 'Mukammal' : 'Complete'}</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-3.5 p-0.5 overflow-hidden backdrop-blur-xs">
                <div 
                  className="bg-gradient-to-r from-amber-200 via-white to-pink-100 h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${pregnancyInfo.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Easy Quick Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button 
                onClick={() => onNavigateTab('nutrition')} 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <Apple className="w-4 h-4 text-emerald-200" />
                <span>{isUrdu ? 'Khorak & Diet Guide' : 'What to Eat & Avoid'}</span>
              </button>
              <button 
                onClick={() => onNavigateTab('ai-doctor')} 
                className="bg-amber-300 text-slate-900 hover:bg-amber-200 px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition shadow-sm"
              >
                <Stethoscope className="w-4 h-4 text-rose-600" />
                <span>{isUrdu ? 'Doctor se Sawal Poochein' : 'Ask AI Doctor'}</span>
              </button>
              <button 
                onClick={onOpenSettings} 
                className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl text-xs font-medium text-rose-100 transition"
              >
                {isUrdu ? 'Tareekh Set Karein' : 'Change Dates'}
              </button>
            </div>
          </div>

          {/* Right: Baby Size Illustration Card */}
          <div className="lg:col-span-5 bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-6 text-center shadow-inner relative">
            <div className="text-6xl sm:text-7xl mb-2 drop-shadow-md animate-bounce duration-1000">
              {weekData.fruitEmoji}
            </div>
            <p className="text-xs font-bold text-amber-200 uppercase tracking-widest">
              {isUrdu ? 'Bachay Ka Size' : 'Baby Size Today'}
            </p>
            <h3 className="text-2xl font-black text-white mt-0.5">
              {weekData.fruit}
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/20 text-left">
              <div className="bg-white/10 rounded-2xl p-2.5 text-center">
                <span className="text-[10px] text-rose-200 block uppercase font-bold">
                  {isUrdu ? 'Lambaai (Length)' : 'Length'}
                </span>
                <span className="text-base font-extrabold text-white">
                  {weekData.lengthCm} cm
                </span>
                <span className="text-[11px] text-white/80 block">
                  ({weekData.lengthIn} inches)
                </span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5 text-center">
                <span className="text-[10px] text-rose-200 block uppercase font-bold">
                  {isUrdu ? 'Wazan (Weight)' : 'Weight'}
                </span>
                <span className="text-base font-extrabold text-white">
                  {weekData.weightG} g
                </span>
                <span className="text-[11px] text-white/80 block">
                  ({weekData.weightOz})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Navigator (Easy Slider) */}
      <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            W{viewWeek}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">
              {isUrdu ? `Hafta ${viewWeek} ki Maloomat` : `Week ${viewWeek} Details`}
              {!isActualCurrentWeek && (
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  Preview
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-500">
              {weekData.fruitEmoji} {weekData.fruit}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevWeek}
            disabled={viewWeek <= 1}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {!isActualCurrentWeek && (
            <button
              onClick={() => setViewWeek(pregnancyInfo.currentWeek)}
              className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 font-semibold text-xs hover:bg-rose-200 transition"
            >
              {isUrdu ? 'Mera Hafta' : 'Back to Current'}
            </button>
          )}

          <select
            value={viewWeek}
            onChange={(e) => setViewWeek(Number(e.target.value))}
            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-rose-500"
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
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Easy Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Baby Highlights */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{weekData.fruitEmoji}</span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isUrdu ? 'Bachay ki Sehat & Nashonuma' : 'Baby This Week'}
              </h3>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'Pet me bacha kya kar raha hai' : 'Developmental milestones'}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-100/60 font-medium">
            {weekData.babyHighlights}
          </p>
        </div>

        {/* Mom's Feelings & Symptoms */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isUrdu ? 'Maa ki Sehat aur Alamaat' : "Mom's Body & Symptoms"}
              </h3>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'Aap is hafte kaisa mehsoos kareingi' : 'What you might experience'}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-rose-50/60 p-4 rounded-2xl border border-rose-100/60 font-medium">
            {weekData.momBody}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {weekData.symptoms.map((s, idx) => (
              <span key={idx} className="bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* What to Eat This Week */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <Apple className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isUrdu ? 'Is Hafte Kya Khana Hai?' : 'Nutrition Focus'}
              </h3>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'Bachay aur aapke liye behtareen khorak' : 'Top fuel for this stage'}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 font-medium">
            {weekData.nutritionFocus}
          </p>
          <button 
            onClick={() => onNavigateTab('nutrition')}
            className="mt-3 text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
          >
            <span>{isUrdu ? 'Poori Diet List Dekhein →' : 'See Full Diet & Avoid List →'}</span>
          </button>
        </div>

        {/* Doctor's Checklist */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle2 className="w-6 h-6 text-indigo-600" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isUrdu ? 'Doctor ka Mashwara' : "Doctor's Advice This Week"}
              </h3>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'Zaroori hidayat aur tests' : 'Key checkups & self-care'}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {weekData.checklist.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
