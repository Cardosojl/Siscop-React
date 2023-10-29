import React, { ChangeEvent, ReactNode, createElement } from 'react';
import { ElementCreatorNode, Process } from 'src/config/types/types';

export function setInputs(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setForm: CallableFunction) {
    const { name, value } = e.target;
    setForm((current: Partial<Process>) => ({ ...current, [name]: value ? value : undefined }));
}

export function generateOptions(optionValues: string[], elementValue: string, apiValues?: string[]): ReactNode {
    let options;
    if (apiValues) {
        options = apiValues.length === optionValues.length ? apiValues.map((element, key) => ({ value: element, inner: optionValues[key] })) : null;
        if (!options) throw new Error('Parametros incompatíveis para criação do select!');
    } else {
        options = optionValues.map((element) => ({ value: element, inner: element }));
    }
    let firstValue = options.filter((element) => element.inner === elementValue);
    const restApi = options.filter((element) => element.inner !== elementValue).sort((a, b) => a.inner.localeCompare(b.inner));
    firstValue = firstValue.length === 0 ? [{ value: '', inner: '' }] : firstValue;
    const api = [...firstValue, ...restApi];
    return api.map((element) => (
        <option key={element.value} value={element.value}>
            {element.inner}
        </option>
    ));
}

export function generateOptionsWS(optionValues: string[], elementValue: string, apiValues?: string[]): ReactNode {
    let options;
    if (apiValues) {
        options = apiValues.length === optionValues.length ? apiValues.map((element, key) => ({ value: element, inner: optionValues[key] })) : null;
        if (!options) throw new Error('Parametros incompatíveis para criação do select!');
    } else {
        options = optionValues.map((element) => ({ value: element, inner: element }));
    }
    let firstValue = options.filter((element) => element.inner === elementValue);
    const restApi = options.filter((element) => element.inner !== elementValue);
    firstValue = firstValue.length === 0 ? [{ value: '', inner: '' }] : firstValue;
    const api = [...firstValue, ...restApi];
    return api.map((element) => (
        <option key={element.value} value={element.value}>
            {element.inner}
        </option>
    ));
}

export function createForm(...elements: ElementCreatorNode[][]): ReactNode {
    const mainDiv = elements.map((element) =>
        createElement(
            'div',
            null,
            element.map((element) => createElement(element.type, element.props, element.inner))
        )
    );
    return mainDiv;
}

/**
 * function generate(acquisitionWays: AcquisitionWay[], sections: Section[], process: Partial<Process>, form: Partial<Process>, setForm: CallableFunction): ReactNode {
    const sectionArray = sections.map((element) => element.name);
    const sectionArrayID = sections.map((element) => element._id);
    const acquisitionArray = acquisitionWays.map((element) => element.name);
    const processOrigin = process.origin ? (process.origin as Section).name : '';
    const processCategory = process.category || '';
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const name = [
        { type: 'label', props: null, inner: 'Nome:' },
        { type: 'input', props: { type: 'text', name: 'title', onChange: handleInput, value: form.title || '' }, inner: null },
    ];
    const nup = [
        { type: 'label', props: null, inner: 'Nup:' },
        { type: 'input', props: { type: 'text', name: 'nup', onChange: handleInput, value: form.nup || '' }, inner: null },
    ];
    const origin = [
        { type: 'label', props: null, inner: 'Origem:' },
        { type: 'select', props: { name: 'origin', onChange: handleInput }, inner: generateOptions(sectionArray, processOrigin, sectionArrayID) },
    ];
    const category = [
        { type: 'label', props: null, inner: 'Forma de Aquisição:' },
        { type: 'select', props: { name: 'category', onChange: handleInput }, inner: generateOptions(acquisitionArray, processCategory) },
    ];
    const descripton = [
        { type: 'label', props: null, inner: 'Descrição:' },
        { type: 'textarea', props: { name: 'description', onChange: handleInput, value: form.description }, inner: null },
    ];
    const button = [{ type: 'input', props: { type: 'submit', className: 'Button--green', value: 'Enviar' }, inner: null }];

    return createForm(name, nup, origin, category, descripton, button);
}
 */
