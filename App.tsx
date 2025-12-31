
import React, { useState, useCallback } from 'react';
import { PoetryStyle, GenerationState } from './types.ts';
import { generatePoem } from './services/geminiService.ts';
import InputForm from './components/InputForm.tsx';
import ResultDisplay from './components/ResultDisplay.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleGenerate = useCallback(async (keywords: string, style: PoetryStyle) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await generatePoem(keywords, style);
      setState({ isLoading: false, error: null, result });
    } catch (err: any) {
      console.error("Generate Error:", err);
      setState({ 
        isLoading: false, 
        error: err.message || "创作中断，请稍后重试", 
        result: null 
      });
    }
  }, []);

  const handleReset = () => {
    setState({ isLoading: false, error: null, result: null });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-x-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-no-repeat bg-contain bg-right-top" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/natural-paper.png)' }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-no-repeat bg-contain bg-left-bottom" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)' }}></div>
      </div>

      <header className="relative z-10 text-center mb-10">
        <h1 className="text-5xl sm:text-7xl font-bold text-slate-800 mb-4 tracking-[0.2em] font-serif">墨韵诗境</h1>
        <div className="h-px w-32 bg-slate-400 mx-auto mb-4"></div>
        <p className="text-slate-600 text-lg tracking-widest font-light">AI 赋能 · 共话千古风流</p>
      </header>

      <main className="relative z-10 w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 overflow-hidden min-h-[500px] flex flex-col justify-center">
        <div className="p-6 sm:p-10">
          {!state.result ? (
            <div className="transition-all duration-500">
              <InputForm onGenerate={handleGenerate} isLoading={state.isLoading} />
              {state.error && (
                <div className="mt-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-center font-serif animate-bounce">
                  <p className="font-bold mb-1">提示</p>
                  <p className="text-sm">{state.error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="ink-animation">
              <ResultDisplay result={state.result} onReset={handleReset} />
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 mt-12 text-slate-400 text-xs tracking-widest uppercase flex flex-col items-center gap-2">
        <span>&copy; 墨韵诗境 · 灵感源自传统</span>
        <span className="opacity-50 italic">Powered by Gemini 3 Flash</span>
      </footer>
    </div>
  );
};

export default App;
