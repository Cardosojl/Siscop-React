import React, { ChangeEvent } from 'react';
import { siscopIndex, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { AcquisitionWay, Process, Section, User } from 'src/config/types/types';
import { Message } from 'src/components/common/Message';

async function updateProcess(process: Partial<Process>, form: Partial<Process>): Promise<void> {
    await siscopUpdate('processes', { _id: process._id }, form);
}

function formvalidator(form: Partial<Process>, setMessage: CallableFunction, sections: Section[], acquisitionWays: AcquisitionWay[]): boolean {
    let error = false;
    const sectionsValues = sections.map((element) => element._id);
    const acquisitionValues = acquisitionWays.map((element) => element.name);
    setMessage('');
    if (!form.title || form.title.length < 4) {
        setMessage(<Message $error>Nome precisa ter mais do que 3 caracteres</Message>);
        error = true;
    }
    if (!form.origin || typeof form.origin !== 'string' || !sectionsValues.includes(form.origin)) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Origem inválida</Message>
            </>
        ));
        error = true;
    }
    if (form.category && !acquisitionValues.includes(form.category)) {
        setMessage((current: string) => (
            <>
                {current} <Message $error>Forma de Aquisição inválida</Message>
            </>
        ));
        error = true;
    }
    return error;
}

export async function handleSections(): Promise<Section[] | null> {
    const section = await siscopIndex('sections', 0, 0, 0, { level: 1 });
    const { response }: { response: Section[] | null } = section.data;
    return response;
}

export async function handleProcess(path: string, user: User<string, Section>, processId: string): Promise<Process> {
    const process = await siscopShow('processes/process', ['origin'], { _id: processId });
    const { response }: { response: Process | null } = process.data;
    if (path === 'myProcess' && response && response.user === user._id) return response;
    if (path === 'receivedProcess' && response && (response.receiver === user._id || response.section_receiver === user.section._id)) return response;
    else throw { statusCode: 404, message: '404 Não Encontrado' };
}

export async function handleAcquisitionWays(): Promise<AcquisitionWay[] | null> {
    const aquisition = await siscopIndex('acquisitionWays', 0, 0, 0, {});
    const { response }: { response: AcquisitionWay[] | null } = aquisition.data;
    return response;
}

export async function handleForm(
    e: ChangeEvent<HTMLFormElement>,
    process: Partial<Process>,
    form: Partial<Process>,
    sections: Section[],
    acquisitionWays: AcquisitionWay[],
    setMessage: CallableFunction,
    navigate: CallableFunction
): Promise<void> {
    e.preventDefault();
    if (!formvalidator(form, setMessage, sections, acquisitionWays)) {
        await updateProcess(process, form);
        navigate(-1);
    }
}
