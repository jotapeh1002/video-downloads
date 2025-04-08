import { useState } from 'react';
import { GetDetails } from '../api/GetDetails';
import { Downloads } from '../api/Downloads';

interface VideoData {
  title: string;
  thumbnail: string;
  description: string;
  originalURL: string;
  durationString: string;
}

interface ResponseType {
  message: VideoData | string;
  statusCode: number;
}

export const Home = () => {
  const typeDownloads = [
    { label: 'Video 1080p', type: 'mp4' },
    { label: 'Audio 300kz', type: 'mp3' },
  ];

  const [url, setUrl] = useState('');
  const [selected, setSelected] = useState('mp4');
  const [loading, setLoading] = useState({ status: false, message: '' });
  const [data, setData] = useState<ResponseType | null>(null);

  async function onHandle(e: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setLoading({ status: true, message: 'Carregando...' });
    setData(null);

    const validUrls = [
      "https://www.youtube.com/",
      "https://youtu.be/",
      "https://www.youtu.be/",
      "https://m.youtube.com/",
    ];
    validUrls.some((prefix) => url.includes(prefix));

    if (!validUrls || !newUrl) {
      setData({ message: 'URL inválida', statusCode: 400 });
      setLoading({ status: false, message: '' });
      return;
    }

    const valor = await GetDetails(newUrl);
    setData({ message: valor.message, statusCode: valor.statusCode });
    setLoading({ status: false, message: '' });
  }
  
  const isVideoData = (message: VideoData | string): message is VideoData => (
    typeof message !== 'string'
  );

  const handleDownload = async () => {
    setLoading({ status: true, message: '' });
    await Downloads(url, selected);
    setLoading({ status: false, message: '' });
  };

  const isDownloadable = !loading.status && data?.statusCode === 200;

  return (
    <div className="sm:min-h-screen bg-gradient-to-br sm:from-indigo-900/50 sm:via-purple-800/50 sm:to-pink-700/50 flex items-center justify-center sm:p-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg sm:rounded-3xl sm:shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
          <h1 className="md:text-4xl text-3xl font-extrabold text-center text-white relative z-10">
            YOUTUBE DOWNLOADER
          </h1>
          <div className="flex justify-center mt-2">
            <div className="h-1 w-20 bg-pink-400 rounded-full"></div>
          </div>
        </div>

        <div className="py-8 px-5 bg-white sm:rounded-b-3xl">
          <div className="relative mb-8">
            <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-200 transition-all duration-300">
              <div className="text-lg py-3 px-4 border-r border-gray-200 text-gray-500 bg-gradient-to-r from-indigo-50 to-purple-50">
                URL:
              </div>
              <input
                type="text"
                value={url}
                onChange={onHandle}
                placeholder="Cole a URL do vídeo do YouTube aqui"
                className="py-3 px-4 w-full focus:outline-none bg-gray-50"
              />
            </div>
            {loading.message && (
              <div className="text-indigo-600 font-medium text-center mt-12 flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {loading.message}
              </div>
            )}
          </div>

          {data && isVideoData(data.message) && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-5 border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative group">
                    <img
                      className="rounded-xl shadow-md w-full h-40 sm:w-60 object-cover transition-transform duration-300 group-hover:scale-105"
                      src={data.message.thumbnail}
                      alt="Video thumbnail"
                    />
                    <div className="absolute bottom-3 right-3 text-xs font-medium text-white bg-indigo-600 rounded-full px-3 py-1 shadow-md">
                      {data.message.durationString}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                      {data.message.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {data.message.description}
                    </p>
                    <div 
                      onClick={() => window.open(url, '_blank')}
                      className="mt-3 flex items-center cursor-pointer text-indigo-600 text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Acessar video Original
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-700 mb-4 font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Selecione o formato:
                </p>
                <div className="flex justify-center gap-3">
                  {typeDownloads.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(item.type)}
                      className={`px-5 py-3 rounded-lg font-medium w-full sm:w-auto transition-all duration-200 ${
                        selected === item.type
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border cursor-pointer border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center">
                        {item.type === 'mp4' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        )}
                        {item.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data && data.statusCode !== 200 && typeof data.message === 'string' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mt-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 font-medium">{data.message}</p>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <button
              disabled={!isDownloadable}
              onClick={handleDownload}
              className={`${loading.status && 'cursor-not-allowed'} 
                ${isDownloadable ? 
                'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 cursor-pointer hover:to-purple-700 text-white shadow-lg' : 
                'bg-gray-200 text-gray-500 cursor-not-allowed'} 
                px-12 py-4 font-bold rounded-xl transition-all duration-300 flex items-center gap-2`}
            >
              {loading.status && !loading.message ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  DOWNLOADING
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  DOWNLOAD
                </>
              )}
            </button>
          </div>

          <div className="text-center text-gray-500 mt-8 sm:mt-12 sm:pt-6 border-t border-gray-100 text-sm">
            © 2025 YouTube Downloader - By AlissonDev
          </div>
        </div>
      </div>
    </div>
  );
};