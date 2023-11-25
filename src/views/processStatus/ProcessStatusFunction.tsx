import React, { FormEvent } from 'react';
import { Process, ProcessState, Section, User } from 'src/config/types/types';
import { siscopCreate, siscopShow } from 'src/apis/siscopDB';
import { Message } from 'src/components/Message/index';

function validationForm(form: Partial<ProcessState>, setMessage: CallableFunction): boolean {
    const stateOptions = ['Coletando Orçamentos', 'Em Montagem', 'Montagem Finalizada', 'Em Análise', 'Outro'];
    let error = false;
    if (!form.state || form.state === '' || !stateOptions.includes(form.state)) {
        setMessage(<Message $error>Valor do Estado é inválido</Message>);
        error = true;
    }
    return error;
}

export async function handleForm(e: FormEvent, form: Partial<ProcessState<string, string>>, setMessage: CallableFunction, navigate: CallableFunction): Promise<void> {
    e.preventDefault();
    if (!validationForm(form, setMessage)) {
        await siscopCreate('processStates', form);
        navigate(-1);
    }
}

export async function handleProcess(path: string, user: User<string, Section>, processId: string): Promise<Process> {
    const process = await siscopShow('processes/process', ['origin'], { _id: processId });
    const { response }: { response: Process | null } = process.data;
    if (path === 'myProcess' && response && response.user === user._id) return response;
    if (path === 'receivedProcess' && response && (response.receiver === user._id || response.section_receiver === user.section._id)) return response;
    else throw { statusCode: 404, message: '404 Não Encontrado' };
}
