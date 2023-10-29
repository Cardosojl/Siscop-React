import React, { ChangeEvent, createElement } from 'react';
import { siscopIndex, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { Section, User } from 'src/config/types/types';
import { generateOptions, generateOptionsWS, setInputs } from '../elementsCreator';

async function handleUser(name: string) {
    const user = await siscopShow('users/user', ['section'], { name, select: '-password' });
    const { response }: { response: User<string, Section> | null } = user.data;
    return response;
}

export async function handleSections(): Promise<Section[] | null> {
    const section = await siscopIndex('sections', 0, 0, 0, {});
    const { response }: { response: Section[] | null } = section.data;
    return response;
}

export async function handleFind(e: ChangeEvent<HTMLFormElement>, name: string, setMessage: CallableFunction, setUser: CallableFunction, setForm: CallableFunction) {
    e.preventDefault();
    setMessage('');
    if (name) {
        const user = await handleUser(name);
        if (user) {
            setUser(user);
            setForm({ ...user, section: (user?.section as Section)._id });
        } else setMessage(<p>Usuário não encontrado</p>);
    }
}

async function formValidator(form: Partial<User>, setMessage: CallableFunction, sections: Section[] | null, user: User<string, Section>) {
    const grad = ['Sd', 'Cb', '3º Sgt', '2º Sgt', '1º Sgt', 'Sub Ten', 'Asp', '2º Ten', '1º Ten', 'Cap', 'Maj', 'Ten Cel', 'Cel'];
    const sectionArrayID = sections ? sections.map((element) => element._id) : [];
    let error = false;
    setMessage('');
    if (!form.name || form.name.length < 3) {
        setMessage((current: string) => (
            <>
                {current} <p>Nome inválido (Nome precisa ter mais que 3 caracteres)</p>
            </>
        ));
        error = true;
    }
    if (form.name && form.name !== user.name && (await handleUser(form.name))) {
        setMessage((current: string) => (
            <>
                {current} <p>Nome Já cadastrado no Sistema</p>
            </>
        ));
        error = true;
    }
    if (form.password && form.password.length < 6) {
        setMessage((current: string) => (
            <>
                {current} <p>Senha inválida (Senha precisa ter mais que 5 caracteres)</p>
            </>
        ));
        error = true;
    }
    if (!form.pg || !grad.includes(form.pg)) {
        setMessage((current: string) => (
            <>
                {current} <p>Posto \ Graduação inválido</p>
            </>
        ));
        error = true;
    }
    if (!form.section || !sectionArrayID.includes(form.section as string)) {
        setMessage((current: string) => (
            <>
                {current} <p>Seção inválida</p>
            </>
        ));
        error = true;
    }

    if (!form.level || (form.level as number) > 10 || (form.level as number) < 0) {
        setMessage((current: string) => (
            <>
                {current} <p>Level inválido</p>
            </>
        ));
        error = true;
    }
    return error;
}

export async function handleForm(e: ChangeEvent<HTMLFormElement>, form: Partial<User>, setMessage: CallableFunction, sections: Section[] | null, user: User<string, Section>) {
    e.preventDefault();
    if (!(await formValidator(form, setMessage, sections, user))) {
        const finalForm = form.name === user.name ? { ...form, name: undefined } : form;
        console.log(finalForm);
        await siscopUpdate('users', { _id: user._id }, finalForm);
        setMessage(
            <>
                <p>Usuário Editado</p>
            </>
        );
    }
}

export function generateBody(sections: Section[] | null, form: Partial<User>, setForm: CallableFunction, user: User<string, Section>) {
    const grad = ['Sd', 'Cb', '3º Sgt', '2º Sgt', '1º Sgt', 'Sub Ten', 'Asp', '2º Ten', '1º Ten', 'Cap', 'Maj', 'Ten Cel', 'Cel'];
    const level = Array.from({ length: 11 }, (_, index) => `${index}`);
    const sectionArray = sections ? sections.map((element) => element.name) : [];
    const sectionArrayID = sections ? sections.map((element) => element._id) : [];
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);

    const hr = createElement('hr', { key: '17' });
    const nameDiv = createElement('div', { key: '0' }, [
        createElement('label', { key: '6' }, 'Nome:'),
        createElement('input', { name: 'name', className: 'Form--input__small', type: 'text', value: form.name || '', onChange: handleInput, key: '7' }),
    ]);
    const passwordDiv = createElement('div', { key: '1' }, [
        createElement('label', { key: '8' }, 'Senha:'),
        createElement('input', {
            name: 'password',
            className: 'Form--input__small',
            type: 'password',
            value: form.password || '',
            onChange: handleInput,
            key: '9',
        }),
    ]);
    const pgDiv = createElement('div', { key: '2' }, [
        createElement('label', { key: '10' }, 'Posto / Graduação:'),
        createElement('select', { name: 'pg', key: '11', onChange: handleInput }, [generateOptionsWS(grad, user.pg)]),
    ]);
    const sectionDiv = createElement('div', { key: '3' }, [
        createElement('label', { key: '12' }, 'Seção:'),
        createElement('select', { name: 'section', key: '13', onChange: handleInput }, [generateOptions(sectionArray, (user.section as Section).name, sectionArrayID)]),
    ]);
    const levelDiv = createElement('div', { key: '4' }, [
        createElement('label', { key: '14' }, 'Level:'),
        createElement('select', { name: 'level', key: '15', onChange: handleInput }, [generateOptionsWS(level, user.level.toString())]),
    ]);
    console.log(user.level as string);

    const button = createElement('button', { className: 'Button--green', key: '16' }, 'Alterar');

    const div = createElement('div', { key: '5' }, [hr, nameDiv, passwordDiv, pgDiv, sectionDiv, levelDiv, button]);
    return div;
}
