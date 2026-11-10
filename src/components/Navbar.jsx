import React from 'react';
import { 
  Baby, 
  Apple, 
  Bot, 
  Timer, 
  Activity, 
  Scale, 
  Luggage, 
  Heart, 
  AlertTriangle, 
  Calendar, 
  Settings,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  pregnancyInfo, 
  onOpenSettings 
}) {
  const tabs = [
    { id: 'dashboard', label: 'My Journey', icon: Baby },
    { id: 'nutrition', label: 'Diet & Nutrition', icon: Apple },
    { id: 'ai-doctor', label: 'Dr. Bloom AI', icon: Bot, highlight: true },
    { id: 'contractions', label: 'Contractions', icon: Timer },
    { id: 'kicks', label: 'Kick Counter', icon: Activity },
    { id: 'weight', label: 'Weight & Vitals', icon: Scale },
    { id: 'appointments', label: 'Doctor Visits', icon: Calendar },
    { id: 'hospital-bag', label: 'Hospital Bag', icon: Luggage },
    { id: 'names', label: 'Baby Names', icon: Heart },
    { id: 'red-flags', label: 'Red Flags', icon: AlertTriangle, danger: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Banner with App Brand & Quick Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-300 flex items-center justify-center text-white shadow-md shadow-rose-200">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  BloomMom AI
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 uppercase tracking-wider">
                  Cloud Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Ovulation to Delivery • AI Obstetrics Companion
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex items-center bg-rose-50 border border-rose-200/80 rounded-full px-3 py-1.5 text-xs">
              <span className="font-semibold text-rose-800">
                Week {pregnancyInfo.currentWeek}, Day {pregnancyInfo.currentDayInWeek}
              </span>
              <span className="mx-2 text-rose-300">•</span>
              <span className="font-medium text-rose-700">
                {pregnancyInfo.trimesterLabel}
              </span>
              <span className="mx-2 text-rose-300">•</span>
              <span className="text-slate-600 font-medium">
                {pregnancyInfo.daysRemaining} days left
              </span>
            </div>

            {/* Change Dates / Settings Button */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              title="Change Due Date / Calculation Method"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Dates & Settings</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-100 text-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition text-xs sm:text-sm ${
                  isActive
                    ? tab.danger
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                    : tab.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : tab.highlight
                    ? 'text-pink-600 hover:bg-pink-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                <span>{tab.label}</span>
                {tab.highlight && !isActive && (
                  <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
