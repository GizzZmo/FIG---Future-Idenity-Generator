
import React, { useState } from 'react';
import type { Identity } from '../types';
import LoadingSpinner from './icons/LoadingSpinner';
import ClipboardIcon from './icons/ClipboardIcon';

interface IdentityCardProps {
  identity: Identity | undefined;
  isLoading: boolean;
  error: string | null;
}

const IdentityCard: React.FC<IdentityCardProps> = ({ identity, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-6 min-h-[400px] lg:min-h-[600px] flex flex-col justify-center items-center text-center sticky top-8">
      {children}
    </div>
  );

  if (isLoading) {
    return (
      <CardContainer>
        <LoadingSpinner />
        <p className="mt-4 text-lg text-gray-400 animate-pulse">Generating identity from the near future...</p>
        <p className="mt-2 text-sm text-gray-500">This may take a moment.</p>
      </CardContainer>
    );
  }

  if (error && !identity) {
    return (
      <CardContainer>
        <div className="text-red-400" role="alert">
          <h3 className="text-xl font-bold mb-2">Generation Failed</h3>
          <p>{error}</p>
        </div>
      </CardContainer>
    );
  }

  if (!identity) {
    return (
      <CardContainer>
        <div className="text-gray-400">
          <h3 className="text-2xl font-semibold text-gray-300">Your Future Identity Awaits</h3>
          <p className="mt-2">Use the controls to generate a new identity.</p>
        </div>
      </CardContainer>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fade-in sticky top-8">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 p-1">
          <img
            src={identity.imageUrl}
            alt={`Portrait of ${identity.fullName}`}
            className="w-full h-full object-cover lg:rounded-l-lg lg:rounded-t-none rounded-t-lg"
          />
        </div>
        <div className="lg:col-span-7 p-6 flex flex-col justify-center text-left">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            {identity.fullName}
          </h2>
          <p className="text-gray-400 mt-1">
            {identity.age} years old &middot; {identity.gender} &middot; {identity.location}
          </p>
          <p className="text-cyan-300 mt-1 font-semibold">{identity.profession}</p>
          
          <div className="border-t border-gray-700 my-4"></div>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <div>
                <h3 className="font-semibold text-gray-200 mb-1">Personality</h3>
                <div className="flex flex-wrap gap-2">
                    {identity.personalityTraits.map(trait => (
                        <span key={trait} className="bg-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{trait}</span>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-gray-200 mb-1">Backstory</h3>
                <p>{identity.backstory}</p>
            </div>
             <div>
                <h3 className="font-semibold text-gray-200 mb-1">Motivations</h3>
                <p>{identity.motivations}</p>
            </div>
          </div>

          <div className="border-t border-gray-700 my-4"></div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Image Generation Prompt</h3>
            <div className="relative bg-gray-900 rounded-md p-3 pr-10">
                <p className="text-xs text-gray-300 font-mono break-words">{identity.imagePrompt}</p>
                <button 
                  onClick={() => handleCopy(identity.imagePrompt)}
                  className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors"
                  aria-label="Copy prompt"
                >
                  <ClipboardIcon copied={copied} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
