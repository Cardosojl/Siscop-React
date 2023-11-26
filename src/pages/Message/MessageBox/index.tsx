import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PageSelector } from 'src/components/PageSelector/index';
import { SearchBar } from 'src/components/SearchBar/index';
import { FilterTypes, TableTypes } from 'src/apis/types';
import { Table } from 'src/components/Table/index';
import { handleMessageTable, handleMessages, handleUrl } from './MessageBoxFunctions';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/Wrapper/Window/index';
import { Title } from 'src/components/Title/index';
import UserContext from 'src/context/UserContext';
import { MessageBoxTypes } from './types';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function MessageBox({ title, path }: MessageBoxTypes): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const [numberPage] = useLocation().pathname.split('/').reverse();
    const [index, setIndex] = useState(+numberPage);
    const [changedPath, setChangedPath] = useState<string>(path as string);
    const [filter, setFilter] = useState<FilterTypes | null>(null);
    const [messageTable, setMessageTable] = useState<TableTypes>({ head: null, body: null });
    const [refresh, setRefresh] = useState<boolean>(false);
    const itensLimit = 2;
    const throwError = useAsyncError();

    useEffect(() => {
        setIndex(0);
        setChangedPath(path || '');
    }, [path, filter]);

    useEffect(() => {
        if (refresh === true) setRefresh(false);
        handleMessages(changedPath, itensLimit, index, user, filter)
            .then((data) => {
                setMessageTable(handleMessageTable(changedPath, data, setRefresh));
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, [index, filter, changedPath, refresh]);

    return (
        <LayoutDefault>
            <Window $large>
                <Title title={title || ''} $dark>
                    <SearchBar setFilter={setFilter} path={changedPath} optionValues={['Mensagem', 'Processo']} apiValues={['title', 'process_title']} />
                </Title>
                <Table head={messageTable.head} body={messageTable.body} />
                <PageSelector setChangePage={setIndex} path={changedPath} index={index} limit={itensLimit} filter={filter} listener={refresh} />
                <Navigate to={`/${handleUrl(path as string)}/${index}`} />
            </Window>
        </LayoutDefault>
    );
}

export default MessageBox;
