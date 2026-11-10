import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, MapPin, Stethoscope, Printer, Trash2, FileCheck } from 'lucide-react';
import { getStoredAppointments, saveStoredAppointments } from '../utils/storage';

export default function AppointmentsLog({ pregnancyInfo, settings }) {
  const [appointments, setAppointments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [bp, setBp] = useState('');

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    const newApt = {
      id: `apt-${Date.now()}`,
      title,
      doctor: doctor || 'OB-GYN Provider',
      date,
      time: time || '10:00 AM',
      location: location || 'Maternity Clinic',
      notes,
      bp,
    };

    const updated = [newApt, ...appointments];
    setAppointments(updated);
    saveStoredAppointments(updated);

    // Reset & close
    setTitle('');
    setDoctor('');
    setDate('');
    setTime('');
    setLocation('');
    setNotes('');
    setBp('');
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    saveStoredAppointments(updated);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Print / Export Option */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Doctor Appointments & Clinical Log
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Keep track of prenatal checkups, ultrasounds, vitals, and questions for your OB-GYN
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrintSummary}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Summary</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Visit</span>
          </button>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {apt.title}
                  </h3>
                  <span className="text-xs text-slate-500">{apt.doctor}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-rose-50 px-3 py-1 rounded-xl text-xs font-bold text-rose-700">
                  {apt.date} • {apt.time}
                </div>
                <button
                  onClick={() => handleDelete(apt.id)}
                  className="text-slate-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{apt.location}</span>
              </div>
              {apt.bp && (
                <div className="flex items-center space-x-2 text-slate-600">
                  <FileCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Blood Pressure: <strong>{apt.bp} mmHg</strong></span>
                </div>
              )}
            </div>

            {apt.notes && (
              <div className="mt-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-700">
                <strong className="text-slate-900 block mb-0.5">Notes & Questions Asked:</strong>
                <p className="leading-relaxed whitespace-pre-wrap">{apt.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Add Prenatal Checkup
            </h3>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Visit Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24-Week Glucose Screen or Routine Checkup"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Doctor / Clinic
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Smith (OB-GYN)"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 118/76"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="10:30 AM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Location / Room
                </label>
                <input
                  type="text"
                  placeholder="Main Hospital, Suite 400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Questions to Ask Doctor & Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Ask about birth plan options, ultrasound scan, glucose test instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-rose-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
