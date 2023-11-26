import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FilterTypes } from 'src/apis/types';
const axiosUpload = axios.create({ baseURL: process.env.REACT_APP_SISCOP_API_UPLOAD, withCredentials: true });

export async function uploadCreate(baseUrl: string, body: FilterTypes, header: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await axiosUpload.post(`/${baseUrl}`, body, header);
    return response;
}
