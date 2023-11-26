import React, { ReactNode, useEffect, useState } from 'react';
import { ProcessStateTypes } from 'src/apis/types';
import down from 'src/assets/down.png';
import { handleDescription, handleStatus } from './ProcessInformationFunctions';
import { Wrapper } from 'src/components/Wrapper/Wrapper';
import { MessageListButton } from 'src/components/Button/MessageListButton';
import { ProcessInfoProps } from './types';

export function ProcessInfo({ proc }: ProcessInfoProps): JSX.Element {
    const descriptionArrow = useState<string>(down);
    const statusArrow = useState<string>(down);
    const descriptionState = useState<string>(proc.description || '');
    const processstatesStates = useState<ProcessStateTypes[]>(proc.processstates as ProcessStateTypes[]);
    const [content, setContent] = useState<ReactNode>('');
    useEffect(() => {
        const [, setProcessState] = processstatesStates;
        const [, setDescription] = descriptionState;
        setProcessState(proc.processstates as ProcessStateTypes[]);
        setDescription(proc.description || '');
    }, [proc.processstates, proc.description]);
    return (
        <>
            <Wrapper $displayFlex="flex-end" $paddingRight="15px" $aling="center">
                <small>Descrição:</small>
                <MessageListButton $green $width="22px" onClick={() => handleDescription(descriptionArrow, statusArrow, setContent, descriptionState)} src={descriptionArrow[0]} />
                <small>Status:</small>
                <MessageListButton $green $width="22px" onClick={() => handleStatus(proc, descriptionArrow, statusArrow, setContent, processstatesStates)} src={statusArrow[0]} />
            </Wrapper>
            <div>{content}</div>
        </>
    );
}
