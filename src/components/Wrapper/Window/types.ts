import { ReactNode } from 'react';

export type WindowStyleProps = {
    $login?: boolean;
    $small?: boolean;
    $medium?: boolean;
    $large?: boolean;
};

export type WindowProps = WindowStyleProps & {
    children: ReactNode;
};
