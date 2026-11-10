import React, { useState, useEffect } from 'react';
import { Luggage, Check, Plus, Trash2, CheckCircle2, ShieldCheck, FileText, Baby, Heart, Sparkles } from 'lucide-react';
import { DEFAULT_HOSPITAL_BAG } from '../data/hospitalBagData';
import { getStoredHospitalBag, saveStoredHospitalBag } from '../utils/storage';

export default function HospitalBag() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [newItemText, setNewItemText] = useState('');
  const [newItemCat, setNewItemCat] = useState('mom');

  useEffect(() => {
    setItems(getStoredHospitalBag(DEFAULT_HOSPITAL_BAG));
  }, []);

  const handleToggle = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setItems(updated);
    saveStoredHospitalBag(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      category: newItemCat,
      text: newItemText.trim(),
      packed: false,
    };

    const updated = [...items, newItem];
    setItems(updated);
    saveStoredHospitalBag(updated);
    setNewItemText('');
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveStoredHospitalBag(updated);
  };

  const totalCount = items.length;
  const packedCount = items.filter((i) => i.packed).length;
  const packedPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const categories = [
    { id: 'all', label: 'All Items', icon: Luggage },
    { id: 'documents', label: 'Documents & IDs', icon: FileText },
    { id: 'mom', label: 'For Mom', icon: Heart },
    { id: 'baby', label: 'For Baby', icon: Baby },
    { id: 'partner', label: 'For Partner', icon: Sparkles },
  ];

  const filteredItems = items.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Progress Header Card */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Luggage className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Hospital Bag Checklist
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Be ready for labor & delivery anytime starting at Week 35!
            </p>
          </div>

          <div className="bg-rose-50 px-4 py-2 rounded-2xl border border-rose-100 text-xs font-bold text-rose-700">
            {packedCount} of {totalCount} Items Packed ({packedPercent}%)
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${packedPercent}%` }}
          />
        </div>
      </div>

      {/* Category Pills & Add Item Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Add Custom Item */}
        <form onSubmit={handleAddItem} className="flex items-center space-x-2 w-full md:w-auto">
          <select
            value={newItemCat}
            onChange={(e) => setNewItemCat(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-semibold focus:outline-rose-500"
          >
            <option value="mom">Mom</option>
            <option value="baby">Baby</option>
            <option value="partner">Partner</option>
            <option value="documents">Docs</option>
          </select>
          <input
            type="text"
            placeholder="Add custom item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-rose-500"
          />
          <button
            type="submit"
            className="p-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            title="Add item"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
              item.packed
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                : 'bg-white border-rose-100/80 text-slate-800 hover:border-rose-300 shadow-xs'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 ${
                  item.packed
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {item.packed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold leading-relaxed">
                {item.text}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteItem(item.id);
              }}
              className="text-slate-300 hover:text-red-500 p-1 transition shrink-0"
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
