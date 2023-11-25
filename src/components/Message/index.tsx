import React, { ReactNode } from 'react';
import { MessageStyle } from './Message.styles';
import { MessageProps } from './types';

export function Message({ $error, $success, children }: MessageProps): JSX.Element {
    const props = { $error, $success };
    return <MessageStyle {...props}>{children}</MessageStyle>;
}
