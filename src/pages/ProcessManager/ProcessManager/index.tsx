import React, { useContext, useEffect, useState } from 'react';
import { FilterTypes, ProcessTypes, SectionTypes, TableTypes } from 'src/apis/types';
import { generatePageSelector, generateSectionTitle, handleProcesses, handleProcessesTable, handleSections } from './ProcessManagerFunction';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import { Table } from 'src/components/Table/index';
import { useLocation } from 'react-router-dom';
import { IndexSelector } from 'src/components/IndexSelector/index';
import { SearchBar } from 'src/components/SearchBar/index';
import { Window } from 'src/components/Wrapper/Window/index';
import { Title } from 'src/components/Title/index';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';
import UserContext from 'src/context/UserContext';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function ProcessManager(): JSX.Element {
    const { setUser } = useContext(UserContext);
    const [numberPage] = useLocation().pathname.split('/').reverse();
    const [index, setIndex] = useState(+numberPage || 0);
    const [sections, setSections] = useState<SectionTypes[] | null>(null);
    const [sectionSelected, setSectionSelected] = useState<Partial<ProcessTypes>>({ origin: '' });
    const [filter, setFilter] = useState<FilterTypes>({});
    const [titleSelected, setTitleSelected] = useState<string>('Busca Geral');
    const [processesTable, setProcessesTable] = useState<TableTypes>({ head: null, body: null });
    const [listener, setListener] = useState<boolean>(false);
    const itensLimit = 2;
    const throwError = useAsyncError();

    useEffect(() => {
        handleSections()
            .then((data) => {
                setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
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
                handleErros(error as Error, setUser, throwError);
            });
    }, [filter, sectionSelected, index]);

    return (
        <LayoutDefault>
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
                <Table head={processesTable.head} body={processesTable.body} />
                {generatePageSelector(itensLimit, index, sectionSelected, filter, setIndex, listener)}
            </Window>
        </LayoutDefault>
    );
}

export default ProcessManager;
