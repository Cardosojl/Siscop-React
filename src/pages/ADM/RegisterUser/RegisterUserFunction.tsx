import React, { ChangeEvent } from 'react';
import { siscopCreate, siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { SectionTypes, UserTypes } from 'src/apis/types';
import { Message } from 'src/components/Message/index';

export async function handleSections(): Promise<SectionTypes[] | null> {
    const section = await siscopIndex('sections', 0, 0, 0, {});
    const { response }: { response: SectionTypes[] | null } = section.data;
    return response;
}

async function handleUser(name: string) {
    const user = await siscopShow('users/user', 0, { name });
    const { response }: { response: UserTypes | null } = user.data;
    return response;
}

async function formValidator(form: Partial<UserTypes>, setMessage: CallableFunction, sections: SectionTypes[] | null) {
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
    if (form.name && (await handleUser(form.name))) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Nome Já cadastrado no Sistema</Message>
            </>
        ));
        error = true;
    }
    if (!form.password || form.password.length < 6) {
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

export async function handleForm(e: ChangeEvent<HTMLFormElement>, form: Partial<UserTypes>, setMessage: CallableFunction, sections: SectionTypes[] | null) {
    e.preventDefault();
    if (!(await formValidator(form, setMessage, sections))) {
        await siscopCreate('users', form);
        setMessage(
            <>
                <Message $success>Usuário Criado</Message>
            </>
        );
    }
}
