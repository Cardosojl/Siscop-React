import { FormEvent, MouseEventHandler } from 'react';

export type MessageListButtonProps = {
    $red?: boolean;
    $yellow?: boolean;
    $green?: boolean;
    $width: string;
    src: string;
    onClick?: MouseEventHandler;
};
