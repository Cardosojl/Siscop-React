import React from 'react';
import { ThStyle } from './Th.styles';
import { ThProps } from '../types';

export function Th({ $size, $delete, $edit, children }: ThProps): JSX.Element {
    const props = { $size, $delete, $edit };
    return <ThStyle {...props}>{children}</ThStyle>;
}
