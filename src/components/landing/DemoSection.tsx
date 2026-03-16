import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface DemoSectionProps {
  onLaunch: () => void;
}

const DemoSection: React.FC<DemoSectionProps> = ({ onLaunch }) => {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 lg:items-center">
            <div className="p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience the Power of <span className="text-indigo-400">Interaction</span></h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our visualizer provides a comprehensive suite of tools to analyze and interact with algorithms. From custom input sets to real-time complexity analysis.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Real-time state tracking',
                  'Custom node and edge manipulation',
                  'Pseudo-code highlighting',
                  'Complexity growth visualization'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onLaunch}
                className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-slate-200 flex items-center gap-2 group"
              >
                Try Live Demo
                <Play size={20} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-slate-900 p-4 lg:p-8 h-full min-h-[400px]">
              <div className="w-full h-full bg-slate-950 rounded-2xl border border-slate-800 shadow-inner relative overflow-hidden group">
                {/* Visualizer Mockup */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="mx-auto text-xs text-slate-500 font-mono italic">
                    BinarySearchTree.tsx
                  </div>
                </div>

                <div className="mt-10 p-8 h-full flex flex-col items-center justify-center gap-12">
                   {/* Animated Tree */}
                   <div className="relative">
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-16 h-16 rounded-full bg-indigo-600 border-4 border-slate-950 shadow-lg flex items-center justify-center text-white font-bold relative z-10"
                      >
                        50
                      </motion.div>
                      
                      <div className="absolute top-full left-1/2 -translate-x-full w-20 h-20 -rotate-45 border-l-2 border-indigo-400/30" />
                      <div className="absolute top-full right-1/2 translate-x-full w-20 h-20 rotate-45 border-r-2 border-indigo-400/30" />
                      
                      <motion.div 
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        className="absolute -bottom-24 -left-16 w-14 h-14 rounded-full bg-slate-800 border-4 border-slate-950 flex items-center justify-center text-slate-400 font-bold"
                      >
                        30
                      </motion.div>
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                        className="absolute -bottom-24 -right-16 w-14 h-14 rounded-full bg-cyan-600 border-4 border-slate-950 flex items-center justify-center text-white font-bold"
                      >
                        70
                      </motion.div>
                   </div>
                   
                   {/* Execution Status */}
                   <div className="w-full bg-slate-900/50 rounded-xl p-4 border border-slate-800 mt-auto">
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Binary Search: 70</span>
                        <span>Complexity: O(log n)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: '0%' }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-indigo-500"
                        />
                      </div>
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
