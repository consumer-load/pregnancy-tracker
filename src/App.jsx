import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NutritionHub from './components/NutritionHub';
import AIAssistant from './components/AIAssistant';
import ContractionTimer from './components/ContractionTimer';
import KickCounter from './components/KickCounter';
import WeightTracker from './components/WeightTracker';
import AppointmentsLog from './components/AppointmentsLog';
import HospitalBag from './components/HospitalBag';
import BabyNames from './components/BabyNames';
import RedFlagsGuide from './components/RedFlagsGuide';
import SetupModal from './components/SetupModal';
import { calculatePregnancy } from './utils/pregnancyCalculator';
import { getStoredSettings, saveStoredSettings } from './utils/storage';
import { Heart, Cloud, ShieldCheck, GitBranch } from 'lucide-react';

export default function App() {
  const [settings, setSettings] = useState(getStoredSettings());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Calculate pregnancy statistics whenever settings change
  const pregnancyInfo = calculatePregnancy(settings);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f9] text-slate-800 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pregnancyInfo={pregnancyInfo}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            pregnancyInfo={pregnancyInfo}
            settings={settings}
            onNavigateTab={setActiveTab}
            onOpenSettings={() => setShowSettingsModal(true)}
          />
        )}

        {activeTab === 'nutrition' && (
          <NutritionHub
            currentWeek={pregnancyInfo.currentWeek}
            trimester={pregnancyInfo.trimester}
          />
        )}

        {activeTab === 'ai-doctor' && (
          <AIAssistant
            currentWeek={pregnancyInfo.currentWeek}
            trimester={pregnancyInfo.trimester}
            settings={settings}
            onSaveSettings={handleSaveSettings}
          />
        )}

        {activeTab === 'contractions' && <ContractionTimer />}

        {activeTab === 'kicks' && <KickCounter />}

        {activeTab === 'weight' && (
          <WeightTracker
            currentWeek={pregnancyInfo.currentWeek}
            settings={settings}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsLog
            pregnancyInfo={pregnancyInfo}
            settings={settings}
          />
        )}

        {activeTab === 'hospital-bag' && <HospitalBag />}

        {activeTab === 'names' && <BabyNames />}

        {activeTab === 'red-flags' && <RedFlagsGuide />}
      </main>

      {/* Date & Settings Configuration Modal */}
      {showSettingsModal && (
        <SetupModal
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* Warm Informative Footer */}
      <footer className="mt-auto border-t border-rose-100/80 bg-white/80 backdrop-blur-xs py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-900 text-sm bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                BloomMom AI
              </span>
              <span>• Complete Ovulation to Delivery Tracker & Diet Companion</span>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <span className="flex items-center space-x-1 text-slate-600 font-medium">
                <Cloud className="w-3.5 h-3.5 text-amber-500" />
                <span>Cloudflare Pages Ready</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-slate-600 font-medium">
                <GitBranch className="w-3.5 h-3.5 text-slate-800" />
                <span>GitHub Version Controlled</span>
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-left leading-relaxed pt-2 border-t border-slate-100">
            <strong>Medical Disclaimer:</strong> BloomMom AI is designed for informational, educational, and tracking purposes only. It is not a substitute for professional medical diagnosis, advice, or treatment from your obstetrician, gynecologist, or healthcare provider. In an emergency or severe symptoms, please immediately visit the nearest Emergency Room or Labor & Delivery triage unit.
          </div>
        </div>
      </footer>
    </div>
  );
}
