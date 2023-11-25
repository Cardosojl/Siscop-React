import React from 'react';
import { TableProps } from './types';
import { DivStyle, HeadStyle, TableStyle } from './Table.styles';

export function Table({ head, body }: TableProps): JSX.Element {
    return (
        <DivStyle>
            <TableStyle>
                <HeadStyle>{head}</HeadStyle>
                {body}
            </TableStyle>
        </DivStyle>
    );
}
