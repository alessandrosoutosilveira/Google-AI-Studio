
import React from 'react';
import { SparklesIcon, ImagePlaceholderIcon } from './icons';

interface GeneratedImageProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
    "Warming up the AI studio...",
    "Finding your best angle...",
    "Adjusting the lighting...",
    "Polishing the final portrait...",
    "Almost ready for your closeup!"
];

const LoadingState: React.FC = () => {
    const [message, setMessage] = React.useState(loadingMessages[0]);
    
    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setMessage(loadingMessages[index]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gray-800 rounded-xl">
            <SparklesIcon className="w-16 h-16 text-blue-400 animate-pulse mb-4" />
            <p className="text-white font-semibold text-lg">{message}</p>
            <p className="text-gray-400 mt-1">This can take a moment, please wait.</p>
        </div>
    );
};

const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, isLoading, error }) => {
  return (
    <div className="relative aspect-square w-full bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center">
      {isLoading && <LoadingState />}
      
      {!isLoading && error && (
        <div className="text-center text-red-400 p-4">
          <h3 className="font-bold text-lg">Oops! Something went wrong.</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && imageUrl && (
        <>
            <img src={imageUrl} alt="Generated headshot" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                Powered by Gemini
            </div>
        </>
      )}

      {!isLoading && !error && !imageUrl && (
        <div className="text-center text-gray-500 p-4">
            <ImagePlaceholderIcon className="w-24 h-24 mx-auto mb-4" />
            <h3 className="font-bold text-lg">Your AI Headshot will appear here</h3>
            <p className="text-sm">Upload an image and select a style to begin.</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;
