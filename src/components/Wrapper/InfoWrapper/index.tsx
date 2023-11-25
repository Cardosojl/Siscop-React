import React from 'react';
import { InfoWrapperProps } from './types';
import { InfoWrapperStyle } from './ProcessInfo.styles';

export function InfoWrapper({ children }: InfoWrapperProps): JSX.Element {
    return <InfoWrapperStyle>{children}</InfoWrapperStyle>;
}
