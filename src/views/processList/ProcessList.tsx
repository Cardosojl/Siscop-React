import React, { useContext, useEffect, useState } from 'react';
import { PageSelector } from 'src/components/PageSelector/index';
import { Table } from 'src/components/Table/index';
import { ObjFilter, TableType, Year } from 'src/config/types/types';
import { handleProcesses, handleYears, handleProcessesTable, handleUrl, generateIndex } from './ProcessListFunctions';
import useAsyncError from 'src/hooks/useAsyncError';
import { Navigate, useLocation } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/Wrapper/Window/index';
import { Title } from 'src/components/Title/index';
import DataContext from 'src/data/DataContext';

function ProcessList({ path, title }: { path: string | undefined; title: string | undefined }): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [numberPage] = useLocation().pathname.split('/').reverse();
    const [index, setIndex] = useState(+numberPage || 0);
    const [changedPath, setChangedPath] = useState('');
    const [filter, setFilter] = useState<ObjFilter>({ year: '0000' });
    const [yearIndex, setYearIndex] = useState<Year[] | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [processesTable, setProcessesTable] = useState<TableType>({ head: null, body: null });
    const limit = 2;
    const throwError = useAsyncError();

    useEffect(() => {
        handleYears()
            .then((data) => {
                setYearIndex(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    useEffect(() => {
        setChangedPath(path || '');
    }, [path]);

    useEffect(() => {
        setIndex(0);
    }, [filter]);

    useEffect(() => {
        setFilter({ year: '0000' });
        setIndex(0);
    }, [changedPath]);

    useEffect(() => {
        if (refresh === true) setRefresh(false);
        handleProcesses(changedPath, 2, index, user, filter)
            .then((data) => {
                setProcessesTable(handleProcessesTable(changedPath, data, setRefresh));
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, [filter, index, refresh]);

    return (
        <Window $large>
            <Title title={title || ''}>
                <h3>{filter.year !== '0000' ? filter.year : ''}</h3>
            </Title>
            <hr />
            {generateIndex(yearIndex, filter, setFilter)}
            <Table head={processesTable.head} body={processesTable.body} />
            <PageSelector path={changedPath} filter={filter} setChangePage={setIndex} index={index} limit={limit} listener={refresh} />
            <Navigate to={`/${handleUrl(path as string)}/${index}`} />
        </Window>
    );
}

export default ProcessList;
