import React, { ReactNode, useEffect, useState } from 'react';
import { ProcessState } from 'src/config/types/types';
import down from '../../assets/down.png';
import { handleDescription, handleStatus } from './ProcessInformationServices';
import { Wrapper } from '../Wrapper/Wrapper/index';
import { MessageListButton } from '../Button/MessageListButton/index';
import { ProcessInfoProps } from './types';

export function ProcessInfo({ proc }: ProcessInfoProps): JSX.Element {
    const descriptionArrow = useState<string>(down);
    const statusArrow = useState<string>(down);
    const descriptionState = useState<string>(proc.description || '');
    const processstatesStates = useState<ProcessState[]>(proc.processstates as ProcessState[]);
    const [content, setContent] = useState<ReactNode>('');
    useEffect(() => {
        const [, setProcessState] = processstatesStates;
        const [, setDescription] = descriptionState;
        setProcessState(proc.processstates as ProcessState[]);
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
