
import React from 'react';
import type { Identity } from '../types';

interface HistoryPanelProps {
  history: Identity[];
  onSelect: (index: number) => void;
  selectedIndex: number | null;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, selectedIndex }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">History</h2>
        {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No identities generated yet. Your history will appear here.</p>
        ) : (
            <div className="max-h-[400px] overflow-y-auto pr-2 -mr-2">
                <ul className="space-y-3">
                    {history.map((identity, index) => (
                        <li key={`${identity.fullName}-${index}`}>
                            <button
                                onClick={() => onSelect(index)}
                                className={`w-full text-left p-3 rounded-md flex items-center gap-4 transition-all duration-200 ${selectedIndex === index ? 'bg-cyan-500/20 ring-2 ring-cyan-500' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                            >
                                <img 
                                    src={identity.imageUrl} 
                                    alt={`Portrait of ${identity.fullName}`}
                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="overflow-hidden">
                                    <p className="font-semibold text-gray-200 truncate">{identity.fullName}</p>
                                    <p className="text-xs text-gray-400 truncate">{identity.location}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};

export default HistoryPanel;
