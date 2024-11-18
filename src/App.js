import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import TextInput from './components/TextInput';
import { Toaster, toast } from 'react-hot-toast';
import DownloadButton from './components/DownloadButton';

const App = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [originalAudioUrl, setOriginalAudioUrl] = useState('');
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleProcessVoice = async () => {
    if (!file || !text) {
      toast.error('Please upload a file and enter some text.',
        {
          position: 'top-right',
          duration: 2000, 
        }
      );
      return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Oops, this file is too big or not supported! Please try again!',
        {
          position: 'top-right',
          duration: 2000, 
        }
      );
      return;
    }

    const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];
    if (!allowedMimeTypes.includes(file.type)) {
      toast.error('Please upload a valid audio file (MP3, WAV, OGG).', {
        position: 'top-right',
        duration: 2000, 
      });
      
      return;
    }
 if (text.length > 500) {
      toast.error('Oops, this text is too big! Please try again!',
        {
          position: 'top-right',
          duration: 2000, 
        }
      );
      return;
    }
    // Start loading state
    setIsLoading(true);

    const formData = new FormData();
    formData.append('audioFile', file);
    formData.append('text', text);

    try {
      const response = await axios.post('https://voice-backend-production.up.railway.app/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { originalAudioUrl, generatedAudioUrl } = response.data;
      setOriginalAudioUrl(originalAudioUrl);
      setGeneratedAudioUrl(generatedAudioUrl);
      toast.success('Voice processing successful!',
        {
          position: 'top-right',
          duration: 2000, 
        }
      );
    } catch (error) {
      console.error(error);
      toast.error('Error during voice processing.',
        {
          position: 'top-right',
          duration: 2000, 
        }
      );
    } finally {
      // Stop loading state after the process is complete
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8 flex items-center justify-center">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-8 w-full">
        <h1 className="text-3xl text-center font-bold text-gray-100">Voice Cloning App</h1>

        <FileUpload onFileChange={setFile} />
        <TextInput onTextChange={setText} />

        <div className="flex justify-center">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg shadow-md"
            onClick={handleProcessVoice}
            disabled={isLoading} // Disable button during loading
          >
              Process Voice
            
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <div className="text-gray-200">Processing...</div>
            <div className="animate-spin border-4 border-teal-600 border-solid w-12 h-12 rounded-full border-t-transparent"></div>
          </div>
        )}

        {/* audio players for original and generated audio */}
        {originalAudioUrl && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <div>
              <h2 className="text-center text-xl text-gray-200">Original Audio</h2>
              <audio controls className="bg-gray-700 p-2 rounded-md">
                <source src={originalAudioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div>
              <h2 className="text-center text-xl text-gray-200">Generated Audio</h2>
              <audio controls className="bg-gray-700 p-2 rounded-md">
                <source src={generatedAudioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}

        {generatedAudioUrl && (
          <DownloadButton audioUrl={generatedAudioUrl} />
        )}
      </div>
    </div>
  );
};

export default App;
