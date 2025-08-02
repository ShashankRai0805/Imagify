import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const GenerateImage = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { generateImage, loading, credits, user } = useAppContext();

  const handleGenerate = async () => {
    if (!user) {
      setError('Please login to generate images');
      return;
    }

    if (credits <= 0) {
      setError('You have no credits left. Please purchase more credits.');
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a description for your image');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    const result = await generateImage(prompt);
    
    if (result.success) {
      setGeneratedImage(result.imageUrl);
    } else {
      setError(result.message);
    }
    
    setIsGenerating(false);
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.jpg';
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">I</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">imagify</span>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Credits left: {credits}
              </div>
              <span className="text-sm text-gray-600">Hi! {user.name}</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">👤</span>
              </div>
            </div>
          )}
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-gray-50">
        
        {/* Image Display Area */}
        <div className="w-full max-w-md mb-8">
          {isGenerating ? (
            <div className="w-full h-80 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : generatedImage ? (
            <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="w-full h-80 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-500">Your generated image will appear here</p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-2xl mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="w-full max-w-2xl">
          <div className="flex space-x-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to generate"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              disabled={isGenerating}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !user || !prompt.trim()}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>

        {/* Download Button (only show when image is generated) */}
        {generatedImage && !isGenerating && (
          <div className="mt-6">
            <button
              onClick={downloadImage}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition font-medium"
            >
              Download Image
            </button>
          </div>
        )}

        {/* Login Message */}
        {!user && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl w-full">
            <p className="text-yellow-800 text-sm text-center">
              Please login to generate images. You'll get 5 free credits to start!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;
