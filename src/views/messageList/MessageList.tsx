import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PageSelector from 'src/components/pageSelector/PageSelector';
import SearchBar from 'src/components/searchBar/SearchBar';
import { ObjFilter, SimpleView, TableType } from 'src/config/types/types';
import Table from 'src/components/Table';
import { handleMessageTable, handleMessages, handleUrl } from './MessageListFunctions';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import { connect } from 'react-redux';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/Window';
import Title from 'src/components/Title';

function MessageList({ title, path, user, dispatchUser }: SimpleView): JSX.Element {
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
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, [index, filter, changedPath, refresh]);

    return (
        <Window $large>
            <Title title={title || ''} $dark>
                <SearchBar setFilter={setFilter} path={changedPath} optionValues={['Mensagem', 'Processo']} apiValues={['title', 'process_title']} />
            </Title>
            <Table table={messageTable} />
            <PageSelector setChangePage={setIndex} path={changedPath} index={index} limit={itensLimit} filter={filter} listener={refresh} />
            <Navigate to={`/${handleUrl(path as string)}/${index}`} />
        </Window>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
