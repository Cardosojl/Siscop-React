import React from 'react';
import { Header } from '../Header';
import { ContentDivStyle } from './LoginLayout.styles';
import { LayoutLoginProps } from './types';

export function LayoutLogin({ children }: LayoutLoginProps): JSX.Element {
    return (
        <>
            <Header />
            <ContentDivStyle>{children}</ContentDivStyle>
        </>
    );
}
