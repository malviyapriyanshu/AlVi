import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, BookOpen, Layers, Map, Monitor } from 'lucide-react';

const features = [
  {
    title: 'Algorithm Visualization',
    description: 'Watch algorithms come to life with beautiful, real-time animations and data structure representations.',
    icon: <Eye className="text-indigo-400" size={24} />,
  },
  {
    title: 'Step-by-Step Walkthrough',
    description: 'Pause, rewind, and step through code execution to understand exactly how each line affects the state.',
    icon: <ArrowRight className="text-cyan-400" size={24} />,
  },
  {
    title: 'Interactive Problems',
    description: 'Test your knowledge with built-in challenges and interactive coding environments.',
    icon: <BookOpen className="text-indigo-400" size={24} />,
  },
  {
    title: 'Algorithm Comparison',
    description: 'Run multiple algorithms side-by-side to compare their efficiency and performance in real-time.',
    icon: <Layers className="text-cyan-400" size={24} />,
  },
  {
    title: 'Learning Paths',
    description: 'Curated curriculum to take you from computer science basics to advanced data structures.',
    icon: <Map className="text-indigo-400" size={24} />,
  },
  {
    title: 'Responsive UI',
    description: 'Learn on any device with a fully responsive interface optimized for desktop, tablet, and mobile.',
    icon: <Monitor className="text-cyan-400" size={24} />,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-indigo-500 font-semibold tracking-wide uppercase text-sm mb-3">Features</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Designed for Modern Learners</h3>
          <p className="text-slate-400 text-lg">
            AiVi combines visual intuition with rigorous algorithmic analysis to provide the ultimate learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900/60 hover:border-slate-700 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
