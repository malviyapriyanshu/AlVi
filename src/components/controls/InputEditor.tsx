import React, { useState } from 'react';
import { Edit3, Check, X, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Props {
  initialValue: number[];
  onUpdate: (newArray: number[]) => void;
}

export const InputEditor: React.FC<Props> = ({ initialValue, onUpdate }) => {
  const [val, setVal] = useState(initialValue.join(', '));
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    try {
      const parsed = val.split(',').map(s => {
        const n = parseInt(s.trim());
        if (isNaN(n)) throw new Error('Invalid number');
        return n;
      });
      
      if (parsed.length === 0) throw new Error('Empty array');
      if (parsed.length > 50) throw new Error('Max 50 elements');
      
      onUpdate(parsed);
      setError(null);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative group">
      {!isEditing ? (
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-background-secondary border border-border text-text-secondary hover:text-text-primary hover:border-accent-primary transition-all shadow-sm"
        >
          <div className="flex flex-col items-start leading-none gap-1">
             <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Data Source</span>
             <span className="text-xs font-bold font-mono tracking-tight line-clamp-1 max-w-[120px]">
               [{initialValue.join(', ')}]
             </span>
          </div>
          <Edit3 size={14} className="opacity-40 group-hover:opacity-100" />
        </button>
      ) : (
        <div className="absolute bottom-full mb-3 left-0 z-[100] w-[300px] bg-background-primary border border-border rounded-2xl shadow-premium p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
           <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary flex items-center gap-2">
                 <Edit3 size={12} className="text-accent-primary" /> Array Editor
              </span>
              <button onClick={() => setIsEditing(false)} className="text-text-secondary hover:text-danger">
                 <X size={14} />
              </button>
           </div>
           
           <div className="space-y-3">
              <textarea 
                value={val}
                onChange={(e) => setVal(e.target.value)}
                autoFocus
                className="w-full h-24 bg-background-secondary border border-border rounded-xl p-3 text-xs font-mono font-bold text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none resize-none"
                placeholder="5, 3, 8, 2, 9..."
              />
              
              {error && (
                <p className="text-[10px] font-bold text-danger flex items-center gap-1">
                   <Info size={10} /> {error}
                </p>
              )}

              <button 
                onClick={handleApply}
                className="w-full py-2 bg-accent-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-glow-indigo hover:opacity-90 transition-opacity"
              >
                 Apply Changes
              </button>
           </div>
        </div>
      )}
    </div>
  );
};
