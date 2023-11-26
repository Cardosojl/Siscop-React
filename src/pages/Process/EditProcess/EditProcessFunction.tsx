import React, { ChangeEvent } from 'react';
import { siscopIndex, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { AcquisitionWayTypes, ProcessTypes, SectionTypes, UserTypes } from 'src/apis/types';
import { Message } from 'src/components/Message/index';

async function updateProcess(process: Partial<ProcessTypes>, form: Partial<ProcessTypes>): Promise<void> {
    await siscopUpdate('processes', { _id: process._id }, form);
}

function formvalidator(form: Partial<ProcessTypes>, setMessage: CallableFunction, sections: SectionTypes[], acquisitionWays: AcquisitionWayTypes[]): boolean {
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

export async function handleSections(): Promise<SectionTypes[] | null> {
    const section = await siscopIndex('sections', 0, 0, 0, { level: 1 });
    const { response }: { response: SectionTypes[] | null } = section.data;
    return response;
}

export async function handleProcess(path: string, user: UserTypes<string, SectionTypes>, processId: string): Promise<ProcessTypes> {
    const process = await siscopShow('processes/process', ['origin'], { _id: processId });
    const { response }: { response: ProcessTypes | null } = process.data;
    if (path === 'myProcess' && response && response.user === user._id) return response;
    if (path === 'receivedProcess' && response && (response.receiver === user._id || response.section_receiver === user.section._id)) return response;
    else throw { statusCode: 404, message: '404 Não Encontrado' };
}

export async function handleAcquisitionWays(): Promise<AcquisitionWayTypes[] | null> {
    const aquisition = await siscopIndex('acquisitionWays', 0, 0, 0, {});
    const { response }: { response: AcquisitionWayTypes[] | null } = aquisition.data;
    return response;
}

export async function handleForm(
    e: ChangeEvent<HTMLFormElement>,
    process: Partial<ProcessTypes>,
    form: Partial<ProcessTypes>,
    sections: SectionTypes[],
    acquisitionWays: AcquisitionWayTypes[],
    setMessage: CallableFunction,
    navigate: CallableFunction
): Promise<void> {
    e.preventDefault();
    if (!formvalidator(form, setMessage, sections, acquisitionWays)) {
        await updateProcess(process, form);
        navigate(-1);
    }
}
