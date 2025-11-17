
import React from 'react';
import { HeadshotStyle } from '../types';
import { HEADSHOT_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyle: HeadshotStyle | null;
  onStyleSelect: (style: HeadshotStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">2. Select a Style</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {HEADSHOT_STYLES.map((style) => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform 
              ${selectedStyle?.id === style.id ? 'ring-4 ring-blue-500 scale-105' : 'ring-2 ring-gray-700 hover:ring-blue-500 hover:scale-102'}`}
          >
            <img src={style.imageUrl} alt={style.name} className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg">{style.name}</h3>
            {selectedStyle?.id === style.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
