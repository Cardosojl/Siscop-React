import React, { ChangeEvent, FormEvent, ReactNode } from 'react';
import { siscopCreate, siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { MessageType, Process, Section, User } from 'src/config/types/types';
import { setInputs } from '../elementsCreator';
import { Select } from 'src/components/common/Select';
import { Message } from 'src/components/common/Message';
import { FormField } from 'src/components/common/FormField';

async function validate(form: Partial<MessageType> & Partial<Process>, setErrorMessage: CallableFunction) {
    setErrorMessage('');
    let error = false;
    const user = (await siscopShow('users/user', 0, { _id: form.sender as string })).data.response;
    if (!user) {
        setErrorMessage(<Message $error>{`Erro no Usuário`}</Message>);
        error = true;
    }
    if (!form.title) {
        setErrorMessage(<Message $error>{`Título precisa ser preenchido`}</Message>);
        error = true;
    }
    if (!form.receiver && !form.section_receiver) {
        setErrorMessage((curr: ReactNode) => (
            <>
                {curr} <Message $error>{`Destíno da mensagem deve ser selecionada`}</Message>{' '}
            </>
        ));
        error = true;
    }
    if (form.receiver) {
        const receiver = (await siscopShow('users/user', 0, { _id: form.receiver })).data.response;
        if (!receiver) {
            setErrorMessage(<Message>{`Erro no Usuário escolhido`}</Message>);
            error = true;
        }
    }
    if (form.section_receiver) {
        const section = (await siscopShow('sections/section', 0, { _id: form.section_receiver })).data.response;
        const users = (await siscopIndex('users', 0, 0, 0, { section: form.section_receiver })).data.response;
        console.log(users);

        if (!section) {
            setErrorMessage(<Message $error>{`Erro na Seção escolhida`}</Message>);
            error = true;
        }
        if (!users) {
            setErrorMessage(<Message $error>{`Esta seção não possuí nenhum usuário cadastrado`}</Message>);
            error = true;
        }
    }
    return error;
}

export async function handleForm(e: FormEvent, form: Partial<MessageType> & Partial<Process>, navigate: CallableFunction, setErrorMessage: CallableFunction): Promise<void> {
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
        setForm((current: Partial<MessageType>) => ({ ...current, section_receiver: undefined }));
        const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
        const UsersArrayValue = users.filter((element) => element.name !== 'ADM').map((element) => element._id);
        const UsersArray = users.filter((element) => element.name !== 'ADM').map((element) => element.name);
        return (
            <>
                <FormField label="Usuário">
                    <Select name="receiver" onChange={handleInput} optionValues={UsersArray} elementValue="" alternativeValues={UsersArrayValue} sort={true} />
                </FormField>
            </>
        );
    } else {
        return '';
    }
}

export function generateSectionSelect(section: Section[] | null, setForm: CallableFunction): ReactNode {
    if (section) {
        setForm((current: Partial<MessageType>) => ({ ...current, receiver: undefined }));
        const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
        const sectionArrayValue = section.filter((element) => element.name !== 'ADM').map((element) => element._id);
        const sectionArray = section.filter((element) => element.name !== 'ADM').map((element) => element.name);
        return (
            <>
                <FormField label="Seção:">
                    <Select sort={true} name="section_receive" optionValues={sectionArray} elementValue="" alternativeValues={sectionArrayValue} onChange={handleInput} />
                </FormField>
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
            const processArrayValue = process.map((element) => element._id);
            const processArray = process.map((element) => element.title);
            return (
                <>
                    <Select
                        name="process"
                        sort={true}
                        optionValues={processArray}
                        elementValue={processArray[0]}
                        alternativeValues={processArrayValue}
                        onChange={() => {
                            ('');
                        }}
                    />
                </>
            );
        } else {
            const optionValues = process.map((element) => element.title);
            const alternativeValues = process.map((element) => element._id);
            return (
                <>
                    <Select name="process" sort={true} optionValues={optionValues} elementValue="" alternativeValues={alternativeValues} onChange={handleInput} />
                </>
            );
        }
    } else {
        return (
            <>
                <Select name="process" sort={false} optionValues={[]} elementValue="" onChange={() => ''} />
            </>
        );
    }
}
