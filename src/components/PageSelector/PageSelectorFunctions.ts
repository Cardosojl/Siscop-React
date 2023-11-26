import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { siscopLenght } from 'src/apis/siscopDB';
import { FilterTypes, SectionTypes, SiscopApiIndex, UserTypes } from 'src/apis/types';
import { DefineUserTypes } from 'src/context/types';
import { initialUser } from 'src/context/UserContext';

export async function handleApiLength(path: string, user: UserTypes<string, SectionTypes>, filter?: FilterTypes | null): Promise<number> {
    let response: SiscopApiIndex = null;
    const processPath = 'processes';
    if (path === 'messageSents') response = (await siscopLenght(path, { sender: user._id }, filter)).data.response;
    if (path === 'messages') response = (await siscopLenght(path, { receiver: user._id, section: user.section._id }, filter)).data.response;
    if (path === 'messageArchiveds') response = (await siscopLenght(path, { receiver: user._id, section: user.section._id }, filter)).data.response;
    if (path === 'myProcess') response = (await siscopLenght(processPath, { user: user._id }, filter)).data.response;
    if (path === 'receivedProcess') response = (await siscopLenght(processPath, { receiver: user._id, section: user.section._id }, filter)).data.response;
    if (path === 'processes') response = (await siscopLenght(processPath, {}, filter)).data.response;
    //processDone---------*
    const length = response ? response.length : 1;
    return length;
}

export function leftArrowActive(indexPage: number): boolean {
    return indexPage > 1 ? true : false;
}

export function rightArrowActive(indexPage: number, limit: number, length: number): boolean {
    return length > limit * indexPage ? true : false;
}

export function handleErros(error: Error, defineUser: DefineUserTypes, throwError: CallableFunction, setLength: Dispatch<SetStateAction<number>>): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) defineUser(initialUser);
        if (error.response?.status === 404) setLength(1);
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}
