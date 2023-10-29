import React, { ChangeEvent, ReactNode, createElement } from 'react';
import { siscopCreate, siscopIndex } from 'src/apis/siscopDB';
import { AcquisitionWay, Process, Section } from 'src/config/types/types';
import { generateOptions, setInputs } from '../elementsCreator';

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

export async function handleAcquisitionWays(): Promise<AcquisitionWay[] | null> {
    const aquisition = await siscopIndex('acquisitionWays', 0, 0, 0, {});
    const { response }: { response: AcquisitionWay[] | null } = aquisition.data;
    return response;
}

// eslint-disable-next-line prettier/prettier
export async function handleForm(e: ChangeEvent<HTMLFormElement>, form: Partial<Process>, sections: Section[], acquisitionWays: AcquisitionWay[], setMessage: CallableFunction, navigate: CallableFunction): Promise<void> {
    e.preventDefault();
    if (!formvalidator(form, setMessage, sections, acquisitionWays)) {
        await siscopCreate('processes', form);
        navigate('/meusProcessos/0');
    }
}

// eslint-disable-next-line prettier/prettier
export function generateForm(acquisitionWays: AcquisitionWay[], sections: Section[], form: Partial<Process>, setForm: CallableFunction): ReactNode {
    const sectionArray = sections.map((element) => element.name);
    const sectionArrayID = sections.map((element) => element._id);
    const acquisitionArray = acquisitionWays.map((element) => element.name);
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);

    const nameDiv = createElement('div', null, [
        createElement('label', null, 'Nome:'),
        createElement('input', { type: 'text', name: 'title', onChange: handleInput, value: form.title || '' }),
    ]);
    const nupDiv = createElement('div', null, [
        createElement('label', null, 'Nup:'),
        createElement('input', { type: 'text', name: 'nup', onChange: handleInput, value: form.nup || '' }),
    ]);
    const originDiv = createElement('div', null, [
        createElement('label', null, 'Origem:'),
        createElement('select', { name: 'origin', onChange: handleInput }, generateOptions(sectionArray, '', sectionArrayID)),
    ]);
    const aquisitionWayDiv = createElement('div', null, [
        createElement('label', null, 'Forma de Aquisição:'),
        createElement('select', { name: 'category', onChange: handleInput }, generateOptions(acquisitionArray, '')),
    ]);
    const descriptionDiv = createElement('div', { className: 'Form__textareaDiv' }, [
        createElement('label', null, 'Descrição:'),
        createElement('textarea', { name: 'description', onChange: handleInput, value: form.description }),
    ]);
    const sendButton = createElement('input', { type: 'submit', className: 'Button--blue', value: 'Enviar' });

    return createElement('div', null, [nameDiv, nupDiv, originDiv, aquisitionWayDiv, descriptionDiv, sendButton]);
}
