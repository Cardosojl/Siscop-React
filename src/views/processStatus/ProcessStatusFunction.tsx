import React, { ChangeEvent, FormEvent, createElement } from 'react';
import { Process, ProcessState, Section, User } from 'src/config/types/types';
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

// eslint-disable-next-line prettier/prettier
export async function handleForm(e: FormEvent, form: Partial<ProcessState<string, string>>, setMessage: CallableFunction, navigate: CallableFunction): Promise<void> {
    e.preventDefault();
    if (!validationForm(form, setMessage)) {
        await siscopCreate('processStates', form);
        navigate(-1);
    }
}

export function generateForm(form: Partial<ProcessState>, setForm: CallableFunction) {
    const stateOptions = ['Coletando Orçamentos', 'Em Montagem', 'Montagem Finalizada', 'Em Análise', 'Outro'];
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);

    const anotation = createElement('div', { key: 0, className: 'Form__textareaDiv' }, [
        createElement('label', { key: 1 }, 'Anotação:'),
        createElement('textarea', { key: 2, name: 'anotation', value: form.anotation, onChange: handleInput }),
    ]);
    const state = createElement('div', { key: 3 }, [
        createElement('label', { key: 4 }, 'Estato:'),
        createElement('select', { key: 5, name: 'state', value: form.state, onChange: handleInput }, generateOptions(stateOptions, '')),
    ]);
    const sendButton = createElement('input', { key: 6, type: 'submit', className: 'Button--blue', value: 'Enviar' });

    return createElement('div', { key: 7 }, [anotation, state, sendButton]);
}

export async function handleProcess(path: string, user: User<string, Section>, processId: string): Promise<Process> {
    const process = await siscopShow('processes/process', ['origin'], { _id: processId });
    const { response }: { response: Process | null } = process.data;
    if (path === 'myProcess' && response && response.user === user._id) return response;
    if (path === 'receivedProcess' && response && (response.receiver === user._id || response.section_receiver === user.section._id)) return response;
    else throw { statusCode: 404, message: '404 Não Encontrado' };
}
