import React, { useEffect, useState } from 'react';
import { ObjFilter, Process, Section, SimpleView, TableType } from 'src/config/types/types';
import { generatePageSelector, generateSectionTitle, handleProcesses, handleProcessesTable, handleSections } from './ProcessManagerFunction';
import { handleErros } from 'src/apis/siscopDB';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import useAsyncError from 'src/hooks/useAsyncError';
import Table from 'src/components/Table';
import { useLocation } from 'react-router-dom';
import { IndexSelector } from 'src/components/indexSelector/IndexSelector';
import SearchBar from 'src/components/searchBar/SearchBar';
import { Window } from 'src/components/Window';
import Title from 'src/components/Title';
import { Wrapper } from 'src/components/Wrapper';

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
        <Window $large>
            <Title title="Acompanhar Process" />
            <hr />
            {sections?.map((element, index) => (
                <IndexSelector key={index} index={element.name} value={element._id} setFilter={setSectionSelected} filter={sectionSelected} />
            ))}
            <Wrapper $paddingTop="25px">
                <IndexSelector index="Busca Geral" value="" setFilter={setSectionSelected} filter={sectionSelected} />
            </Wrapper>
            <hr />
            <Wrapper $displayFlex="space-between" $paddingLeft="15px" $paddingRight="15px">
                <h5>{titleSelected}</h5>
                <SearchBar setFilter={setFilter} path={''} optionValues={['Titulo', 'Ano', 'F. Aquisição']} apiValues={['title', 'year', 'category']} />
            </Wrapper>
            <Table table={processesTable} />
            {generatePageSelector(itensLimit, index, sectionSelected, filter, setIndex, listener)}
        </Window>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessManager);
