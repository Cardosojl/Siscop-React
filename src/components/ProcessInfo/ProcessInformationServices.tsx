import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Process, ProcessState } from 'src/config/types/types';
import up from '../../assets/up.png';
import down from '../../assets/down.png';
import { StatusBlock } from '../StatusBlock/StatusBlock/index';
import { Link } from 'react-router-dom';
import { InfoWrapper } from '../Wrapper/InfoWrapper/index';
import { Button } from '../Button/index';

export function generateDescription(description: string): ReactNode {
    return (
        <InfoWrapper>
            <p>{description}</p>
        </InfoWrapper>
    );
}

export function generateStates(process: Partial<Process>, processstates: ProcessState[]) {
    const [, ...path] = window.location.pathname.split('/').reverse();
    const href = path.reverse().join('/');
    return (
        <InfoWrapper>
            {processstates.map((element, index) => (
                <StatusBlock key={index} processState={element} />
            ))}
            <Link to={`${href}/anotar/${process._id}`}>
                <Button $blue>Novo Status</Button>
            </Link>
        </InfoWrapper>
    );
}

export function handleStatus(
    process: Partial<Process>,
    descriptionArrow: [string, CallableFunction],
    status: [string, CallableFunction],
    setContent: CallableFunction,
    processstatesStates: [ProcessState[], CallableFunction]
) {
    const [, setDescriptionArrow] = descriptionArrow;
    const [processstates] = processstatesStates;
    const [statusArrow, setStatusArrow] = status;
    setDescriptionArrow(down);
    if (statusArrow === down) {
        setStatusArrow(up);
        setContent(generateStates(process, processstates));
    } else {
        setStatusArrow(down);
        setContent('');
    }
}

export function handleDescription(
    descriptionArrow: [string, Dispatch<SetStateAction<string>>],
    status: [string, Dispatch<SetStateAction<string>>],
    setContent: CallableFunction,
    descriptionState: [string, Dispatch<SetStateAction<string>>]
) {
    const [arrowDescription, setArrowDescription] = descriptionArrow;
    const [, setArrowStatus] = status;
    const [description] = descriptionState;
    setArrowStatus(down);
    if (arrowDescription === down) {
        setArrowDescription(up);
        setContent(generateDescription(description));
    } else {
        setArrowDescription(down);
        setContent('');
    }
}
