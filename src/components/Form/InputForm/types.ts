import { ChangeEventHandler } from 'react';

export type InputFormStyleProps = {
    $small?: boolean;
    $medium?: boolean;
    $large?: boolean;
};

export type InputFormProps = InputFormStyleProps & {
    value: string | number | undefined;
    onChange: ChangeEventHandler;
    type: string;
    name: string;
};
