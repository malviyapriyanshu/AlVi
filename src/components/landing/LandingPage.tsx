import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';
import DemoSection from './DemoSection';
import AlgorithmsSection from './AlgorithmsSection';
import HowItWorks from './HowItWorks';
import OpenSourceSection from './OpenSourceSection';
import CTASection from './CTASection';
import Footer from './Footer';

interface LandingPageProps {
  onLaunch: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      <Navbar onLaunch={onLaunch} />
      <main>
        <HeroSection onLaunch={onLaunch} />
        <StatsSection />
        <FeaturesSection />
        <DemoSection onLaunch={onLaunch} />
        <AlgorithmsSection />
        <HowItWorks />
        <OpenSourceSection />
        <CTASection onLaunch={onLaunch} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
