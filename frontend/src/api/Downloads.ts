import axios from 'axios';

export async function Downloads(url: string, type: string) {
  try {
    const response = await axios.get(`http://192.168.0.2:3333/downloads?url=${url}&type=${type}`, {
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = type === 'mp3' ? 'audio.mp3' : 'video.mp4';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data.message || 'Erro inesperado ao buscar o vídeo',
        statusCode: error.response.data.statusCode || 500,
      };
    }
    return {
      message: 'Erro inesperado ao tentar buscar o vídeo',
      statusCode: 500,
    };
  }
}
