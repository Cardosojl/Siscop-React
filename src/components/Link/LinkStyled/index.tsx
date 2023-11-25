import React from 'react';
import { LinkStyledProps } from './types';
import { LinkStyle } from './LinkStyled.styles';

export function LinkStyled({ to, children }: LinkStyledProps): JSX.Element {
    return <LinkStyle to={to}>{children}</LinkStyle>;
}
