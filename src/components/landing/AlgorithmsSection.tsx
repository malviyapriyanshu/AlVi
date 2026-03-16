import React from 'react';
import { motion } from 'framer-motion';
import { SortAsc, Search, Share2, Calculator, Settings } from 'lucide-react';

const categories = [
  {
    name: 'Sorting',
    icon: <SortAsc size={20} />,
    algorithms: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort'],
    color: 'from-blue-500/20 to-indigo-500/20',
    accent: 'text-blue-400',
  },
  {
    name: 'Searching',
    icon: <Search size={20} />,
    algorithms: ['Linear Search', 'Binary Search', 'Interpolation'],
    color: 'from-cyan-500/20 to-teal-500/20',
    accent: 'text-cyan-400',
  },
  {
    name: 'Graph',
    icon: <Share2 size={20} />,
    algorithms: ['Dijkstra', 'BFS', 'DFS', 'Prim\'s', 'Kruskal'],
    color: 'from-purple-500/20 to-pink-500/20',
    accent: 'text-purple-400',
  },
  {
    name: 'Dynamic Programming',
    icon: <Calculator size={20} />,
    algorithms: ['Fibonacci', 'Knapsack', 'LCS', 'Coin Change'],
    color: 'from-amber-500/20 to-orange-500/20',
    accent: 'text-amber-400',
  },
  {
    name: 'Techniques',
    icon: <Settings size={20} />,
    algorithms: ['Backtracking', 'Greedy', 'Recursion'],
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: 'text-emerald-400',
  },
];

const AlgorithmsSection: React.FC = () => {
  return (
    <section id="algorithms" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-indigo-500 font-semibold tracking-wide uppercase text-sm mb-3">Library</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore the Algorithm <span className="text-slate-500 underline decoration-slate-800 underline-offset-8">Library</span></h3>
            <p className="text-slate-400 text-lg">
              Covering everything from basic data structures to advanced algorithmic techniques.
            </p>
          </div>
          <button className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors group">
            View All Algorithms
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              →
            </motion.span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${category.color} border border-white/5 relative group overflow-hidden`}
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center ${category.accent} mb-6`}>
                  {category.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-6">{category.name}</h4>
                <ul className="space-y-3">
                  {category.algorithms.map((algo) => (
                    <li key={algo} className="flex items-center gap-2 text-slate-300 group/item cursor-pointer hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/item:bg-white transition-colors" />
                      {algo}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlgorithmsSection;
