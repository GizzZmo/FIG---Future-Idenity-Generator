
import React, { useState, useCallback } from 'react';
import type { GenerationOptions, Identity } from './types';
import { generateIdentityText, generateIdentityImage } from './services/geminiService';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import IdentityCard from './components/IdentityCard';
import HistoryPanel from './components/HistoryPanel';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [identityHistory, setIdentityHistory] = useState<Identity[]>([]);
  const [selectedIdentityIndex, setSelectedIdentityIndex] = useState<number | null>(null);

  const handleGenerate = useCallback(async (options: GenerationOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const identityTextData = await generateIdentityText(options);
      
      const appearance = options.ethnicity ? `with a ${options.ethnicity} appearance` : '';
      const imagePrompt = `${options.imageStyle} ${options.cameraShot} of a ${identityTextData.age}-year-old ${identityTextData.gender} from ${identityTextData.location} ${appearance}.
      As a ${identityTextData.profession}, their expression reflects a personality that is ${identityTextData.personalityTraits.join(', ')}.
      The scene is lit with ${options.lightingStyle}.
      High-detail, futuristic, set in the year ${new Date().getFullYear() + 10}.`.replace(/\s\s+/g, ' ').trim();
      
      const imageBase64 = await generateIdentityImage(imagePrompt, options.aspectRatio);

      const newIdentity: Identity = {
        ...identityTextData,
        imageUrl: `data:image/jpeg;base64,${imageBase64}`,
        imagePrompt,
      };

      setIdentityHistory(prev => [newIdentity, ...prev]);
      setSelectedIdentityIndex(0);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
      // Keep existing selection on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectIdentity = useCallback((index: number) => {
    setSelectedIdentityIndex(index);
  }, []);

  const selectedIdentity = selectedIdentityIndex !== null ? identityHistory[selectedIdentityIndex] : undefined;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ControlPanel onGenerate={handleGenerate} isLoading={isLoading} />
            <HistoryPanel 
                history={identityHistory}
                onSelect={handleSelectIdentity}
                selectedIndex={selectedIdentityIndex}
            />
          </div>
          <div className="lg:col-span-2">
            <IdentityCard identity={selectedIdentity} isLoading={isLoading} error={error} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
