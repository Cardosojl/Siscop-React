import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { handleErros, siscopLoginCreate } from 'src/apis/siscopDB';
import { DispatchUser, Section, User } from 'src/config/types/types';

async function handleLogin(navigate: NavigateFunction, dispatchUser: DispatchUser, form: Partial<User<string, Section>>): Promise<void> {
    navigate('/caixaDeEntrada/0');
    dispatchUser(await siscopLoginCreate(form));
}

export async function handleUser(
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
