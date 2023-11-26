import React, { ChangeEvent } from 'react';
import { siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { ProfileTypes, SectionTypes, UserTypes } from 'src/apis/types';
import { DefineUserTypes } from 'src/context/types';
import { Message } from 'src/components/Message/index';

async function formValidator(form: Partial<ProfileTypes>, user: UserTypes, setMessage: CallableFunction) {
    let error = false;
    setMessage('');
    if (form.password && form.current) {
        if (!(await handlePassword(user.name, form.current))) {
            setMessage(<Message $error>Senha atual errada</Message>);
            error = true;
        }
        if (form.password.length < 6) {
            setMessage(<Message $error>Senha nova precisa ter mais de 5 caracteres</Message>);
            error = true;
        }
        if (form.password !== form.confirm) {
            setMessage(<Message $error>Senha nova não bate com a confirmação</Message>);
            error = true;
        }
    }
    return error;
}

async function handlePassword(name: string, current: string) {
    const profile = await siscopShow('profileValidate', 0, { name: name, password: current });
    const { response }: { response: UserTypes | null } = profile.data;
    return response;
}

async function handleProfile(user: UserTypes): Promise<UserTypes<string, SectionTypes> | null> {
    const profile = await siscopShow('users/user', ['section'], { _id: user._id, select: '-password' });
    const { response }: { response: UserTypes<string, SectionTypes> | null } = profile.data;
    return response;
}

async function updateUser(user: UserTypes, form: Partial<ProfileTypes>) {
    const profile = await siscopUpdate('users', { _id: user._id }, form);
    const { response }: { response: UserTypes | null } = profile.data;
    return response;
}

export async function handleForm(e: ChangeEvent<HTMLFormElement>, form: Partial<ProfileTypes>, user: UserTypes, setMessage: CallableFunction, navigate: CallableFunction, defineUser: DefineUserTypes) {
    e.preventDefault();
    if (!(await formValidator(form, user, setMessage))) {
        await updateUser(user, form);
        const profile = await handleProfile(user);
        if (profile) {
            defineUser({ ...profile, logged: true });
            navigate('/caixaDeEntrada/0');
        }
    }
}
