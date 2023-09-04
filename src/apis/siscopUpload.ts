import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ObjFilter } from 'src/config/types/types';

const axiosUpload = axios.create({ baseURL: 'http://192.168.15.7:3998', withCredentials: true });

export async function uploadCreate(baseUrl: string, body: ObjFilter, header: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await axiosUpload.post(`/${baseUrl}`, body, header);
    return response;
}
