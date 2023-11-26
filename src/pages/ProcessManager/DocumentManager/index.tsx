import React, { useContext, useEffect, useState } from 'react';
import { FileTypes, ProcessTypes, ProcessStateTypes } from 'src/apis/types';
import { generateContent, generateFiles, generateStates, handleFiles, handleProcess, handleStates } from './DocumentManagerFunction';
import { useLocation } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import { Title } from 'src/components/Title/index';
import { Window } from 'src/components/Wrapper/Window/index';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';
import { ManagerInfo } from 'src/pages/ProcessManager/components/ManagerInfo/index';
import UserContext from 'src/context/UserContext';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function DocumentManager(): JSX.Element {
    const { setUser } = useContext(UserContext);
    const [processId] = useLocation().pathname.split('/').reverse();
    const [process, setProcess] = useState<ProcessTypes | null>(null);
    const [files, setFiles] = useState<FileTypes[] | null>(null);
    const [states, setStates] = useState<ProcessStateTypes[] | null>(null);
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
        <LayoutDefault>
            <Window $large>
                <Title title={process?.title || ''}>
                    <h3>{process?.year || ''}</h3>
                </Title>
                <hr />
                <Wrapper $displayFlex="flex-start" $position="relative" width="100%" height="min-content">
                    <ManagerInfo infos={generateContent(process)} documents={generateFiles(files)} states={generateStates(states)} />
                </Wrapper>
            </Window>
        </LayoutDefault>
    );
}

export default DocumentManager;
