import React from 'react';
import { AlertOctagon, PhoneCall, ShieldAlert, HeartPulse, CheckCircle2 } from 'lucide-react';
import { RED_FLAG_SYMPTOMS } from '../data/redFlagsData';

export default function RedFlagsGuide() {
  return (
    <div className="space-y-6 pb-12">
      {/* Critical Attention Header */}
      <div className="bg-red-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-red-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-start space-x-3">
            <AlertOctagon className="w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                Pregnancy Emergency & Red Flag Guide
              </h2>
              <p className="text-sm text-red-100 mt-1 leading-relaxed">
                When to bypass waiting and contact your hospital's Labor & Delivery triage or emergency services immediately.
              </p>
            </div>
          </div>

          <a
            href="tel:911"
            className="flex items-center space-x-2 bg-white text-red-600 px-5 py-2.5 rounded-2xl font-extrabold text-xs shadow-md hover:bg-red-50 transition shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Emergency Services</span>
          </a>
        </div>
      </div>

      {/* Red Flag Symptoms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RED_FLAG_SYMPTOMS.map((item, idx) => {
          const isCritical = item.severity === 'CRITICAL';
          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl border p-6 shadow-sm transition hover:shadow-md ${
                isCritical ? 'border-red-200/90' : 'border-amber-200/90'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-extrabold text-slate-900 text-base">
                  {item.title}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isCritical
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.severity}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                {item.description}
              </p>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600">
                  <strong className="text-slate-800 block mb-0.5">Potential Cause:</strong>
                  <span>{item.possibleCauses}</span>
                </div>

                <div className="bg-red-50 p-2.5 rounded-xl border border-red-100 text-red-900 font-semibold">
                  <strong className="text-red-950 block mb-0.5">Action to Take Immediately:</strong>
                  <span>{item.action}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reassurance Footer */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 text-xs text-emerald-900 flex items-start space-x-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong>Trust Your Maternal Instinct:</strong> Maternity wards and OB-GYN triage lines are open 24 hours a day, 365 days a year. Obstetricians and labor nurses would <em>always</em> prefer you call and get checked out even if everything turns out to be completely fine!
        </div>
      </div>
    </div>
  );
}
