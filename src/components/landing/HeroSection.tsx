import React from 'react';
import { motion } from 'framer-motion';
import { Play, Github, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onLaunch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLaunch }) => {
  const bars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 60) + 20,
    color: i % 3 === 0 ? 'bg-indigo-500' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-indigo-400/50',
  }));

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New: Enhanced Graph Visualizations
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Learn Algorithms <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Visually</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-lg">
            AiVi helps students understand complex algorithms through interactive visualizations, step-by-step execution, and real-time state tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onLaunch}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 group"
            >
              Launch Visualizer
              <Play size={20} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a 
              href="https://github.com" 
              className="bg-slate-900/50 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <Github size={20} />
              View on GitHub
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                  {i === 4 ? '+1k' : `U${i}`}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Trusted by <span className="text-slate-300 font-medium">1,000+ students</span> worldwide
            </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative aspect-square md:aspect-auto h-full min-h-[400px] flex items-center justify-center"
        >
          <div className="relative w-full max-w-md h-80 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 flex items-end justify-center gap-3 shadow-2xl overflow-hidden group">
             {/* Grid background */}
             <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
             
             {bars.map((bar, i) => (
               <motion.div
                 key={bar.id}
                 className={`w-full max-w-[20px] rounded-t-lg shadow-lg relative z-10 ${bar.color}`}
                 initial={{ height: 0 }}
                 animate={{ height: `${bar.height}%` }}
                 transition={{ 
                   duration: 1.5, 
                   repeat: Infinity, 
                   repeatType: "reverse", 
                   delay: i * 0.1,
                   ease: "easeInOut"
                 }}
               />
             ))}

             <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
             </div>
             
             <div className="absolute top-6 right-6 text-slate-500 font-mono text-xs">
                sorting_algorithm.ts
             </div>

             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
          </div>
          
          {/* Floating Element 1 */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3 text-sm font-medium text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <ChevronRight size={18} />
              </div>
              Step-by-Step
            </div>
          </motion.div>

          {/* Floating Element 2 */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -left-8 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3 text-sm font-medium text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                <div className="w-4 h-4 rounded-sm border-2 border-indigo-500" />
              </div>
              Interactive Props
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
