import axios from 'axios';
import pino from 'pino';

const apiCallLogger = pino(
  pino.transport({
    target: 'pino/file',
    options: { destination: 'output/logs.txt', mkdir: true },
  }),
);

export const axiosInstanceWithLogger = axios.create();

axiosInstanceWithLogger.interceptors.response.use((response) => {
  if (process.env.NODE_ENV === 'test') return response;

  apiCallLogger.info({
    url: response.config.url,
    status: response.status,
    data: response.data,
  });

  return response;
});