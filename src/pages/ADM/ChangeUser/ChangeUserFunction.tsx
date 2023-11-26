import React, { ChangeEvent } from 'react';
import { siscopIndex, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { SectionTypes, UserTypes } from 'src/apis/types';
import { Message } from 'src/components/Message/index';

async function handleUser(name: Partial<UserTypes>) {
    const user = await siscopShow('users/user', ['section'], { ...name, select: '-password' });
    const { response }: { response: UserTypes<string, SectionTypes> | null } = user.data;
    return response;
}

export async function handleSections(): Promise<SectionTypes[] | null> {
    const section = await siscopIndex('sections', 0, 0, 0, {});
    const { response }: { response: SectionTypes[] | null } = section.data;
    return response;
}

export async function handleFind(e: ChangeEvent<HTMLFormElement>, name: Partial<UserTypes>, setMessage: CallableFunction, setUser: CallableFunction, setForm: CallableFunction) {
    e.preventDefault();
    setMessage('');
    if (name) {
        const user = await handleUser(name);
        if (user) {
            setUser(user);
            setForm({ ...user, section: (user?.section as SectionTypes)._id });
        } else setMessage(<Message $error>Usuário não encontrado</Message>);
    }
}

async function formValidator(form: Partial<UserTypes>, setMessage: CallableFunction, sections: SectionTypes[] | null, user: UserTypes<string, SectionTypes>) {
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
    if (form.name && form.name !== user.name && (await handleUser({ name: form.name }))) {
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

export async function handleForm(e: ChangeEvent<HTMLFormElement>, form: Partial<UserTypes>, setMessage: CallableFunction, sections: SectionTypes[] | null, user: UserTypes<string, SectionTypes>) {
    e.preventDefault();
    if (!(await formValidator(form, setMessage, sections, user))) {
        const finalForm = form.name === user.name ? { ...form, name: undefined } : form;
        await siscopUpdate('users', { _id: user._id }, finalForm);
        setMessage(
            <>
                <Message $success>Usuário Editado</Message>
            </>
        );
    }
}
