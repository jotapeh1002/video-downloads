import { useState } from 'react';
import { GetDetails, Downloads } from '../api/index';
import { HeaderHome, InfoYoutube, InputTextUrl, ButtonType } from '../components/index';
import { PiDownloadSimpleLight } from "react-icons/pi";
import { CgSpinner } from "react-icons/cg";
import { ErrorAlert } from '../components/ErrorAlert';
import { IoVideocamOutline } from "react-icons/io5";
import { IoIosMusicalNotes } from "react-icons/io";

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
    { label: 'Video 1080p', type: 'mp4', icon: <IoVideocamOutline size={19} /> },
    { label: 'Audio 300kz', type: 'mp3', icon: <IoIosMusicalNotes size={19}/> },
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
      'https://www.youtube.com/',
      'https://youtu.be/',
      'https://www.youtu.be/',
      'https://m.youtube.com/',
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

  const isVideoData = (message: VideoData | string): message is VideoData =>
    typeof message !== 'string';

  const handleDownload = async () => {
    setLoading({ status: true, message: '' });
    await Downloads(url, selected);
    setLoading({ status: false, message: '' });
  };

  const isDownloadable = !loading.status && data?.statusCode === 200;

  return (
    <div className="sm:min-h-screen bg-gradient-to-br sm:from-indigo-900/50 sm:via-purple-800/50 sm:to-pink-700/50 flex items-center justify-center sm:p-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg sm:rounded-3xl sm:shadow-2xl overflow-hidden">
        <HeaderHome title="Youtube Downloader" />
        <div className="py-8 px-5 bg-white sm:rounded-b-3xl">
          <div className="relative mb-8">
            <InputTextUrl url={url} onChange={onHandle} />
            {loading.message && (
              <div className="text-indigo-600 w-full font-medium text-center mt-12 flex items-center justify-center gap-2">
                <div className="animate-spin h-5"><CgSpinner size={22}/></div>
                {loading.message}
              </div>
            )}
          </div>
          {data && isVideoData(data.message) && (
            <div className="space-y-6">
              <InfoYoutube
                description={data.message.description}
                duration={data.message.durationString}
                thumbnail={data.message.thumbnail}
                title={data.message.title}
                videoUrl={data.message.originalURL}
              />
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-700 mb-4 font-medium flex items-center">
                  <PiDownloadSimpleLight size={22} className="mr-4" />
                  Selecione o formato:
                </p>
                <ButtonType
                  handleSelected={(type: string) => setSelected(type)}
                  selected={selected}
                  object={typeDownloads}
                />
              </div>
            </div>
          )}
          {data && data.statusCode !== 200 && typeof data.message === 'string' && (
           <ErrorAlert message={data.message}/>
          )}
          <div className="mt-12 flex justify-center">
            <button
              disabled={!isDownloadable}
              onClick={handleDownload}
              className={`${loading.status && 'cursor-not-allowed'} 
                ${
                  isDownloadable
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 cursor-pointer hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } 
                px-12 py-4 font-bold rounded-xl transition-all duration-300 flex items-center gap-2`}
            >
              {loading.status && !loading.message ? (
                <>
                  <div className="animate-spin h-5"><CgSpinner size={22}/></div>
                  DOWNLOADING
                </>
              ) : (
                <div className='flex items-center gap-3'>
                  <PiDownloadSimpleLight size={22} />
                  DOWNLOAD
                </div>
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
