import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageSelector from 'src/components/pageSelector/PageSelector';
import Table from 'src/components/table/Table';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { ObjFilter, SimpleView, TableType } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { IndexSelectors } from 'src/components/indexSelectors/IndexSelectors';
import { handleProcesses, handleErros, handleYears } from './ProcessListFunctions';
import useAsyncError from 'src/components/useAsyncError/UseAsyncError';

function ProcessList({ user, dispatchUser, path, title }: SimpleView): JSX.Element {
    const [changePage, setChangePage] = useState(0);
    const [filter, setFilter] = useState<ObjFilter>({ year: '0000' });
    const [yearIndex, setYearIndex] = useState<string[] | null>(null);
    const [processes, setProcesses] = useState<TableType>();
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
        setFilter({ year: '0000' });
    }, [path]);

    useEffect(() => {
        handleProcesses(path, 2, changePage, user, filter)
            .then((data) => {
                setProcesses(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError, setProcesses);
                console.log(processes);
            });
    }, [filter]);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title={title || ''} />
                <hr />
                <IndexSelectors index={yearIndex} setFilter={setFilter} />
                <Table head={processes ? processes.head : null} body={processes ? processes.body : null} />
                <PageSelector path={''} filter={null} setChangePage={setChangePage} index={0} limit={0} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList);
