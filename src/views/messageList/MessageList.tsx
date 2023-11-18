import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PageSelector from 'src/components/common/pageSelector/PageSelector';
import SearchBar from 'src/components/common/searchBar/SearchBar';
import { ObjFilter, TableType } from 'src/config/types/types';
import Table from 'src/components/common/Table';
import { handleMessageTable, handleMessages, handleUrl } from './MessageListFunctions';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/common/Window';
import Title from 'src/components/common/Title';
import DataContext from 'src/data/DataContext';
import { DefaultLayout } from 'src/components/common/DefaultLayout';

function MessageList({ title, path }: { title: string | undefined; path: string | undefined }): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [numberPage] = useLocation().pathname.split('/').reverse();
    const [index, setIndex] = useState(+numberPage);
    const [changedPath, setChangedPath] = useState<string>(path as string);
    const [filter, setFilter] = useState<ObjFilter | null>(null);
    const [messageTable, setMessageTable] = useState<TableType>({ head: null, body: null });
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
        <DefaultLayout>
            <Window $large>
                <Title title={title || ''} $dark>
                    <SearchBar setFilter={setFilter} path={changedPath} optionValues={['Mensagem', 'Processo']} apiValues={['title', 'process_title']} />
                </Title>
                <Table table={messageTable} />
                <PageSelector setChangePage={setIndex} path={changedPath} index={index} limit={itensLimit} filter={filter} listener={refresh} />
                <Navigate to={`/${handleUrl(path as string)}/${index}`} />
            </Window>
        </DefaultLayout>
    );
}

export default MessageList;
