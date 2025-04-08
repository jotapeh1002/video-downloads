import axios from 'axios';

export async function GetDetails(url: string) {
  try {
    const response = await axios.get('http://192.168.0.2:3333/getvideos?url=' + url);

    return {
      message: response.data.message,
      statusCode: response.data.statusCode,
    };
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