
import React, { useState } from 'react';
import { PoetryStyle } from '../types.ts';

interface InputFormProps {
  onGenerate: (keywords: string, style: PoetryStyle) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [keywords, setKeywords] = useState('');
  const [style, setStyle] = useState<PoetryStyle>(PoetryStyle.WU_JU);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywords.trim()) {
      onGenerate(keywords, style);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="group">
        <label className="block text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
          输入意象或心境
        </label>
        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="例如：终南山雪、西湖雨后、故乡的老槐树..."
          className="w-full h-40 p-6 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-red-800/5 focus:border-red-800 transition-all bg-white/50 text-xl font-serif resize-none shadow-sm"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
          选择体裁
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.values(PoetryStyle).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={`py-4 px-6 rounded-xl border-2 transition-all font-serif text-lg ${
                style === s
                  ? 'bg-red-800 text-white border-red-800 shadow-lg transform -translate-y-1'
                  : 'bg-white/80 text-slate-600 border-slate-200 hover:border-red-800/30 hover:text-red-800'
              }`}
              disabled={isLoading}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isLoading || !keywords.trim()}
          className="relative group h-16 w-64 bg-slate-900 text-white text-xl font-bold rounded-full overflow-hidden transition-all shadow-2xl disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.5em]">
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              '创作诗篇'
            )}
          </span>
          <div className="absolute inset-0 bg-red-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>
    </form>
  );
};

export default InputForm;
