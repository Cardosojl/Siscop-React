import React from 'react';
import styled from 'styled-components';
import { ProcessState } from 'src/config/types/types';

const DivStatusStyle = styled.div`
    width: 330px;
    background-color: ${({ theme }) => theme.colors.fluorescent};
    color: ${({ theme }) => theme.colors.primaryText};
    padding: 1px 10px 0px 10px;
    height: 100px;
`;

const TextStatusStyle = styled.p`
    font-weight: bolder;
    margin-bottom: -2px;
`;

export function StatusBlockSmall({ processState }: { processState: ProcessState }): JSX.Element {
    return (
        <DivStatusStyle>
            <TextStatusStyle>{processState.state}</TextStatusStyle>
            <small>Atualizado em: {processState.date}</small>
        </DivStatusStyle>
    );
}
