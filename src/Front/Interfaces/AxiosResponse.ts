import { AxiosResponseHeaders, AxiosRequestConfig } from "axios";
import { DeveloperResponse } from './Developer';

export interface AxiosResponse<T = DeveloperResponse | any, D = any> {
	data: T;
	status: number;
	statusText: string;
	headers: AxiosResponseHeaders;
	config: AxiosRequestConfig<D>;
	request?: any;
}
