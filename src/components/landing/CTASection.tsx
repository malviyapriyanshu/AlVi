import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onLaunch: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onLaunch }) => {
  return (
    <section className="py-24 bg-slate-950 px-6">
      <div className="container mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[3rem] p-12 md:p-24 text-center">
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-80 h-80 border-[20px] border-white/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-60 h-60 border-[10px] border-white/5 rounded-full"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-8">
              <Sparkles size={16} className="text-amber-300" />
              Everything you need to master algorithms
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Start Learning Algorithms the <span className="underline decoration-indigo-400">Visual Way</span>
            </h2>
            
            <p className="text-indigo-100 text-lg md:text-xl mb-12 opacity-90 leading-relaxed">
              Join thousands of students and developers who are mastering data structures and algorithms with AiVi.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={onLaunch}
                className="bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black text-xl transition-all hover:bg-slate-100 shadow-2xl shadow-black/20 flex items-center justify-center gap-3"
              >
                Launch Visualizer
                <Play size={20} fill="currentColor" />
              </button>
              <button className="bg-indigo-500/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:bg-white/10">
                Explore Algorithms
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
