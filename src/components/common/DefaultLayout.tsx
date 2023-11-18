import React, { ReactNode } from 'react';
import { Wrapper } from './Wrapper';
import LeftBar from './leftBar/LeftBar';

export function DefaultLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <Wrapper $displayFlex="flex-start">
            <LeftBar />
            {children}
        </Wrapper>
    );
}
