import axios, { AxiosResponse } from 'axios';
import { FilterTypes, SectionTypes, SiscopApiForm, UserTypes } from 'src/apis/types';
import { DefineUserTypes } from 'src/context/types';
import { ObjectToQueryString, generateIndexRequest, generateShowRequest } from './apiFunctions';
import { initialUser } from 'src/context/UserContext';

const axiosSiscopDB = axios.create({ baseURL: process.env.REACT_APP_SISCOP_API, withCredentials: true });

axiosSiscopDB.interceptors.response.use(
    (respose) => respose,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export function sessionValues() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!user) {
        localStorage.setItem('user', JSON.stringify(initialUser));
    }

    if (token) {
        axiosSiscopDB.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export async function getToken(form: Partial<UserTypes<string, SectionTypes>>) {
    const {
        data: { token },
    } = await siscopCreate('token', form);
    localStorage.setItem('token', token);
    axiosSiscopDB.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function siscopIndex(baseUrl: string, limit: number, index: number, includes: string[] | number, parameters?: FilterTypes, filter?: FilterTypes | null): Promise<AxiosResponse> {
    const url = generateIndexRequest(baseUrl, limit, index, includes, parameters, filter);
    const response = await axiosSiscopDB.get(url);
    return response; //.data.response;
}

export async function siscopLenght(baseUrl: string, parameters?: FilterTypes, filter?: FilterTypes | null): Promise<AxiosResponse> {
    const url = generateIndexRequest(baseUrl, 0, 0, 0, { ...parameters, select: '1_id' }, filter);
    const response = await axiosSiscopDB.get(url);
    return response; //.data.response;
}

export async function siscopShow(baseUrl: string, includes: string[] | number, parameters: FilterTypes, filter?: FilterTypes | null): Promise<AxiosResponse> {
    const url = generateShowRequest(baseUrl, includes, parameters, filter);
    const response = await axiosSiscopDB.get(url);
    return response;
}

export async function siscopDelete(baseUrl: string, parameters: FilterTypes, filter?: FilterTypes | null): Promise<AxiosResponse> {
    const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
    const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
    const url = `/${baseUrl}?${queryParameters}${queryFilter}`;
    const response = await axiosSiscopDB.delete(url);
    return response;
}

export async function siscopCreate(baseUrl: string, body: SiscopApiForm): Promise<AxiosResponse> {
    const response = await axiosSiscopDB.post(`/${baseUrl}`, body);
    return response;
}

export async function siscopUpdate(baseUrl: string, parameters: FilterTypes, body: SiscopApiForm): Promise<AxiosResponse> {
    const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
    const response = await axiosSiscopDB.put(`/${baseUrl}?${queryParameters}`, body);
    return response;
}

export function handleErros(error: Error, defineUser: DefineUserTypes, throwError: CallableFunction, setMessage?: CallableFunction): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) defineUser(initialUser);
        else {
            setMessage ? setMessage(error.response?.data.errors.map((element: { message: string }) => `${element.message}\n`)) : throwError(new Error((error as Error).message));
        }
    } else throwError(new Error((error as Error).message));
}

export default axiosSiscopDB;
