
import React, { useCallback, useState, useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreviewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onImageUpload]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative p-4 border-2 border-dashed rounded-xl transition-colors duration-300
        ${isDragging ? 'border-blue-500 bg-gray-800' : 'border-gray-600 hover:border-gray-500'}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      {imagePreviewUrl ? (
        <div className="relative aspect-square w-full">
          <img
            src={imagePreviewUrl}
            alt="Uploaded selfie"
            className="w-full h-full object-cover rounded-lg"
          />
           <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer">
              Click to change image
            </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-center text-gray-400 cursor-pointer">
          <UploadIcon className="w-12 h-12 mb-4" />
          <p className="font-semibold">Click to upload or drag & drop</p>
          <p className="text-sm">PNG, JPG, or WEBP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
