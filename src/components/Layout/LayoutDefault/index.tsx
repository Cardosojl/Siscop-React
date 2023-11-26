import React from 'react';
import { Header } from '../Header';
import LeftBar from '../LeftBar';
import { Wrapper } from 'src/components/Wrapper/Wrapper';
import { ContentDivStyle } from './LayoutDefault.styles';
import { LayoutDefaultProps } from './types';

export function LayoutDefault({ children }: LayoutDefaultProps): JSX.Element {
    return (
        <>
            <Header />
            <Wrapper $displayFlex="flex-start">
                <LeftBar />
                <ContentDivStyle>{children}</ContentDivStyle>
            </Wrapper>
        </>
    );
}
