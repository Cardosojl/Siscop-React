import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { getToken, handleErros, siscopShow } from 'src/apis/siscopDB';
import { SectionTypes, UserTypes } from 'src/apis/types';
import { DefineUserTypes } from 'src/context/types';

async function handleLogin(navigate: NavigateFunction, defineUser: DefineUserTypes, form: Partial<UserTypes<string, SectionTypes>>): Promise<void> {
    await createSession(defineUser, form);
    navigate('/caixaDeEntrada/0');
}

async function handleUserValues(defineUser: DefineUserTypes, form: Partial<UserTypes<string, SectionTypes>>): Promise<void> {
    const user = (await siscopShow('users/user', ['section'], { name: form.name, select: '-password' })).data.response;
    defineUser({ ...user, logged: true });
    localStorage.setItem('user', JSON.stringify({ ...user, logged: true }));
}

export async function handleSession(
    e: FormEvent<HTMLFormElement>,
    navigate: NavigateFunction,
    defineUser: DefineUserTypes,
    form: Partial<UserTypes<string, SectionTypes>>,
    throwError: CallableFunction,
    setMessageError: Dispatch<SetStateAction<string>>
): Promise<void> {
    e.preventDefault();
    try {
        await handleLogin(navigate, defineUser, form);
    } catch (error) {
        console.log(error);
        handleErros(error as Error, defineUser, throwError, setMessageError);
    }
}

export function handleInputs(e: ChangeEvent<HTMLInputElement>, setForm: CallableFunction, form: Partial<UserTypes>): void {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
}

async function createSession(defineUser: DefineUserTypes, form: Partial<UserTypes<string, SectionTypes>>): Promise<void> {
    try {
        await getToken(form);
        await handleUserValues(defineUser, form);
    } catch (error) {
        console.log(error);
    }
}
