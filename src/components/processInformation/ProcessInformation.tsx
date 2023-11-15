import React, { ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Process, ProcessState, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import down from './images/down.png';
import './ProcessInformation.css';
import { handleDescription, handleStatus } from './ProcessInformationFunction';

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
        <div>
            <div className="ProcessInformation__buttons">
                <small>Descrição:</small>
                <button className="Button--green ProcessInforation__button" onClick={() => handleDescription(descriptionArrow, statusArrow, setContent, descriptionState)}>
                    <img className="ProcessInformation__image" src={descriptionArrow[0]} />
                </button>
                <small>Status:</small>
                <button className="Button--green ProcessInforation__button" onClick={() => handleStatus(process, descriptionArrow, statusArrow, setContent, processstatesStates)}>
                    <img className="ProcessInformation__image" src={statusArrow[0]} />
                </button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessInformation);
