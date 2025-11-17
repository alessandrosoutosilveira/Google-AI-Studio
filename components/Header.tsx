
import React from 'react';
import { SparklesIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="py-4 sm:py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-white">
          <SparklesIcon className="w-8 h-8 text-blue-400" />
          <h1>AI Headshot Photographer</h1>
        </div>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
          Turn your casual selfie into a professional headshot in seconds.
        </p>
      </div>
    </header>
  );
};

export default Header;
