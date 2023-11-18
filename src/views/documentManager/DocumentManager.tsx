import React, { useContext, useEffect, useState } from 'react';
import { FileTypes, Process, ProcessState } from 'src/config/types/types';
import { generateContent, generateFiles, generateStates, handleFiles, handleProcess, handleStates } from './DocumentManagerFunction';
import { useLocation } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import Title from 'src/components/common/Title';
import { Window } from 'src/components/common/Window';
import { Wrapper } from 'src/components/common/Wrapper';
import { ManagerInfo } from 'src/components/ProcessManager/ProcessManagerInfo/ManagerInfo';
import DataContext from 'src/data/DataContext';
import { DefaultLayout } from 'src/components/common/DefaultLayout';

function DocumentManager(): JSX.Element {
    const { setUser } = useContext(DataContext);
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
                handleErros(error as Error, setUser, throwError);
            });
        handleFiles(processId)
            .then((data) => {
                setFiles(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
        handleStates(processId)
            .then((data) => {
                setStates(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    return (
        <DefaultLayout>
            <Window $large>
                <Title title={process?.title || ''}>
                    <h3>{process?.year || ''}</h3>
                </Title>
                <hr />
                <Wrapper $displayFlex="flex-start" $position="relative" width="100%" height="min-content">
                    <ManagerInfo infos={generateContent(process)} documents={generateFiles(files)} states={generateStates(states)} />
                </Wrapper>
            </Window>
        </DefaultLayout>
    );
}

export default DocumentManager;
