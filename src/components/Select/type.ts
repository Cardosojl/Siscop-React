import { ChangeEventHandler, MutableRefObject } from 'react';

export type SelectProps = {
    name: string;
    optionValues: string[];
    elementValue: string;
    alternativeValues?: string[];
    sort: boolean;
    ref?: MutableRefObject<HTMLSelectElement | null>;
    onChange: ChangeEventHandler;
};
