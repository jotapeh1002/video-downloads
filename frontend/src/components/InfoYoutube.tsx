import React from 'react';

type VideoCardProps = {
  thumbnail: string;
  duration: string;
  title: string;
  description: string;
  videoUrl: string;
};

export const InfoYoutube: React.FC<VideoCardProps> = ({
  thumbnail,
  duration,
  title,
  description,
  videoUrl
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-5 border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="relative group">
          <img
            className="rounded-xl shadow-md w-full h-40 sm:w-60 object-cover transition-transform duration-300 group-hover:scale-105"
            src={thumbnail}
            alt="Video thumbnail"
          />
          <div className="absolute bottom-3 right-3 text-xs font-medium text-white bg-indigo-600 rounded-full px-3 py-1 shadow-md">
            {duration}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {description}
          </p>
          <div
            onClick={() => window.open(videoUrl, '_blank')}
            className="mt-3 flex items-center cursor-pointer text-indigo-600 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Acessar vídeo original
          </div>
        </div>
      </div>
    </div>
  );
};
