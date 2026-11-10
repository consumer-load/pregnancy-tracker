import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Key, 
  ShieldAlert, 
  User, 
  CheckCircle, 
  AlertTriangle,
  RotateCcw,
  Zap
} from 'lucide-react';
import { askPregnancyAI } from '../utils/aiDoctorEngine';

export default function AIAssistant({ 
  currentWeek, 
  trimester, 
  settings, 
  onSaveSettings 
}) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### Welcome to Dr. Bloom AI! 🌸

I am your personal Obstetrics & Pregnancy AI Companion. You are currently at **Week ${currentWeek}** (${trimester === 1 ? '1st' : trimester === 2 ? '2nd' : '3rd'} Trimester).

Feel free to ask me anything about:
- **Food & Nutrition Safety** ("Can I eat sushi?", "Safe caffeine limits")
- **Pregnancy Symptoms** ("Lower back twinges", "Acid reflux remedies", "Braxton Hicks vs Labor")
- **Medications** ("Can I take Tylenol or Motrin?")
- **Personalized Meal Ideas** for your cravings or aversions
- **Labor Readiness & 5-1-1 Rule**

*Note: My answers are for informational guidance and do not replace your personal OB-GYN or midwife. In an emergency, please call your local labor and delivery triage!*`,
      source: 'bloom',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(settings.geminiApiKey || '');
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Can I eat feta or soft cheeses?",
    "I have cramps today, is that normal?",
    "How to relieve acid reflux at night?",
    "What is the 5-1-1 rule for contractions?",
    "Safe pain relief: Tylenol vs Advil?",
    "Give me a high-protein dinner recipe",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user', content: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askPregnancyAI({
        question: query.trim(),
        currentWeek,
        trimester,
        userContext: settings,
        geminiApiKey: settings.geminiApiKey,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.content,
          source: response.source,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, an error occurred while processing your request. Please try again or rephrase your question.",
          source: 'error',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = () => {
    onSaveSettings({ ...settings, geminiApiKey: apiKeyInput.trim() });
    setShowKeyModal(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Chat history reset. How can I assist you with your pregnancy at Week ${currentWeek} today?`,
        source: 'bloom',
      },
    ]);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top AI Status Banner */}
      <div className="bg-white rounded-3xl border border-rose-100 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-slate-900 text-lg">
                Dr. Bloom AI Companion
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active</span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {settings.geminiApiKey
                ? '⚡ Powered by Google Gemini AI'
                : '🧠 Running Built-In Intelligent Obstetrics Engine (100% Free, No Setup)'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowKeyModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
          >
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>{settings.geminiApiKey ? 'Gemini Key Configured' : 'Add Gemini API Key'}</span>
          </button>
          <button
            onClick={handleResetChat}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs transition"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-sm flex flex-col h-[580px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs ${
                    isUser
                      ? 'bg-slate-800'
                      : 'bg-gradient-to-tr from-rose-500 to-pink-500'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-rose-500 text-white font-medium rounded-tr-xs shadow-sm'
                      : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:text-sm prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5">
                      <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
                    </div>
                  )}

                  {!isUser && msg.source === 'gemini' && (
                    <span className="block mt-2 text-[10px] text-slate-400 font-medium">
                      Generated via Gemini 1.5 Flash Cloud
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 rounded-tl-xs text-xs text-slate-500 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                <span>Dr. Bloom AI is analyzing clinical data for you...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Strip */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 overflow-x-auto no-scrollbar flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Try:</span>
          </span>
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition shadow-2xs font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Dr. Bloom about symptoms, food safety, weeks, test results..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-rose-500 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-rose-200 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Google Gemini API Key
                </h3>
                <p className="text-xs text-slate-500">
                  Optional: Unlock live cloud reasoning
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Dr. Bloom AI works <strong>100% out-of-the-box</strong> with built-in medical intelligence. If you want live, unlimited dynamic answers powered by Google's Gemini Flash model, paste your free Google AI Studio key below. It is stored <strong>only in your browser localStorage</strong>.
            </p>

            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Gemini API Key
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-rose-500"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-rose-600 underline">aistudio.google.com</a>
              </span>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-sm"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple safe markdown to HTML parser for clinical answers
function formatMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^### (.*$)/gim, '<h3 class="font-bold text-slate-900 text-sm mt-3 mb-1">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="font-bold text-slate-900 text-base mt-3 mb-1">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-0.5">$1</li>')
    .replace(/\n\n/g, '<br/>')
    .replace(/\n/g, ' ');
}
