/* eslint-disable prettier/prettier */
import axios from 'axios';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { siscopLoginCreate } from 'src/apis/siscopDB';
import { DispatchUser, User } from 'src/config/types/types';

async function handleLogin(navigate: NavigateFunction, dispatchUser: DispatchUser, form: Partial<User>): Promise<void> {
    navigate('/caixaDeEntrada/0');
    dispatchUser.loginRedux(await siscopLoginCreate(form));
    
}

// eslint-disable-next-line prettier/prettier
function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction, setMessageError: Dispatch<SetStateAction<string>>): void {
    if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) setMessageError(error.message);
    } else throwError(new Error((error as Error).message));
}


export async function handleUser(e: FormEvent<HTMLFormElement>, navigate: NavigateFunction, dispatchUser: DispatchUser, form: Partial<User>, throwError: CallableFunction, setMessageError: Dispatch<SetStateAction<string>>): Promise<void> {
    e.preventDefault();
    try {
        await handleLogin(navigate, dispatchUser, form);
    } catch (error) {
        handleErros(error as Error, dispatchUser, throwError, setMessageError);
    }
};

export function handleInputs(e: ChangeEvent<HTMLInputElement>, setForm: CallableFunction, form: Partial<User>): void {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
};