import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: 'Step 1',
    title: 'Choose an algorithm',
    description: 'Select from our extensive library of sorting, searching, and graph algorithms.',
  },
  {
    step: 'Step 2',
    title: 'Watch the visualization',
    description: 'See the data structures transform in real-time with smooth, high-fidelity animations.',
  },
  {
    step: 'Step 3',
    title: 'Read the step explanation',
    description: 'Understand the logic behind every operation with clear, natural language explanations.',
  },
  {
    step: 'Step 4',
    title: 'Solve a real problem',
    description: 'Apply what you have learned by solving interactive coding challenges.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-indigo-500 font-semibold tracking-wide uppercase text-sm mb-3">Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">How AiVi Accelerates Learning</h3>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/30 flex items-center justify-center text-white font-black text-xl mb-8 border-4 border-slate-950">
                  {index + 1}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                <p className="text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
