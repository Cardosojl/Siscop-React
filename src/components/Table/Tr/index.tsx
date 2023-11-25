import React from 'react';
import { TrProps } from '../types';
import { TrStyle } from './Tr.styles';

export function Tr({ $size, $delete, $edit, children }: TrProps): JSX.Element {
    const props = { $size, $delete, $edit };
    return <TrStyle {...props}>{children}</TrStyle>;
}
