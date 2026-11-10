import React, { useState, useEffect } from 'react';
import { Heart, Search, Sparkles, Bookmark } from 'lucide-react';
import { BABY_NAMES_DATABASE } from '../data/babyNamesData';
import { getStoredSavedNames, saveStoredSavedNames } from '../utils/storage';

export default function BabyNames() {
  const [filterGender, setFilterGender] = useState('all'); // 'all' | 'girl' | 'boy' | 'unisex' | 'saved'
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    setSavedIds(getStoredSavedNames());
  }, []);

  const handleToggleFavorite = (id) => {
    let updated;
    if (savedIds.includes(id)) {
      updated = savedIds.filter((item) => item !== id);
    } else {
      updated = [...savedIds, id];
    }
    setSavedIds(updated);
    saveStoredSavedNames(updated);
  };

  const filteredNames = BABY_NAMES_DATABASE.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterGender === 'saved') {
      return savedIds.includes(item.id) && matchesSearch;
    }
    const matchesGender = filterGender === 'all' || item.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-pink-900/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Baby Name Inspiration</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Find the Perfect Name for Baby
          </h2>
          <p className="text-white/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Browse beautiful curated names with deep meanings and origins. Tap the heart icon to save names to your personal shortlist.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, origin or meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-400 text-slate-800"
          />
        </div>

        {/* Gender Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setFilterGender('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterGender === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Names
          </button>
          <button
            onClick={() => setFilterGender('girl')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterGender === 'girl'
                ? 'bg-pink-500 text-white shadow-xs'
                : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
            }`}
          >
            Baby Girls
          </button>
          <button
            onClick={() => setFilterGender('boy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterGender === 'boy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Baby Boys
          </button>
          <button
            onClick={() => setFilterGender('unisex')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterGender === 'unisex'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            Unisex
          </button>
          <button
            onClick={() => setFilterGender('saved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1 ${
              filterGender === 'saved'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Shortlist ({savedIds.length})</span>
          </button>
        </div>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredNames.map((item) => {
          const isSaved = savedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-rose-100 p-5 shadow-xs hover:shadow-md transition relative flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-slate-900 text-lg">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleToggleFavorite(item.id)}
                    className="p-1.5 rounded-full hover:bg-rose-50 transition"
                    title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
                  >
                    <Heart
                      className={`w-4 h-4 transition ${
                        isSaved
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-slate-300 hover:text-rose-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.gender === 'girl'
                        ? 'bg-pink-100 text-pink-700'
                        : item.gender === 'boy'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {item.gender}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.origin}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic mt-2">
                  "{item.meaning}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
