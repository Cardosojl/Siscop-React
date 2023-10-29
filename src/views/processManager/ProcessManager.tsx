import React, { useEffect, useState } from 'react';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { ObjFilter, Process, Section, SimpleView, TableType } from 'src/config/types/types';
import { generateIndex, generatePageSelector, generateSectionTitle, handleProcesses, handleProcessesTable, handleSections } from './ProcessManagerFunction';
import { handleErros } from 'src/apis/siscopDB';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import Table from 'src/components/table/Table';
import { useLocation } from 'react-router-dom';
import { IndexSelector } from 'src/components/indexSelector/IndexSelector';
import SearchBar from 'src/components/searchBar/SearchBar';
import './ProcessManager.css';

function ProcessManager({ dispatchUser }: SimpleView): JSX.Element {
    const [numberPage] = useLocation().pathname.split('/').reverse();
    const [index, setIndex] = useState(+numberPage || 0);
    const [sections, setSections] = useState<Section[] | null>(null);
    const [sectionSelected, setSectionSelected] = useState<Partial<Process>>({ origin: '' });
    const [filter, setFilter] = useState<ObjFilter>({});
    const [titleSelected, setTitleSelected] = useState<string>('Busca Geral');
    const [processesTable, setProcessesTable] = useState<TableType>({ head: null, body: null });
    const [listener, setListener] = useState<boolean>(false);
    const itensLimit = 2;
    const throwError = useAsyncError();

    useEffect(() => {
        handleSections()
            .then((data) => {
                setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    useEffect(() => {
        setIndex(0);
        setListener((current) => !current);
    }, [sectionSelected, filter]);

    useEffect(() => {
        setTitleSelected(generateSectionTitle(sectionSelected, sections));
        handleProcesses(itensLimit, index, sectionSelected, filter)
            .then((data) => {
                setProcessesTable(handleProcessesTable(data));
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, [filter, sectionSelected, index]);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title="Acompanhar processo" />
                <hr />
                {generateIndex(sections, sectionSelected, setSectionSelected)}
                <IndexSelector index={'Busca Geral'} value={''} setFilter={setSectionSelected} filter={sectionSelected} />
                <hr />
                <div className="ProcessManager__processes__header">
                    <h5 className="ProcessManager__section__title">{titleSelected}</h5>
                    <SearchBar setFilter={setFilter} path={''} optionValues={['Titulo', 'Ano', 'F. Aquisição']} apiValues={['title', 'year', 'category']} />
                </div>
                <Table table={processesTable} />
                {generatePageSelector(itensLimit, index, sectionSelected, filter, setIndex, listener)}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessManager);
