import { axiosInstance } from '../Config';
import { AxiosResponse } from '@/Front/Interfaces/AxiosResponse';

export const getDeveloper = (): Promise<AxiosResponse> => axiosInstance.get('/developer');
