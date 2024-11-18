import React from 'react';

const DownloadButton = ({ audioUrl }) => {
  if (!audioUrl) return null; 

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      {/* Download Button */}
      <a
        href={audioUrl}
        download="generated_audio.mp3"
        className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg shadow-md"
      >
        Download Audio
      </a>
    </div>
  );
};

export default DownloadButton;
