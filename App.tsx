
import React, { useState, useCallback } from 'react';
import type { GenerationOptions, Identity } from './types';
import { generateIdentityText, generateIdentityImage } from './services/geminiService';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import IdentityCard from './components/IdentityCard';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);

  const handleGenerate = useCallback(async (options: GenerationOptions) => {
    setIsLoading(true);
    setError(null);
    setIdentity(null);

    try {
      const identityTextData = await generateIdentityText(options);
      
      const imagePrompt = `Photorealistic portrait of a futuristic ${identityTextData.gender}, ${identityTextData.age} years old, from ${identityTextData.location}. High-detail, cinematic lighting, set in the year ${new Date().getFullYear() + 10}.`;
      
      const imageBase64 = await generateIdentityImage(imagePrompt);

      setIdentity({
        ...identityTextData,
        imageUrl: `data:image/jpeg;base64,${imageBase64}`,
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ControlPanel onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-2">
            <IdentityCard identity={identity} isLoading={isLoading} error={error} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
