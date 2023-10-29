import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageSelector from 'src/components/pageSelector/PageSelector';
import Table from 'src/components/table/Table';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { ObjFilter, SimpleView, TableType, Year } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleProcesses, handleYears, handleProcessesTable, handleUrl, generateIndex } from './ProcessListFunctions';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { Navigate, useLocation } from 'react-router-dom';
import { handleErros } from 'src/apis/siscopDB';

function ProcessList({ user, dispatchUser, path, title }: SimpleView): JSX.Element {
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
                handleErros(error as Error, dispatchUser, throwError);
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
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, [filter, index, refresh]);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title={title || ''}>
                    <h3>{filter.year !== '0000' ? filter.year : ''}</h3>
                </WindowTitle>
                <hr />
                {generateIndex(yearIndex, filter, setFilter)}
                <Table table={processesTable} />
                <PageSelector path={changedPath} filter={filter} setChangePage={setIndex} index={index} limit={limit} listener={refresh} />
            </div>
            <Navigate to={`/${handleUrl(path as string)}/${index}`} />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList);
