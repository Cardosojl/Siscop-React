import React, { ChangeEvent, ReactNode, createElement } from 'react';
import { siscopIndex, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { AcquisitionWay, Process, Section, User } from 'src/config/types/types';
import { generateOptions, setInputs } from '../elementsCreator';

async function updateProcess(process: Partial<Process>, form: Partial<Process>): Promise<void> {
    await siscopUpdate('processes', { _id: process._id }, form);
}

function formvalidator(form: Partial<Process>, setMessage: CallableFunction, sections: Section[], acquisitionWays: AcquisitionWay[]): boolean {
    let error = false;
    const sectionsValues = sections.map((element) => element._id);
    const acquisitionValues = acquisitionWays.map((element) => element.name);
    setMessage('');
    if (!form.title || form.title.length < 4) {
        setMessage(<p>Nome precisa ter mais do que 3 caracteres</p>);
        error = true;
    }
    if (!form.origin || typeof form.origin !== 'string' || !sectionsValues.includes(form.origin)) {
        setMessage((current: string) => (
            <>
                {current} <p>Origem inválida</p>
            </>
        ));
        error = true;
    }
    if (form.category && !acquisitionValues.includes(form.category)) {
        setMessage((current: string) => (
            <>
                {current} <p>Forma de Aquisição inválida</p>
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

export function generateForm(acquisitionWays: AcquisitionWay[], sections: Section[], process: Partial<Process>, form: Partial<Process>, setForm: CallableFunction): ReactNode {
    const sectionArray = sections.map((element) => element.name);
    const sectionArrayID = sections.map((element) => element._id);
    const acquisitionArray = acquisitionWays.map((element) => element.name);
    const processOrigin = process.origin ? (process.origin as Section).name : '';
    const processCategory = process.category || '';
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);

    const nameDiv = createElement('div', { key: '0' }, [
        createElement('label', null, 'Nome:'),
        createElement('input', { type: 'text', name: 'title', onChange: handleInput, value: form.title || '' }),
    ]);
    const nupDiv = createElement('div', { key: '1' }, [createElement('label', null, 'Nup:'), createElement('input', { type: 'text', name: 'nup', onChange: handleInput, value: form.nup || '' })]);
    const originDiv = createElement('div', { key: '2' }, [
        createElement('label', null, 'Origem:'),
        createElement('select', { name: 'origin', onChange: handleInput }, generateOptions(sectionArray, processOrigin, sectionArrayID)),
    ]);
    const aquisitionWayDiv = createElement('div', { key: '3' }, [
        createElement('label', null, 'Forma de Aquisição:'),
        createElement('select', { name: 'category', onChange: handleInput }, generateOptions(acquisitionArray, processCategory)),
    ]);
    const descriptionDiv = createElement('div', { className: 'Form__textareaDiv', key: '4' }, [
        createElement('label', null, 'Descrição:'),
        createElement('textarea', { name: 'description', onChange: handleInput, value: form.description }),
    ]);
    const sendButton = createElement('input', { type: 'submit', className: 'Button--blue', value: 'Enviar' });

    return createElement('div', null, [nameDiv, nupDiv, originDiv, aquisitionWayDiv, descriptionDiv, sendButton]);
}
