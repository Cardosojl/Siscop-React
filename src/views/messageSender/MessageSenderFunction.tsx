import React, { ChangeEvent, FormEvent, ReactNode } from 'react';
import { siscopCreate, siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { Message, Process, Section, User } from 'src/config/types/types';
import { setInputs } from '../elementsCreator';

async function validate(form: Partial<Message> & Partial<Process>, setErrorMessage: CallableFunction) {
    setErrorMessage('');
    let error = false;
    const user = (await siscopShow('users/user', 0, { _id: form.sender as string })).data.response;
    if (!user) {
        setErrorMessage(<p className="MessageSender__message">{`Erro no Usuário`}</p>);
        error = true;
    }
    if (!form.title) {
        setErrorMessage(<p className="MessageSender__message">{`Título precisa ser preenchido`}</p>);
        error = true;
    }
    if (!form.receiver && !form.section_receiver) {
        setErrorMessage((curr: ReactNode) => (
            <>
                {curr} <p className="MessageSender__message">{`Destíno da mensagem deve ser selecionada`}</p>{' '}
            </>
        ));
        error = true;
    }
    if (form.receiver) {
        const receiver = (await siscopShow('users/user', 0, { _id: form.receiver })).data.response;
        if (!receiver) {
            setErrorMessage(<p className="MessageSender__message">{`Erro no Usuário escolhido`}</p>);
            error = true;
        }
    }
    if (form.section_receiver) {
        const section = (await siscopShow('sections/section', 0, { _id: form.section_receiver })).data.response;
        const users = (await siscopIndex('users', 0, 0, 0, { section: form.section_receiver })).data.response;
        console.log(users);

        if (!section) {
            setErrorMessage(<p className="MessageSender__message">{`Erro na Seção escolhida`}</p>);
            error = true;
        }
        if (!users) {
            setErrorMessage(<p className="MessageSender__message">{`Esta seção não possuí nenhum usuário cadastrado`}</p>);
            error = true;
        }
    }
    return error;
}

export async function handleForm(e: FormEvent, form: Partial<Message> & Partial<Process>, navigate: CallableFunction, setErrorMessage: CallableFunction): Promise<void> {
    e.preventDefault();
    if (!(await validate(form, setErrorMessage))) {
        await siscopCreate('messages', form);
        navigate('/enviadas/0');
    }
}

export async function handleUsers(user: User): Promise<User[] | null> {
    const users = await siscopIndex('users', 0, 0, 0, { select: '-password' });
    const { response }: { response: User[] | null } = users.data;
    const usersArray = response ? response.filter((element) => element._id !== user._id) : null;
    return usersArray;
}

export async function handleSections(): Promise<Section[] | null> {
    const sections = await siscopIndex('sections', 0, 0, 0);
    const { response }: { response: Section[] | null } = sections.data;
    const sectionsArray = response ? response.filter((element) => element.level !== 10) : null;
    return sectionsArray;
}

export async function handleProcesses(user: User, processId?: string | null): Promise<Process[] | null> {
    if (processId) {
        const process = await siscopShow('processes/process', 0, { _id: processId });
        const { response }: { response: Process } = process.data;
        if (response.user === user._id || response.receiver === user._id) {
            return [response];
        } else {
            return null;
        }
    }
    const processesDone = await siscopIndex('processes', 0, 0, 0, { user: user._id });
    const processesReceived = await siscopIndex('processes', 0, 0, 0, { receiver: user._id });
    const done: Process[] | null = processesDone.data.response;
    const received: Process[] | null = processesReceived.data.response;
    let processArray: Process[] | null = null;
    if (done !== null) processArray = [...done];
    if (received !== null) processArray = processArray ? [...processArray, ...received] : [...received];
    return processArray;
}

export function generateUserSelect(users: User[] | null, setForm: CallableFunction): ReactNode {
    if (users) {
        setForm((current: Partial<Message>) => ({ ...current, section_receiver: undefined }));
        const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
        const options = users
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((element) => element.name !== 'ADM')
            .map((element, index) => <option key={index} value={`${element._id}`}>{`${element.pg} ${element.name}`}</option>);
        return (
            <>
                <label className="MessageSender__labels">Usuário:</label>
                <select name="receiver" onChange={handleInput}>
                    <option value={undefined}></option>
                    {options}
                </select>
            </>
        );
    } else {
        return '';
    }
}

export function generateSectionSelect(section: Section[] | null, setForm: CallableFunction): ReactNode {
    if (section) {
        setForm((current: Partial<Message>) => ({ ...current, receiver: undefined }));
        const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
        const options = section
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((element) => element.name !== 'ADM')
            .map((element, index) => <option key={index} value={`${element._id}`}>{`${element.name}`}</option>);
        return (
            <>
                <label className="MessageSender__labels">Seção:</label>
                <select name="section_receiver" onChange={handleInput}>
                    <option value={undefined}></option>
                    {options}
                </select>
            </>
        );
    } else {
        return '';
    }
}

export function generateProcessSelect(process: Process[] | null, processId: string | null, setForm: CallableFunction): ReactNode {
    if (process) {
        const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
        if (processId) {
            const options = process.sort((a, b) => a.title.localeCompare(b.title)).map((element, index) => <option key={index} value={`${element._id}`}>{`${element.title}`}</option>);
            return (
                <>
                    <select name="process">{options}</select>
                </>
            );
        } else {
            const options = process.sort((a, b) => a.title.localeCompare(b.title)).map((element, index) => <option key={index} value={`${element._id}`}>{`${element.title}`}</option>);
            return (
                <>
                    <select name="process" onChange={handleInput}>
                        <option value=""></option>
                        {options}
                    </select>
                </>
            );
        }
    } else {
        return (
            <>
                <select name="process">
                    <option value=""></option>
                </select>
            </>
        );
    }
}
