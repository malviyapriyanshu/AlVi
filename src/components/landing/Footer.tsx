import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Ai<span className="text-indigo-500">Vi</span></span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6">
              An interactive algorithm learning platform designed to help students master computer science fundamentals through visualization.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 italic">Product</h4>
            <ul className="space-y-4">
               {['Visualizer', 'Algorithms', 'Comparison', 'Learning Paths'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">{item}</a>
                 </li>
               ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 italic">Resources</h4>
            <ul className="space-y-4">
               {['Documentation', 'GitHub', 'Community', 'License'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">{item}</a>
                 </li>
               ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 italic">Company</h4>
            <ul className="space-y-4">
               {['About', 'Contact', 'Terms', 'Privacy'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">{item}</a>
                 </li>
               ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} AiVi Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            Made with <Heart size={14} className="text-red-500" fill="currentColor" /> by <span className="text-slate-400 font-medium">AiVi Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
