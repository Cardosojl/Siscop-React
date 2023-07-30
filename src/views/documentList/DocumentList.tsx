/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from 'src/components/table/Table';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { File, Listener, Process, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleDelete, handleFiles, handleProcess, handleTableFiles } from './DocumentListFunction';
import { useLocation } from 'react-router-dom';
import './DocumentList.css';
import { handleErros } from 'src/apis/siscopDB';

function DocumentList({ path, dispatchUser, user }: SimpleView): JSX.Element {
    const url = useLocation().pathname.split('/');
    const [process, setProcess] = useState<Partial<Process>>({});
    const [files, setFiles] = useState<File[] | null>([]);
    const [changedPath, setChangedPath] = useState<string>('');
    const [listener, setListener] = useState<Listener>({ action: null, itemId: null });
    const throwError = useAsyncError();

    useEffect(() => {
        setChangedPath(path || '');
    }, [path]);

    useEffect(() => {
        handleProcess(path as string, user, url[url.length - 1]).then((data) => {
            setProcess(data);
        }).catch((error) => {
            handleErros(error as Error, dispatchUser, throwError);
        });
    }, []);

    useEffect(() => {
        if (process._id) {
            handleFiles(process as Process).then((data) => {
                setFiles(data);
            }).catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            })
        }
    }, [process, listener.itemId]);

    useEffect(() => {
        if (listener && listener.itemId && listener.action === 'delete') {
            handleDelete(listener.itemId)
                .then(() => {
                    setListener({ itemId: null, action: null });
                })
                .catch((error) => {
                    handleErros(error as Error, dispatchUser, throwError);
                });
        }
    }, [listener])


    return (
        <div className="MainWindow">
            <div className="Window">
                <WindowTitle title={process.title || ''}>
                    <small className="Title__date">{process.date || ''}</small>
                </WindowTitle>
                <hr />
                <div className="DocumentList__table"><Table table={handleTableFiles(changedPath, files, setListener)} /></div>                
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
