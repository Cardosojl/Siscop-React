import React from 'react';
import { ButtonProps } from './types';
import { ButtonStyle } from './Button.styles';

export function Button(props: ButtonProps): JSX.Element {
    const { children, ...buttonStyle } = props;

    return <ButtonStyle {...buttonStyle}>{children}</ButtonStyle>;
}
