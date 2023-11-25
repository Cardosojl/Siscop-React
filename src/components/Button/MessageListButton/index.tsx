import React from 'react';
import { MessageListButtonProps } from './types';
import { MessageListButtonStyle } from './MessageListButton.styled';

export function MessageListButton(props: MessageListButtonProps): JSX.Element {
    return <MessageListButtonStyle {...props} />;
}
