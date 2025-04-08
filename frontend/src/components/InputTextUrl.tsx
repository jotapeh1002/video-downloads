import React from 'react';

type UrlInputProps = {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputTextUrl: React.FC<UrlInputProps> = ({ url, onChange }) => {
  return (
    <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-200 transition-all duration-300">
      <div className="text-lg py-3 px-4 border-r border-gray-200 text-gray-500 bg-gradient-to-r from-indigo-50 to-purple-50">
        URL:
      </div>
      <input
        type="text"
        value={url}
        onChange={onChange}
        placeholder="Cole a URL do vídeo do YouTube aqui"
        className="py-3 px-4 w-full focus:outline-none bg-gray-50"
      />
    </div>
  );
};
