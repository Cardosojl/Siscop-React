import { FormEvent, MouseEventHandler, ReactNode } from 'react';

export type ButtonProps = {
    $green?: boolean;
    $blue?: boolean;
    $red?: boolean;
    $yellow?: boolean;
    children?: ReactNode;
    type?: string;
    value?: string;
    onClick?: MouseEventHandler;
    onSubmit?: FormEvent;
};
