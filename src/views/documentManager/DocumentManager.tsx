import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FileTypes, Process, ProcessState, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { generateContent, generateFiles, generateStates, handleFiles, handleProcess, handleStates } from './DocumentManagerFunction';
import { useLocation } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import Title from 'src/components/Title';
import { Window } from 'src/components/Window';
import { Wrapper } from 'src/components/Wrapper';
import { ManagerInfo } from 'src/components/ManagerInfo';

function DocumentManager({ user, dispatchUser }: SimpleView): JSX.Element {
    const [processId] = useLocation().pathname.split('/').reverse();
    const [process, setProcess] = useState<Process | null>(null);
    const [files, setFiles] = useState<FileTypes[] | null>(null);
    const [states, setStates] = useState<ProcessState[] | null>(null);
    const throwError = useAsyncError();

    useEffect(() => {
        handleProcess({ _id: processId })
            .then((data) => {
                setProcess(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
        handleFiles(processId)
            .then((data) => {
                setFiles(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
        handleStates(processId)
            .then((data) => {
                setStates(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    return (
        <Window $large>
            <Title title={process?.title || ''}>
                <h3>{process?.year || ''}</h3>
            </Title>
            <hr />
            <Wrapper $displayFlex="flex-start" $position="relative" width="100%" height="min-content">
                <ManagerInfo infos={generateContent(process)} documents={generateFiles(files)} states={generateStates(states)} />
            </Wrapper>
        </Window>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentManager);
