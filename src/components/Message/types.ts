import { ReactNode } from 'react';

export type MessageStylesProps = {
    $error?: boolean;
    $success?: boolean;
};

export type MessageProps = MessageStylesProps & {
    children: ReactNode;
};
