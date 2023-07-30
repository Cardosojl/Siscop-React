import React, { ChangeEvent, FormEvent, createElement } from 'react';
import { Process, ProcessState, User } from 'src/config/types/types';
import { generateOptions, setInputs } from '../elementsCreator';
import { siscopCreate, siscopShow } from 'src/apis/siscopDB';

function validationForm(form: Partial<ProcessState>, setMessage: CallableFunction): boolean {
    const stateOptions = ['Coletando Orçamentos', 'Em Montagem', 'Montagem Finalizada', 'Em Análise', 'Outro'];
    let error = false;
    if (!form.state || form.state === '' || !stateOptions.includes(form.state)) {
        setMessage('Valor do Estado é inválido');
        error = true;
    }
    return error;
}

export async function handleForm(e: FormEvent, form: Partial<ProcessState>, setMessage: CallableFunction, navigate: CallableFunction): Promise<void> {
    e.preventDefault();
    if (!validationForm(form, setMessage)) {
        await siscopCreate('processStates', form);
        navigate(-1);
    }
}

export function generateForm(form: Partial<ProcessState>, setForm: CallableFunction) {
    const stateOptions = ['Coletando Orçamentos', 'Em Montagem', 'Montagem Finalizada', 'Em Análise', 'Outro'];
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);

    const anotation = createElement('div', { className: 'Form__textareaDiv' }, [
        createElement('label', null, 'Anotação:'),
        createElement('textarea', { name: 'anotation', value: form.anotation, onChange: handleInput }),
    ]);
    const state = createElement('div', null, [
        createElement('label', null, 'Estato:'),
        createElement('select', { name: 'state', value: form.state, onChange: handleInput }, generateOptions(stateOptions, '')),
    ]);
    const sendButton = createElement('input', { type: 'submit', className: 'Button--green', value: 'Enviar' });

    return createElement('div', null, [anotation, state, sendButton]);
}

export async function handleProcess(path: string, user: User, processId: string): Promise<Process> {
    const process = await siscopShow('processes/process', ['origin'], { _id: processId });
    const { response }: { response: Process | null } = process.data;
    if (path === 'myProcess' && response && response.user === user._id) return response;
    if (path === 'receivedProcess' && response && (response.receiver === user._id || response.section_receiver === user.section)) return response;
    else throw { isAxiosError: true, response: { data: null, status: 404, statusText: 'Not Found', headers: {} } };
}
