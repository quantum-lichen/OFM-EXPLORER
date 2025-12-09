import React, { useState } from 'react';
import { Tab } from './types';
import { FlipSimulation } from './components/FlipSimulation';
import { TheoryDocs } from './components/TheoryDocs';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.THEORY);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg">Ω</div>
              <span className="text-white font-bold tracking-wider hidden sm:block">OFM EXPLORER</span>
            </div>
            
            <nav className="flex space-x-1 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab(Tab.THEORY)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.THEORY 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Theory
              </button>
              <button
                onClick={() => setActiveTab(Tab.SIMULATION)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.SIMULATION 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Simulation
              </button>
              <button
                onClick={() => setActiveTab(Tab.CHAT)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.CHAT 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ask AI
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-900/30 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full h-full animate-in fade-in duration-500">
          {activeTab === Tab.THEORY && <TheoryDocs />}
          {activeTab === Tab.SIMULATION && <FlipSimulation />}
          {activeTab === Tab.CHAT && <ChatInterface />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-xs font-mono">
          <p>Ouellet Flip Model • Topological Singularity Research</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
