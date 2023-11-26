import React from 'react';
import { InfosStyle, StatesStyle } from './ManagerInfo.styles';
import { ManagerInfoProps } from './types';

export function ManagerInfo({ infos, documents, states }: ManagerInfoProps): JSX.Element {
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
