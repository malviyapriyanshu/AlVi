import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Algorithms', value: '30+' },
  { label: 'Interactive Visualizations', value: '100%' },
  { label: 'Learning Paths', value: '10+' },
  { label: 'Open Source', value: 'MIT' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-950 border-y border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm md:text-base text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
