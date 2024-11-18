import React, { useState, useRef } from 'react';

const FileUpload = ({ onFileChange }) => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null); 
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  const handleClearFile = () => {
    setFileName('');
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-300 font-semibold mb-2">
        Upload Audio File:
      </label>
      <input
        type="file"
        accept="audio/*"
        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
        onChange={handleFileSelect}
        ref={fileInputRef}  
      />
      
      {/* Display the selected file name */}
      {fileName && (
        <div className="mt-2 text-gray-300">
          Selected file: {fileName}
        </div>
      )}

      {/* Clear button */}
      {fileName && (
        <button
          onClick={handleClearFile}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default FileUpload;
