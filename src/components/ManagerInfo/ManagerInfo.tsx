import React, { ReactNode } from 'react';
import styled from 'styled-components';

const InfosStyle = styled.div`
    flex: 1;
    position: relative;
    max-width: 40vw;
    height: fit-content;
`;

const StatesStyle = styled.div`
    flex: 0 0 380px;
    overflow-y: auto;
    position: absolute;
    right: 10px;
    height: 100%;
    border-left: 2px solid ${({ theme }) => theme.colors.gray};
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export function ManagerInfo({ infos, documents, states }: { infos: ReactNode; documents: ReactNode; states: ReactNode }): JSX.Element {
    return (
        <>
            <InfosStyle>
                {infos}
                <hr />
                {documents}
            </InfosStyle>
            <StatesStyle>{states}</StatesStyle>
        </>
    );
}
