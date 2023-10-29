import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { FileTypes, Process, ProcessState, Section, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { generateContent, generateFiles, generateStates, handleFiles, handleProcess, handleStates } from './DocumentManagerFunction';
import { useLocation } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import './DocumentManager.css';

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
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title={process?.title || ''}>
                    <h3>{process?.year || ''}</h3>
                </WindowTitle>
                <hr />
                <div className="DocumentManager">
                    <div className="DocumentManager__content">
                        {generateContent(process)}
                        <hr />
                        {generateFiles(files)}
                    </div>
                    <div className="DocumentManager__status">{generateStates(states)}</div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentManager);
