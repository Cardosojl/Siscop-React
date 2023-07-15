import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { siscopLenght } from 'src/apis/siscopDB';
import { DispatchUser, Message, ObjFilter, Process, User } from 'src/config/types/types';

export async function handleApiLength(path: string, user: User, filter?: ObjFilter | null): Promise<number> {
    const response: Array<Message | Process> = [];
    if (path === 'messageSents') response.push(...(await siscopLenght(path, { sender: user._id }, filter)));
    if (path === 'messages') response.push(...(await siscopLenght(path, { receiver: user._id, section: user.section }, filter)));
    if (path === 'messageArchiveds') response.push(...(await siscopLenght(path, { receiver: user._id, section: user.section }, filter)));
    return response.length;
}

export function buttonActiveClass(direction: string, index: number, limit: number, length?: number): string {
    if (direction === 'left') return index > 1 ? 'Button--green' : 'Button--disabled';
    if (direction === 'right' && length) return length > limit * index ? 'Button--green' : 'Button--disabled';
    else return 'Button--disabled';
}

export function leftArrowActive(indexPage: number): boolean {
    return indexPage > 1 ? false : true;
}

export function rightArrowActive(indexPage: number, limit: number, length: number): boolean {
    return length > limit * indexPage ? false : true;
}

// eslint-disable-next-line prettier/prettier
export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction, setLength: Dispatch<SetStateAction<number>>): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        if (error.response?.status === 404) setLength(1);
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}
