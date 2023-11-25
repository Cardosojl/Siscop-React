import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { getToken, handleErros, siscopShow } from 'src/apis/siscopDB';
import { DispatchUser, Section, User } from 'src/config/types/types';

async function handleLogin(navigate: NavigateFunction, dispatchUser: DispatchUser, form: Partial<User<string, Section>>): Promise<void> {
    await createSession(dispatchUser, form);
    navigate('/caixaDeEntrada/0');
}

async function handleUserValues(dispatchUser: DispatchUser, form: Partial<User<string, Section>>): Promise<void> {
    const user = (await siscopShow('users/user', ['section'], { name: form.name, select: '-password' })).data.response;
    dispatchUser({ ...user, logged: true });
    localStorage.setItem('user', JSON.stringify({ ...user, logged: true }));
}

export async function handleSession(
    e: FormEvent<HTMLFormElement>,
    navigate: NavigateFunction,
    dispatchUser: DispatchUser,
    form: Partial<User<string, Section>>,
    throwError: CallableFunction,
    setMessageError: Dispatch<SetStateAction<string>>
): Promise<void> {
    e.preventDefault();
    try {
        await handleLogin(navigate, dispatchUser, form);
    } catch (error) {
        console.log(error);
        handleErros(error as Error, dispatchUser, throwError, setMessageError);
    }
}

export function handleInputs(e: ChangeEvent<HTMLInputElement>, setForm: CallableFunction, form: Partial<User>): void {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
}

async function createSession(dispatchUser: DispatchUser, form: Partial<User<string, Section>>): Promise<void> {
    try {
        await getToken(form);
        await handleUserValues(dispatchUser, form);
    } catch (error) {
        console.log(error);
    }
}
