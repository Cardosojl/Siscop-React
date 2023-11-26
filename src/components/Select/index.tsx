import React from 'react';
import { generateOptions, generateOptionsWS } from './SelectFunctions';
import { SelectProps } from './type';

export function Select({ name, optionValues, elementValue, alternativeValues, sort, onChange }: SelectProps): JSX.Element {
    const handleOptions = sort ? generateOptions(optionValues, elementValue, alternativeValues) : generateOptionsWS(optionValues, elementValue, alternativeValues);
    return (
        <>
            <select onChange={onChange} name={name}>
                {handleOptions}
            </select>
        </>
    );
}
