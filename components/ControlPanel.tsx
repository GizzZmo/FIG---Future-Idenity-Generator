
import React, { useState } from 'react';
import { REGIONS, GENDERS } from '../constants';
import type { GenerationOptions } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface ControlPanelProps {
  onGenerate: (options: GenerationOptions) => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onGenerate, isLoading }) => {
  const [region, setRegion] = useState<string>(REGIONS[0]);
  const [gender, setGender] = useState<string>(GENDERS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ region, gender });
  };

  const selectStyles = "w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors";

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Generation Controls</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-2">
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            disabled={isLoading}
            className={selectStyles}
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={isLoading}
            className={selectStyles}
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon />
              Generate Identity
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ControlPanel;
