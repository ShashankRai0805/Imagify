import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const GenerateImage = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  
  const { generateImage, loading, credits, user } = useAppContext();

  const handleGenerate = async (e) => {
    e.preventDefault();
    
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
    
    const result = await generateImage(prompt);
    
    if (result.success) {
      setGeneratedImage(result.imageUrl);
    } else {
      setError(result.message);
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Generate Image</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {user && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Credits remaining: <span className="font-semibold">{credits}</span>
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the image you want to create
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful sunset over mountains with a lake in the foreground..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !user}
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {generatedImage && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Generated Image:</h3>
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-auto"
              />
            </div>
            <button
              onClick={downloadImage}
              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Download Image
            </button>
          </div>
        )}

        {!user && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Please login to generate images. You'll get 5 free credits to start!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;
