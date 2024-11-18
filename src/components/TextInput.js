import React from 'react';

const TextInput = ({ onTextChange }) => {
  const handleTextInput = (event) => {
    onTextChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-300  font-semibold mb-2">
        Enter Text for Voice Generation:
      </label>
      <textarea
        rows="3"
        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
        onChange={handleTextInput}
        placeholder="Type the text you want to convert to speech..."
      />
    </div>
  );
};

export default TextInput;
