import React, { ReactNode } from 'react';
export function generateOptions(optionValues: string[], elementValue: string, alternativeValues?: string[]): ReactNode {
    let options;
    if (alternativeValues) {
        options = alternativeValues.length === optionValues.length ? alternativeValues.map((element, key) => ({ value: element, inner: optionValues[key] })) : null;
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

export function generateOptionsWS(optionValues: string[], elementValue: string, alternativeValues?: string[]): ReactNode {
    let options;
    if (alternativeValues) {
        options = alternativeValues.length === optionValues.length ? alternativeValues.map((element, key) => ({ value: element, inner: optionValues[key] })) : null;
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
