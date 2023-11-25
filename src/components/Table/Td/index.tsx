import React from 'react';
import { TdStyle } from './Td.styles';
import { TdProps } from '../types';

export function Td({ $size, $delete, $edit, colSpan, children }: TdProps): JSX.Element {
    const props = { $size, $delete, $edit, colSpan };
    return <TdStyle {...props}>{children}</TdStyle>;
}
