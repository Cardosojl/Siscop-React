import axios, { AxiosError, AxiosResponse } from 'axios';
import { Message, ObjFilter, Process, SiscopApiIndex, SiscopApiShow, User } from 'src/config/types/types';
import { ObjectToQueryString } from './apiFunctions';

const axiosSiscopDB = axios.create({ baseURL: process.env.REACT_APP_SISCOP_DB, withCredentials: true });

export async function siscopLoginCreate(login: Partial<User>): Promise<User> {
    try {
        const response = await axiosSiscopDB.post('/login', login);
        return { ...response.data.user, logged: true };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errors: [] = error.response.data.errors;
            const errorMessage = errors.map((element: Record<string, string>) => element.message).join('\n');
            const stringCode = error.response.status.toString();

            throw new AxiosError(errorMessage, stringCode);
        } else {
            throw new Error((error as Error).message);
        }
    }
}

export async function siscopLogoffDelete(): Promise<User> {
    try {
        const response = await axiosSiscopDB.delete('/logoff');
        return { ...response.data.user, logged: true };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errors: [] = error.response.data.errors;
            const errorMessage = errors.map((element: Record<string, string>) => element.message).join('\n');
            const stringCode = error.response.status.toString();

            throw new AxiosError(errorMessage, stringCode);
        } else {
            throw new Error((error as Error).message);
        }
    }
}

// eslint-disable-next-line prettier/prettier
export async function siscopIndex(path: string, limit: number, index: number, includes: string[] | number, parameters?: ObjFilter, filter?: ObjFilter | null): Promise<SiscopApiIndex> {
    try {
        const population = typeof includes === 'number' ? '' : includes.map((element, index) => `include[${index}]=${element}&`).join('');
        const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
        const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
        const url = `/${path}?${population}limit=${limit}&page=${index}&${queryParameters}${queryFilter}`;
        const response = await axiosSiscopDB.get(url);
        return response.data.response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errors: [] = error.response.data.errors;
            const errorMessage = errors.map((element: Record<string, string>) => element.message).join('\n');
            console.log(errorMessage);
        }
        throw error;
    }
}

export async function siscopLenght(path: string, parameters?: ObjFilter, filter?: ObjFilter | null): Promise<Message[]> {
    try {
        const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
        const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
        const url = `/${path}?select=1_id&${queryParameters}${queryFilter}`;
        const response = await axiosSiscopDB.get(url);
        const messages: Message[] = response.data.response;
        return messages;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errors: [] = error.response.data.errors;
            const errorMessage = errors.map((element: Record<string, string>) => element.message).join('\n');
            console.log(errorMessage);
        }
        throw error;
    }
}

export async function siscopShow(path: string, includes: string[] | number, parameters: ObjFilter, filter?: ObjFilter | null): Promise<SiscopApiShow> {
    try {
        const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
        const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
        const population = typeof includes === 'number' ? '' : includes.map((element, index) => `include[${index}]=${element}&`).join('');
        const url = `/${path}?${population}&${queryParameters}${queryFilter}`;
        const response = await axiosSiscopDB.get(url);
        const messages: Message = response.data.response;
        return messages;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errors: [] = error.response.data.errors;
            const errorMessage = errors.map((element: Record<string, string>) => element.message).join('\n');
            console.log(errorMessage);
        }
        throw error;
    }
}

export async function siscopDelete(path: string, parameters: ObjFilter, filter?: ObjFilter | null): Promise<AxiosResponse<string, string>> {
    try {
        const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
        const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
        const url = `/${path}?${queryParameters}${queryFilter}`;
        const response = await axiosSiscopDB.delete(url);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errors: [] = error.response.data.errors;
            const errorMessage = errors.map((element: Record<string, string>) => element.message).join('\n');
            console.log(errorMessage);
        }
        throw error;
    }
}

export async function siscopCreate(path: string, body: ObjFilter): Promise<void> {
    try {
        await axiosSiscopDB.post(`/${path}`, body);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errors: [] = error.response.data.errors;
            const errorMessage = errors.map((element: Record<string, string>) => element.message).join('\n');
            const stringCode = error.response.status.toString();

            throw new AxiosError(errorMessage, stringCode);
        } else {
            throw new Error((error as Error).message);
        }
    }
}
