import React from 'react';
import { LeftBarSubitensTypes } from './types';
import { LeftBarSubitemStyle } from './LeftBarSubItem.styles';

export default function LeftBarSubitem({ title, active }: LeftBarSubitensTypes): JSX.Element {
    return (
        <LeftBarSubitemStyle $selected={active}>
            <p>{title}</p>
        </LeftBarSubitemStyle>
    );
}
