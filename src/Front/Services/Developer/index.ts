import { axiosInstance } from '@/Front/Services/Config';
import { AxiosResponse } from '@/Front/Interfaces/AxiosResponse';

export const getDeveloper = (): Promise<AxiosResponse> => axiosInstance.get('/developer');
