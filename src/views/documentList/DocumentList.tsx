import React, { useContext, useEffect, useState } from 'react';
import Table from 'src/components/common/Table';
import useAsyncError from 'src/hooks/useAsyncError';
import { Process, TableType } from 'src/config/types/types';
import { handleFiles, handleProcess, handleTableFiles } from './DocumentListFunction';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';
import ProcessInformation from 'src/components/Process/ProcessDocuments/processInformation/ProcessInformation';
import UploadFiles from 'src/components/Process/ProcessDocuments/uploadFiles/UploadFiles';
import arrow from '../../assets/seta2.png';
import mail from '../../assets/email.png';
import Title from 'src/components/common/Title';
import { Window } from 'src/components/common/Window';
import { Wrapper } from 'src/components/common/Wrapper';
import { RoundButton } from 'src/components/common/RoundButton';
import DataContext from 'src/data/DataContext';

function DocumentList({ path }: { path: string | undefined }): JSX.Element {
    const { user, setUser } = useContext(DataContext);
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
                handleErros(error as Error, setUser, throwError);
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
                    handleErros(error as Error, setUser, throwError);
                });
        }
    }, [process]);

    return (
        <Window $large>
            <Title title={process.title || ''}>
                <small>{process.date || ''}</small>
            </Title>
            <hr />
            <Wrapper $paddingLeft="15px" $paddingRight="15px">
                <Table table={table} />
            </Wrapper>
            <ProcessInformation process={process} />
            <UploadFiles setRefresh={setRefresh} />
            <Wrapper $displayFlex="space-between" $paddingLeft="15px" $paddingRight="15px">
                <RoundButton $green src={arrow} onClick={() => navigate(-1)} />
                <RoundButton $blue src={mail} link={`/novaMensagem/${processId}`} />
            </Wrapper>
        </Window>
    );
}

export default DocumentList;
