import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitBranch, Heart } from 'lucide-react';

const OpenSourceSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-12 lg:p-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-2xl mb-8 border border-white/5">
            <Github size={40} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Open Source is in our <span className="text-indigo-400">DNA</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
            AiVi is built by the community, for the community. We believe in open access to education and transparent, collaborative software development.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
             <div className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700">
               <Star size={18} className="text-amber-400" fill="currentColor" />
               <span className="text-white font-medium">1.2k Stars</span>
             </div>
             <div className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700">
               <GitBranch size={18} className="text-indigo-400" />
               <span className="text-white font-medium">400+ Forks</span>
             </div>
             <div className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700">
               <Heart size={18} className="text-red-400" fill="currentColor" />
               <span className="text-white font-medium">50 Contributors</span>
             </div>
          </div>

          <button className="bg-white text-slate-950 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center gap-2 mx-auto group">
            <Github size={20} />
            Star on GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
