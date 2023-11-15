import React, { ChangeEvent } from 'react';
import { siscopCreate, siscopIndex } from 'src/apis/siscopDB';
import { AcquisitionWay, Process, Section } from 'src/config/types/types';
import { Message } from 'src/components/Message';

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

export async function handleAcquisitionWays(): Promise<AcquisitionWay[] | null> {
    const aquisition = await siscopIndex('acquisitionWays', 0, 0, 0, {});
    const { response }: { response: AcquisitionWay[] | null } = aquisition.data;
    return response;
}

export async function handleForm(
    e: ChangeEvent<HTMLFormElement>,
    form: Partial<Process>,
    sections: Section[],
    acquisitionWays: AcquisitionWay[],
    setMessage: CallableFunction,
    navigate: CallableFunction
): Promise<void> {
    e.preventDefault();
    if (!formvalidator(form, setMessage, sections, acquisitionWays)) {
        await siscopCreate('processes', form);
        navigate('/meusProcessos/0');
    }
}
