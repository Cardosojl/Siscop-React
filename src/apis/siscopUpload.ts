import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ObjFilter } from 'src/config/types/types';

console.log(process.env.REACT_APP_SISCOP_API_UPLOAD);
const axiosUpload = axios.create({ baseURL: process.env.REACT_APP_SISCOP_API_UPLOAD, withCredentials: true });

export async function uploadCreate(baseUrl: string, body: ObjFilter, header: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await axiosUpload.post(`/${baseUrl}`, body, header);
    return response;
}
