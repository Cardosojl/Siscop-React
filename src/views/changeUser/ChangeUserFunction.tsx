import React, { ChangeEvent } from 'react';
import { siscopIndex, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { Section, User } from 'src/config/types/types';
import { Message } from 'src/components/common/Message';

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
        } else setMessage(<Message $error>Usuário não encontrado</Message>);
    }
}

async function formValidator(form: Partial<User>, setMessage: CallableFunction, sections: Section[] | null, user: User<string, Section>) {
    const sectionArrayID = sections ? sections.map((element) => element._id) : [];
    let error = false;
    setMessage('');
    if (!form.name || form.name.length < 3) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Nome inválido (Nome precisa ter mais que 3 caracteres)</Message>
            </>
        ));
        error = true;
    }
    if (form.name && form.name !== user.name && (await handleUser(form.name))) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Nome Já cadastrado no Sistema</Message>
            </>
        ));
        error = true;
    }
    if (form.password && form.password.length < 6) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Senha inválida (Senha precisa ter mais que 5 caracteres)</Message>
            </>
        ));
        error = true;
    }
    if (!form.section || !sectionArrayID.includes(form.section as string)) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Seção inválida</Message>
            </>
        ));
        error = true;
    }

    if (!form.level || (form.level as number) > 10 || (form.level as number) < 0) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Level inválido</Message>
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
                <Message $success>Usuário Editado</Message>
            </>
        );
    }
}
