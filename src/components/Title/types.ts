import { ReactNode } from 'react';

export type TitleStyleProps = {
    $dark?: boolean;
};

export type TitleProps = TitleStyleProps & {
    title: string;
    children?: ReactNode;
};
