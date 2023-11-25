import React from 'react';
import { StatusBlockSmallProps } from './types';
import { DivStatusStyle, TextStatusStyle } from './StatusBlockSmall.styles';

export function StatusBlockSmall({ processState }: StatusBlockSmallProps): JSX.Element {
    return (
        <DivStatusStyle>
            <TextStatusStyle>{processState.state}</TextStatusStyle>
            <small>Atualizado em: {processState.date}</small>
        </DivStatusStyle>
    );
}
