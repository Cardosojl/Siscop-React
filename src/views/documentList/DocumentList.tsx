import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from 'src/components/table/Table';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { Process, SimpleView, TableType } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleFiles, handleProcess, handleTableFiles } from './DocumentListFunction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DocumentList.css';
import { handleErros } from 'src/apis/siscopDB';
import ProcessInformation from 'src/components/processInformation/ProcessInformation';
import UploadFiles from 'src/components/uploadFiles/UploadFiles';
import arrow from '../../assets/seta2.png';
import mail from '../../assets/email.png';

function DocumentList({ path, dispatchUser, user }: SimpleView): JSX.Element {
    const [processId] = useLocation().pathname.split('/').reverse();
    const [table, setTable] = useState<TableType>({ head: null, body: null });
    const [process, setProcess] = useState<Partial<Process>>({});
    const [changedPath, setChangedPath] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);
    const navigate = useNavigate();
    const throwError = useAsyncError();

    useEffect(() => {
        setChangedPath(path || '');
    }, [path]);

    useEffect(() => {
        handleProcess(path as string, user, processId)
            .then((data) => {
                setProcess(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
        setRefresh(false);
        setTable({ head: null, body: null });
    }, [refresh]);

    useEffect(() => {
        if (process._id) {
            handleFiles(process as Process)
                .then((data) => {
                    setTable(handleTableFiles(changedPath, data, setRefresh));
                })
                .catch((error) => {
                    handleErros(error as Error, dispatchUser, throwError);
                });
        }
    }, [process]);

    return (
        <div className="MainWindow">
            <div className="Window">
                <WindowTitle title={process.title || ''}>
                    <small className="Title__date">{process.date || ''}</small>
                </WindowTitle>
                <hr />
                <div className="DocumentList__table">
                    <Table table={table} />
                </div>
                <ProcessInformation process={process} />
                <UploadFiles setRefresh={setRefresh} />
                <div className="DocumentList__buttons__fild">
                    <button className="Button--green DocumentList__button" onClick={() => navigate(-1)}>
                        <img className="DocumentList__arrow" src={arrow} />
                    </button>
                    <button className="Button--blue DocumentList__button">
                        <Link to={`/novaMensagem/${processId}`}>
                            <img className="DocumentList__mail" src={mail} />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
