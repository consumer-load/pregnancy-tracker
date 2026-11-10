import React, { useState } from 'react';
import { 
  Apple, 
  Search, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  Coffee, 
  ShieldAlert, 
  Flame, 
  Heart, 
  Info,
  ChevronDown
} from 'lucide-react';
import { 
  FOODS_SAFETY_DATABASE, 
  FOOD_SAFETY_CATEGORIES, 
  TRIMESTER_MEAL_PLANS, 
  SYMPTOM_DIET_REMEDIES, 
  KEY_MICRONUTRIENTS 
} from '../data/nutritionData';

export default function NutritionHub({ currentWeek, trimester }) {
  const [activeTab, setActiveTab] = useState('foods-avoid'); // 'foods-avoid' | 'meal-plans' | 'symptoms' | 'nutrients'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'avoid' | 'caution' | 'beneficial'
  const [selectedTrimester, setSelectedTrimester] = useState(trimester || 2);

  // Filter food safety database
  const filteredFoods = FOODS_SAFETY_DATABASE.filter((food) => {
    const matchesSearch = 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.safeAlternatives.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || food.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const activeMealPlan = TRIMESTER_MEAL_PLANS[selectedTrimester] || TRIMESTER_MEAL_PLANS[2];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-900/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Apple className="w-3.5 h-3.5" />
            <span>Maternal Nutrition & Diet Hub</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Nourishing You & Baby: Week-by-Week
          </h2>
          <p className="text-white/90 text-sm sm:text-base mt-2 leading-relaxed">
            Science-backed obstetrics dietary guidance. Check food safety, avoid harmful toxins, relieve pregnancy discomforts, and follow trimester meal plans.
          </p>
        </div>
      </div>

      {/* Hub Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2 sm:gap-6 text-sm font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab('foods-avoid')}
          className={`pb-3 px-1 border-b-2 transition whitespace-nowrap flex items-center space-x-2 ${
            activeTab === 'foods-avoid'
              ? 'border-rose-500 text-rose-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <span>Food Safety & "Can I Eat This?"</span>
        </button>

        <button
          onClick={() => setActiveTab('meal-plans')}
          className={`pb-3 px-1 border-b-2 transition whitespace-nowrap flex items-center space-x-2 ${
            activeTab === 'meal-plans'
              ? 'border-emerald-500 text-emerald-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Utensils className="w-4 h-4 text-emerald-500" />
          <span>Trimester Meal Plans</span>
        </button>

        <button
          onClick={() => setActiveTab('symptoms')}
          className={`pb-3 px-1 border-b-2 transition whitespace-nowrap flex items-center space-x-2 ${
            activeTab === 'symptoms'
              ? 'border-amber-500 text-amber-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Symptom Food Remedies</span>
        </button>

        <button
          onClick={() => setActiveTab('nutrients')}
          className={`pb-3 px-1 border-b-2 transition whitespace-nowrap flex items-center space-x-2 ${
            activeTab === 'nutrients'
              ? 'border-indigo-500 text-indigo-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Key Micronutrients</span>
        </button>
      </div>

      {/* TAB 1: FOOD SAFETY & WHAT TO AVOID */}
      {activeTab === 'foods-avoid' && (
        <div className="space-y-6">
          {/* Search & Filter Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search food (e.g. coffee, feta, sushi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-400 focus:bg-white text-slate-800"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filterCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Foods ({FOODS_SAFETY_DATABASE.length})
              </button>
              <button
                onClick={() => setFilterCategory(FOOD_SAFETY_CATEGORIES.AVOID)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1 ${
                  filterCategory === FOOD_SAFETY_CATEGORIES.AVOID
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Strictly Avoid</span>
              </button>
              <button
                onClick={() => setFilterCategory(FOOD_SAFETY_CATEGORIES.CAUTION)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1 ${
                  filterCategory === FOOD_SAFETY_CATEGORIES.CAUTION
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Limit / Caution</span>
              </button>
              <button
                onClick={() => setFilterCategory(FOOD_SAFETY_CATEGORIES.BENEFICIAL)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1 ${
                  filterCategory === FOOD_SAFETY_CATEGORIES.BENEFICIAL
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Superfoods</span>
              </button>
            </div>
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFoods.map((item, idx) => {
              const isAvoid = item.category === FOOD_SAFETY_CATEGORIES.AVOID;
              const isCaution = item.category === FOOD_SAFETY_CATEGORIES.CAUTION;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border p-5 transition shadow-xs hover:shadow-md ${
                    isAvoid
                      ? 'border-red-200/80 hover:border-red-300'
                      : isCaution
                      ? 'border-amber-200/80 hover:border-amber-300'
                      : 'border-emerald-200/80 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {item.group}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">
                        {item.name}
                      </h4>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center space-x-1 ${
                        isAvoid
                          ? 'bg-red-100 text-red-700'
                          : isCaution
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isAvoid && <AlertOctagon className="w-3 h-3" />}
                      {isCaution && <AlertTriangle className="w-3 h-3" />}
                      {!isAvoid && !isCaution && <CheckCircle2 className="w-3 h-3" />}
                      <span>{item.badge}</span>
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                      <strong className="text-slate-900 font-semibold block mb-0.5">
                        {isAvoid ? 'Why it is dangerous:' : isCaution ? 'Clinical Caution:' : 'Why it is beneficial:'}
                      </strong>
                      <p className="leading-relaxed">{item.reason}</p>
                    </div>

                    <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60 text-emerald-900">
                      <strong className="text-emerald-950 font-semibold block mb-0.5">
                        {isAvoid ? 'Safe Alternatives & Preparation:' : 'Optimal Serving Guidance:'}
                      </strong>
                      <p className="leading-relaxed">{item.safeAlternatives}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TRIMESTER MEAL PLANS */}
      {activeTab === 'meal-plans' && (
        <div className="space-y-6">
          {/* Trimester Switcher */}
          <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrimester(t)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                  selectedTrimester === t
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Trimester {t} {t === trimester ? '(Current)' : ''}
              </button>
            ))}
          </div>

          {/* Active Trimester Card */}
          <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block">
                  Diet Blueprint
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeMealPlan.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Focus: {activeMealPlan.focus}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 text-xs font-bold text-amber-900">
                ⚡ Caloric Goal: {activeMealPlan.calorieBonus}
              </div>
            </div>

            {/* Daily Menu Blueprint */}
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                  🍳 Energizing Breakfast
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeMealPlan.meals.breakfast}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                  🍎 Mid-Morning Sustenance Snack
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeMealPlan.meals.midMorningSnack}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  🥗 Wholesome Balanced Lunch
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeMealPlan.meals.lunch}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  🥑 Afternoon Energy Snack
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeMealPlan.meals.afternoonSnack}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                  🍲 Nourishing Dinner
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeMealPlan.meals.dinner}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
                  🌙 Bedtime Blood Sugar Balancing Snack
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeMealPlan.meals.bedtimeBite}
                </p>
              </div>
            </div>

            {/* Trimester Doctor Tips */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Obstetrician Clinical Tips for Trimester {selectedTrimester}
              </h4>
              <ul className="space-y-2">
                {activeMealPlan.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SYMPTOM REMEDIES */}
      {activeTab === 'symptoms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SYMPTOM_DIET_REMEDIES.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    {item.symptom}
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Dietary Comfort & Relief
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                  <strong className="text-emerald-950 font-semibold block mb-1">
                    ✅ Foods That Provide Relief:
                  </strong>
                  <ul className="list-disc list-inside space-y-0.5 text-emerald-900">
                    {item.recommendedFoods.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/70 p-3 rounded-2xl border border-red-100">
                  <strong className="text-red-950 font-semibold block mb-1">
                    🚫 Foods to Avoid:
                  </strong>
                  <ul className="list-disc list-inside space-y-0.5 text-red-900">
                    {item.foodsToAvoid.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 text-amber-900 leading-relaxed font-medium">
                  <strong>Doctor's Tip:</strong> {item.clinicalTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: KEY MICRONUTRIENTS */}
      {activeTab === 'nutrients' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {KEY_MICRONUTRIENTS.map((nutrient, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {nutrient.name}
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  {nutrient.dailyTarget}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                <strong className="text-slate-800">Role:</strong> {nutrient.role}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  Natural Sources
                </span>
                <p className="font-medium text-slate-800">{nutrient.sources}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
