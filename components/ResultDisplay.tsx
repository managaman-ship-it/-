
import React from 'react';
import { PoetryResult } from '../types.ts';

interface ResultDisplayProps {
  result: PoetryResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-2xl bg-[#fffef9] border-x-[12px] border-slate-200/50 shadow-2xl px-8 py-16 md:px-20 md:py-24 rounded-sm" id="poem-scroll">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-800/5"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-800/5"></div>
        
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 font-serif tracking-widest">{result.title}</h2>
          <p className="text-slate-400 mb-12 text-xl font-serif italic tracking-widest">[{result.author}]</p>
          
          <div className="space-y-8">
            {result.content.map((line, idx) => (
              <p key={idx} className="text-3xl md:text-4xl text-slate-800 tracking-[0.3em] font-calligraphy leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-dotted border-slate-300">
          <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-[0.4em] text-center">意境赏析</h3>
          <p className="text-slate-500 leading-relaxed text-center font-serif italic px-6 text-lg">
            {result.interpretation}
          </p>
        </div>

        {/* Seal */}
        <div className="absolute bottom-10 right-10 opacity-30 select-none pointer-events-none">
          <div className="w-20 h-20 border-[3px] border-red-800 text-red-800 flex items-center justify-center font-bold text-xl rotate-[-15deg]">
            <span className="text-center leading-none">墨韵<br/>清赏</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6 no-print">
        <button
          onClick={onReset}
          className="px-10 py-4 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all rounded-full font-bold text-lg tracking-widest"
        >
          重起云烟
        </button>
        <button
          onClick={() => window.print()}
          className="px-10 py-4 bg-red-800 text-white hover:bg-red-900 transition-all rounded-full font-bold text-lg shadow-xl tracking-widest"
        >
          保存诗笺
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          #poem-scroll { border: none !important; shadow: none !important; margin: 0 !important; width: 100% !important; max-width: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;
