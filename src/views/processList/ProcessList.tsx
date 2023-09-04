import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageSelector from 'src/components/pageSelector/PageSelector';
import Table from 'src/components/table/Table';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { Listener, ObjFilter, SimpleView, TableType, Year } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { IndexSelectors } from 'src/components/indexSelectors/IndexSelectors';
import { handleProcesses, handleErros, handleYears, handleProcessesTable } from './ProcessListFunctions';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { Navigate, useLocation } from 'react-router-dom';

function ProcessList({ user, dispatchUser, path, title }: SimpleView): JSX.Element {
    const pathPage = useLocation().pathname.split('/');
    const mainPath = pathPage[1];
    const [numberPage] = pathPage.reverse();
    const [index, setIndex] = useState(+numberPage || 0);
    const [changedPath, setChangedPath] = useState<string>('');
    const [filter, setFilter] = useState<ObjFilter>({ year: '0000' });
    const [yearIndex, setYearIndex] = useState<Year[] | null>(null);
    const [listener, setListener] = useState<Listener>({ action: null, itemId: null });
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
        handleProcesses(changedPath, 2, index, user, filter)
            .then((data) => {
                setProcessesTable(handleProcessesTable(changedPath, data, setListener));
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, [filter, index]);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title={title || ''}>
                    <h3>{filter.year !== '0000' ? filter.year : ''}</h3>
                </WindowTitle>
                <hr />
                <IndexSelectors index={yearIndex} setFilter={setFilter} />
                <Table table={processesTable} />
                <PageSelector path={changedPath} filter={filter} setChangePage={setIndex} index={index} limit={limit} />
            </div>
            <Navigate to={`/${mainPath}/${index}`} />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList);
