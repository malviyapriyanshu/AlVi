import React from 'react';
import { useAlgorithmStore } from './state/useAlgorithmStore';
import { usePlaybackStore } from './state/usePlaybackStore';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Zustand stores don't need a provider, but this is a good place for 
  // Context Providers if needed in the future (e.g. Theme, Auth)
  return <>{children}</>;
};
