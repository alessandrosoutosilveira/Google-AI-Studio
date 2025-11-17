
import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import GeneratedImage from './components/GeneratedImage';
import { HeadshotStyle, UploadedImage } from './types';
import { generateHeadshot } from './services/geminiService';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const [header, data] = dataUrl.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || file.type;
      
      setUploadedImage({
        file,
        dataUrl,
        base64: data,
        mimeType,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) {
      setError("Please upload a selfie and select a style first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await generateHeadshot(
        uploadedImage.base64,
        uploadedImage.mimeType,
        selectedStyle.prompt
      );
      setGeneratedImage(`data:image/jpeg;base64,${resultBase64}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">1. Upload Your Selfie</h2>
              <ImageUploader
                onImageUpload={handleImageUpload}
                imagePreviewUrl={uploadedImage?.dataUrl ?? null}
              />
            </div>
            <StyleSelector
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
            />
          </div>

          {/* Right Column: Result */}
          <div className="flex flex-col sticky top-8 h-full">
            <h2 className="text-xl font-semibold text-white mb-4">3. Your AI Headshot</h2>
            <GeneratedImage
              imageUrl={generatedImage}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>

      {/* Sticky Generate Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={!uploadedImage || !selectedStyle || isLoading}
          className="flex items-center justify-center gap-2 w-full max-w-sm px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg
          hover:bg-blue-500 transition-all duration-300 transform hover:scale-105
          disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon className="w-6 h-6" />
              Generate Headshot
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
