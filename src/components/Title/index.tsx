import React, { ReactNode } from 'react';
import { ChildrenStyle, DivStyle, TitleStyle } from './Title.styles';
import { TitleProps } from './types';

export function Title({ $dark, title, children }: TitleProps): JSX.Element {
    return (
        <DivStyle $dark={$dark || false}>
            <TitleStyle $dark={$dark || false}>{title}</TitleStyle>
            <ChildrenStyle $dark={$dark || false}>{children}</ChildrenStyle>
        </DivStyle>
    );
}
