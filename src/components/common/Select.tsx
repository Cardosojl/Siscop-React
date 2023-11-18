import React, { ChangeEventHandler } from 'react';
import { generateOptions, generateOptionsWS } from 'src/views/elementsCreator';

export function Select({
    name,
    optionValues,
    elementValue,
    alternativeValues,
    sort,
    onChange,
}: {
    name: string;
    optionValues: string[];
    elementValue: string;
    alternativeValues?: string[];
    sort: boolean;
    onChange: ChangeEventHandler;
}): JSX.Element {
    const handleOptions = sort ? generateOptions(optionValues, elementValue, alternativeValues) : generateOptionsWS(optionValues, elementValue, alternativeValues);
    return (
        <>
            <select onChange={onChange} name={name}>
                {handleOptions}
            </select>
        </>
    );
}
