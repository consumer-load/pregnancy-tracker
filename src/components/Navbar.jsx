import React from 'react';
import { 
  Baby, 
  Apple, 
  Bot, 
  Wrench, 
  Calendar, 
  Settings,
  Sparkles,
  Heart
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  pregnancyInfo, 
  onOpenSettings,
  language,
  setLanguage
}) {
  const isUrdu = language === 'urdu';

  const mainTabs = [
    { 
      id: 'dashboard', 
      label: isUrdu ? 'Mera Hafta (My Week)' : 'My Week', 
      icon: Baby 
    },
    { 
      id: 'nutrition', 
      label: isUrdu ? 'Khorak (Diet & Food)' : 'Diet & Food', 
      icon: Apple 
    },
    { 
      id: 'ai-doctor', 
      label: isUrdu ? 'Doctor AI' : 'Ask AI Doctor', 
      icon: Bot, 
      highlight: true 
    },
    { 
      id: 'tools', 
      label: isUrdu ? 'Tools & Samaan' : 'Tools & Bag', 
      icon: Wrench 
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-300 flex items-center justify-center text-white shadow-md shadow-rose-200">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  BloomMom AI
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Easy Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {isUrdu ? 'Ovulation se Delivery tak Asaan Guide' : 'Ovulation to Delivery • AI Obstetrics Companion'}
              </p>
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isUrdu ? 'en' : 'urdu')}
              className="px-2.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center space-x-1"
              title="Toggle Easy Roman Urdu / English"
            >
              <span>🌐</span>
              <span>{isUrdu ? 'English' : 'Roman Urdu'}</span>
            </button>

            {/* Change Dates Button */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              title="Change Due Date / Calculation Method"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">{isUrdu ? 'Tareekh Badlein' : 'Set Date'}</span>
            </button>
          </div>
        </div>

        {/* Big Easy 4-Tab Navigation */}
        <nav className="grid grid-cols-4 gap-1.5 py-2 border-t border-slate-100 text-xs sm:text-sm font-bold">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 sm:px-3 rounded-xl flex items-center justify-center space-x-1.5 transition text-center ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                    : tab.highlight
                    ? 'text-pink-600 bg-pink-50/70 hover:bg-pink-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
                {tab.highlight && !isActive && (
                  <Sparkles className="w-3 h-3 text-amber-500 hidden sm:inline" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
