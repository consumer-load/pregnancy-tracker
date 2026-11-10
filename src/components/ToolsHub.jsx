import React, { useState } from 'react';
import { 
  Timer, 
  Activity, 
  Scale, 
  Luggage, 
  Heart, 
  AlertTriangle, 
  Calendar,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import ContractionTimer from './ContractionTimer';
import KickCounter from './KickCounter';
import WeightTracker from './WeightTracker';
import AppointmentsLog from './AppointmentsLog';
import HospitalBag from './HospitalBag';
import BabyNames from './BabyNames';
import RedFlagsGuide from './RedFlagsGuide';

export default function ToolsHub({ pregnancyInfo, settings, initialSubTool = null }) {
  const [activeSubTool, setActiveSubTool] = useState(initialSubTool);

  const tools = [
    {
      id: 'contractions',
      title: 'Contraction Timer',
      urduTitle: 'Dard-e-Zeh (Contraction) Timer',
      desc: 'Time your surges & get 5-1-1 hospital alert',
      urduDesc: 'Dard ka time note karein aur hospital jaane ka alert payein',
      icon: Timer,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      id: 'kicks',
      title: 'Baby Kick Counter',
      urduTitle: 'Bachay ki Harqat (Kick Counter)',
      desc: 'Count 10 kicks to check baby movement',
      urduDesc: '10 kicks count kar ke bachay ki sehat check karein',
      icon: Activity,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
    },
    {
      id: 'hospital-bag',
      title: 'Hospital Bag Checklist',
      urduTitle: 'Hospital Bag ki Tayyari',
      desc: 'Checklist for Mom, Baby, and Partner',
      urduDesc: 'Maa, Bachay aur Partner ke samaan ki list',
      icon: Luggage,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'appointments',
      title: 'Doctor Visits & Vitals',
      urduTitle: 'Doctor ke Checkups aur BP',
      desc: 'Record prenatal visits & print doctor report',
      urduDesc: 'Doctor ke mashwaray aur reports mehfooz karein',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      id: 'weight',
      title: 'Weight Gain Tracker',
      urduTitle: 'Wazan (Weight) Tracker',
      desc: 'Track healthy pregnancy weight by BMI',
      urduDesc: 'Hafta-ba-hafta sehatmand wazan ka hisaab',
      icon: Scale,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      id: 'names',
      title: 'Baby Names Finder',
      urduTitle: 'Bachon ke Pyaray Naam',
      desc: 'Explore popular boy, girl & unisex names',
      urduDesc: 'Khoobsurat Islami aur modern naam maani ke sath',
      icon: Heart,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      id: 'red-flags',
      title: 'Emergency Red Flags',
      urduTitle: 'Khatray ki Alamaat (Emergency)',
      desc: 'Critical symptoms when you must call ER immediately',
      urduDesc: 'Khoon aana ya shaded dard par hospital kab jana hai',
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600 border-red-200',
      danger: true,
    },
  ];

  if (activeSubTool) {
    return (
      <div className="space-y-4">
        {/* Back Button */}
        <button
          onClick={() => setActiveSubTool(null)}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to All Tools / Wapis Tools Menu</span>
        </button>

        {activeSubTool === 'contractions' && <ContractionTimer />}
        {activeSubTool === 'kicks' && <KickCounter />}
        {activeSubTool === 'hospital-bag' && <HospitalBag />}
        {activeSubTool === 'appointments' && <AppointmentsLog pregnancyInfo={pregnancyInfo} settings={settings} />}
        {activeSubTool === 'weight' && <WeightTracker currentWeek={pregnancyInfo.currentWeek} settings={settings} />}
        {activeSubTool === 'names' && <BabyNames />}
        {activeSubTool === 'red-flags' && <RedFlagsGuide />}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10">
        <h2 className="text-2xl sm:text-3xl font-black">
          Pregnancy Tools & Checklists 🧰
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1">
          Everything you need in one easy place: Kick counter, Contraction timer, Hospital bag, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => setActiveSubTool(tool.id)}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group hover:border-rose-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${tool.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-rose-600 transition">
                    {tool.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-rose-600 block">
                    {tool.urduTitle}
                  </span>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-rose-600 transition">
                <span>Open Tool</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
