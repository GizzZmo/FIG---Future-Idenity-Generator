
import React from 'react';
import type { Identity } from '../types';
import LoadingSpinner from './icons/LoadingSpinner';

interface IdentityCardProps {
  identity: Identity | null;
  isLoading: boolean;
  error: string | null;
}

const IdentityCard: React.FC<IdentityCardProps> = ({ identity, isLoading, error }) => {
  const CardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-6 min-h-[400px] flex flex-col justify-center items-center text-center">
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

  if (error) {
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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-1">
          <img
            src={identity.imageUrl}
            alt={`Portrait of ${identity.fullName}`}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="p-6 flex flex-col justify-center text-left">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            {identity.fullName}
          </h2>
          <p className="text-gray-400 mt-1">
            {identity.age} years old &middot; {identity.location}
          </p>
          <div className="border-t border-gray-700 my-4"></div>
          <p className="text-gray-300 leading-relaxed">{identity.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
