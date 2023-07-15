import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from 'src/components/table/Table';
import useAsyncError from 'src/components/useAsyncError/UseAsyncError';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { FilesList, Process, SimpleView, TableType } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleErros, handleProcessFiles } from './DocumentListFunction';
import { useLocation } from 'react-router-dom';

function DocumentList({ path, dispatchUser, user }: SimpleView): JSX.Element {
    const url = useLocation().pathname.split('/');
    const [process, setProcess] = useState<FilesList | null>();
    const throwError = useAsyncError();

    useEffect(() => {
        handleProcessFiles(path, user, url[url.length - 1])
            .then((data) => {
                setProcess(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError, setProcess);
            });
    }, []);
    return (
        <div className="MainWindow">
            <div className="Window">
                <WindowTitle title={process?.process.title || ''}>
                    <small>{process?.process.date}</small>
                </WindowTitle>
                <hr />
                <Table head={undefined} body={undefined} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
