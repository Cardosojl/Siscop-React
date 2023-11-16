import React, { ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Process, ProcessState, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import down from '../../assets/down.png';
import { handleDescription, handleStatus } from './ProcessInformationFunction';
import { Wrapper } from '../Wrapper';
import { ImageIcon } from '../ImageIcon';

function ProcessInformation({ process }: { process: Partial<Process> } & SimpleView): JSX.Element {
    const descriptionArrow = useState<string>(down);
    const statusArrow = useState<string>(down);
    const descriptionState = useState<string>(process.description || '');
    const processstatesStates = useState<ProcessState[]>(process.processstates as ProcessState[]);
    const [content, setContent] = useState<ReactNode>('');
    useEffect(() => {
        const [, setProcessState] = processstatesStates;
        const [, setDescription] = descriptionState;
        setProcessState(process.processstates as ProcessState[]);
        setDescription(process.description || '');
    }, [process.processstates, process.description]);
    return (
        <>
            <Wrapper $displayFlex="flex-end" $paddingRight="15px" $aling="center">
                <small>Descrição:</small>
                <ImageIcon $green $width="22px" onClick={() => handleDescription(descriptionArrow, statusArrow, setContent, descriptionState)} src={descriptionArrow[0]} />
                <small>Status:</small>
                <ImageIcon $green $width="22px" onClick={() => handleStatus(process, descriptionArrow, statusArrow, setContent, processstatesStates)} src={statusArrow[0]} />
            </Wrapper>
            <div>{content}</div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessInformation);
