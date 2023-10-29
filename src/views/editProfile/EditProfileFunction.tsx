import React, { ChangeEvent, createElement } from 'react';
import { siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { DispatchUser, Profile, Section, User } from 'src/config/types/types';
import { generateOptions, generateOptionsWS, setInputs } from '../elementsCreator';

async function formValidator(form: Partial<Profile>, user: User, setMessage: CallableFunction) {
    let error = false;
    setMessage('');
    if (form.pg) {
        const grad = ['Sd', 'Cb', '3º Sgt', '2º Sgt', '1º Sgt', 'Sub Ten', 'Asp', '2º Ten', '1º Ten', 'Cap', 'Maj', 'Ten Cel', 'Cel'];
        if (!grad.includes(form.pg)) error = true;
    }
    if (form.password && form.current) {
        if (!(await handlePassword(user.name, form.current))) {
            setMessage(
                <>
                    <p>Senha atual errada</p>
                </>
            );
            error = true;
        }
        if (form.password.length < 6) {
            setMessage(
                <>
                    <p>Senha nova precisa ter mais de 5 caracteres</p>
                </>
            );
            error = true;
        }
        if (form.password !== form.confirm) {
            setMessage(
                <>
                    <p>Senha nova não bate com a confirmação</p>
                </>
            );
            error = true;
        }
    }
    return error;
}

async function handlePassword(name: string, current: string) {
    const profile = await siscopShow('profileValidate', 0, { name: name, password: current });
    const { response }: { response: User | null } = profile.data;
    return response;
}

async function handleProfile(user: User): Promise<User<string, Section> | null> {
    const profile = await siscopShow('users/user', ['section'], { _id: user._id, select: '-password' });
    const { response }: { response: User<string, Section> | null } = profile.data;
    return response;
}

async function updateUser(user: User, form: Partial<Profile>) {
    const profile = await siscopUpdate('users', { _id: user._id }, form);
    const { response }: { response: User | null } = profile.data;
    return response;
}

// eslint-disable-next-line prettier/prettier
export async function handleForm(e: ChangeEvent<HTMLFormElement>, form: Partial<Profile>, user: User, setMessage: CallableFunction, navigate: CallableFunction, dispatchUser: DispatchUser) {
    e.preventDefault();
    if (!(await formValidator(form, user, setMessage))) {
        await updateUser(user, form);
        const profile = await handleProfile(user);
        if (profile) {
            dispatchUser.loginRedux({ ...profile, logged: true });
            navigate('/caixaDeEntrada/0');
        }
    }
}

export function generateChangeData(user: User, setDataAction: CallableFunction, dataAction: boolean, setForm: CallableFunction) {
    const showBody = () => setDataAction((curr: boolean) => !curr);
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const grad = ['Sd', 'Cb', '3º Sgt', '2º Sgt', '1º Sgt', 'Sub Ten', 'Asp', '2º Ten', '1º Ten', 'Cap', 'Maj', 'Ten Cel', 'Cel'];
    const h4 = createElement('h4', { key: '16', className: 'EditProfile__title', onClick: showBody }, 'Alterar Dados');
    const hr = createElement('hr', { key: '17' });
    const label = createElement('label', { key: '18' }, 'Posto/Graduação:');
    const select = createElement('select', { key: '19', name: 'pg', onChange: handleInput }, generateOptionsWS(grad, user.pg));
    const button = createElement('button', { key: '20', className: 'Button--green' }, 'Alterar');
    const buttonDiv = createElement('div', { key: '21' }, [button]);
    if (dataAction) {
        return createElement('div', { key: '22' }, [h4, hr, label, select, buttonDiv]);
    } else {
        return createElement('div', { key: '23' }, [h4, hr]);
    }
}

export function generateChangePassword(setPasswordAction: CallableFunction, passwordAction: boolean, setForm: CallableFunction, form: Partial<Profile>) {
    const showBody = () => setPasswordAction((curr: boolean) => !curr);
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const h4 = createElement('h4', { key: '1', className: 'EditProfile__title', onClick: showBody }, 'Alterar Senha');
    const hr = createElement('hr', { key: '2' });
    const label1 = createElement('label', { key: '3' }, 'Senha Atual:');
    const input1 = createElement('input', { key: '4', type: 'password', name: 'current', onChange: handleInput, value: form.current || '' });
    const div1 = createElement('div', { key: '5', className: 'EditProfile' }, [label1, input1]);
    const label2 = createElement('label', { key: '6' }, 'Senha Nova:');
    const input2 = createElement('input', { key: '7', type: 'password', name: 'password', onChange: handleInput, value: form.password || '' });
    const div2 = createElement('div', { key: '8' }, [label2, input2]);
    const label3 = createElement('label', { key: '9' }, 'Repetir Senha:');
    const input3 = createElement('input', { key: '10', type: 'password', name: 'confirm', onChange: handleInput, value: form.confirm || '' });
    const div3 = createElement('div', { key: '11' }, [label3, input3]);
    const button = createElement('button', { key: '12', className: 'Button--green' }, 'Alterar');
    const buttonDiv = createElement('div', { key: '13' }, [button]);
    if (passwordAction) {
        return createElement('div', { key: '14' }, [h4, hr, div1, div2, div3, buttonDiv]);
    } else {
        return createElement('div', { key: '15' }, [h4, hr]);
    }
}
