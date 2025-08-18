
import React, { useState } from 'react';
import { REGIONS, GENDERS, AGE_RANGES, IMAGE_STYLES, LIGHTING_STYLES, CAMERA_SHOTS, ASPECT_RATIOS } from '../constants';
import type { GenerationOptions } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface ControlPanelProps {
  onGenerate: (options: GenerationOptions) => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onGenerate, isLoading }) => {
  const [options, setOptions] = useState<Omit<GenerationOptions, 'region' | 'gender'>>({
    ageRange: AGE_RANGES[0],
    ethnicity: '',
    profession: '',
    imageStyle: IMAGE_STYLES[0],
    lightingStyle: LIGHTING_STYLES[0],
    cameraShot: CAMERA_SHOTS[0],
    aspectRatio: Object.values(ASPECT_RATIOS)[0],
  });
  const [region, setRegion] = useState<string>(REGIONS[0]);
  const [gender, setGender] = useState<string>(GENDERS[0]);
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ region, gender, ...options });
  };

  const handleOptionChange = (field: keyof typeof options, value: string) => {
    setOptions(prev => ({ ...prev, [field]: value }));
  };
  
  const inputStyles = "w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:opacity-50";
  const selectStyles = inputStyles;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-cyan-400">Generation Controls</h2>
        <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">Advanced</span>
            <button
                onClick={() => setIsAdvanced(!isAdvanced)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isAdvanced ? 'bg-cyan-500' : 'bg-gray-600'}`}
                aria-label="Toggle advanced controls"
            >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isAdvanced ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-2">Region</label>
              <select id="region" value={region} onChange={(e) => setRegion(e.target.value)} disabled={isLoading} className={selectStyles}>
                {REGIONS.map((r) => (<option key={r} value={r}>{r}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} disabled={isLoading} className={selectStyles}>
                {GENDERS.map((g) => (<option key={g} value={g}>{g}</option>))}
              </select>
            </div>
        </div>

        {/* Advanced Controls */}
        {isAdvanced && (
          <div className="space-y-6 border-t border-gray-700 pt-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">Character Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="ageRange" className="block text-sm font-medium text-gray-300 mb-2">Age Range</label>
                    <select id="ageRange" value={options.ageRange} onChange={(e) => handleOptionChange('ageRange', e.target.value)} disabled={isLoading} className={selectStyles}>
                        {AGE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-300 mb-2">Appearance / Ethnicity</label>
                    <input type="text" id="ethnicity" placeholder="e.g., West African, Han Chinese" value={options.ethnicity} onChange={(e) => handleOptionChange('ethnicity', e.target.value)} disabled={isLoading} className={inputStyles} />
                </div>
            </div>
            <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-2">Profession / Hobby (Future)</label>
                <input type="text" id="profession" placeholder="e.g., AI Ethicist, Urban Farmer" value={options.profession} onChange={(e) => handleOptionChange('profession', e.target.value)} disabled={isLoading} className={inputStyles} />
            </div>

            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2 pt-4">Image Style</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="imageStyle" className="block text-sm font-medium text-gray-300 mb-2">Style</label>
                    <select id="imageStyle" value={options.imageStyle} onChange={(e) => handleOptionChange('imageStyle', e.target.value)} disabled={isLoading} className={selectStyles}>
                        {IMAGE_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="lightingStyle" className="block text-sm font-medium text-gray-300 mb-2">Lighting</label>
                    <select id="lightingStyle" value={options.lightingStyle} onChange={(e) => handleOptionChange('lightingStyle', e.target.value)} disabled={isLoading} className={selectStyles}>
                        {LIGHTING_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="cameraShot" className="block text-sm font-medium text-gray-300 mb-2">Shot Type</label>
                    <select id="cameraShot" value={options.cameraShot} onChange={(e) => handleOptionChange('cameraShot', e.target.value)} disabled={isLoading} className={selectStyles}>
                        {CAMERA_SHOTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                    <select id="aspectRatio" value={options.aspectRatio} onChange={(e) => handleOptionChange('aspectRatio', e.target.value)} disabled={isLoading} className={selectStyles}>
                        {Object.entries(ASPECT_RATIOS).map(([label, value]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                </div>
            </div>
          </div>
        )}

        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
          {isLoading ? 'Generating...' : <><SparklesIcon /> Generate Identity</>}
        </button>
      </form>
    </div>
  );
};

export default ControlPanel;
