import React from 'react';
import { MessageContentStyle } from './MessageContent.styles';
import { MessageContentProps } from './types';
import reader from './MessageContentFunctions';

export function MessageContent({ content }: MessageContentProps): JSX.Element {
    const message = content ? reader(content) : '';
    return <MessageContentStyle>{message}</MessageContentStyle>;
}
