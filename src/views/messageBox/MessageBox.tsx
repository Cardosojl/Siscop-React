import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PageSelector from 'src/components/pageSelector/PageSelector';
import SearchBar from 'src/components/searchBar/SearchBar';
import { Listener, Message, ObjFilter, SimpleView, TableType } from 'src/config/types/types';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import Table from 'src/components/table/Table';
import { handleApiArchiveMessage, handleApiDeleteMessage, handleErros, handleMessageTable, handleMessages } from './MessageBoxFunctions';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import { connect } from 'react-redux';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';

function MessageBox({ title, path, user, dispatchUser }: SimpleView): JSX.Element {
    const pathPage = useLocation().pathname.split('/');
    const mainPath = pathPage[1];
    const [numberPage] = pathPage.reverse();
    const [index, setIndex] = useState(+numberPage);
    const [changedPath, setChangedPath] = useState<string>('');
    const [filter, setFilter] = useState<ObjFilter | null>(null);
    const [messages, setMessages] = useState<Message[] | null>([]);
    const [listener, setListener] = useState<Listener>({ action: null, itemId: null });
    const limit = 2;
    const throwError = useAsyncError();

    useEffect(() => {
        setIndex(0);
        setChangedPath(path || '');
    }, [path, filter]);

    useEffect(() => {
        if (listener && listener.itemId && listener.action === 'delete') {
            handleApiDeleteMessage(changedPath, listener.itemId)
                .then(() => {
                    setListener({ itemId: null, action: null });
                })
                .catch((error) => {
                    handleErros(error as Error, dispatchUser, throwError);
                });
        }
        if (listener && listener.itemId && listener.action === 'archive') {
            handleApiArchiveMessage('messageArchiveds', listener.itemId)
                .then(() => {
                    setListener({ itemId: null, action: null });
                })
                .catch((error) => {
                    handleErros(error as Error, dispatchUser, throwError);
                });
        }
    }, [listener]);

    useEffect(() => {
        handleMessages(changedPath, limit, index, user, filter)
            .then((data) => {
                setMessages(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, [index, filter, changedPath, listener.itemId]);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title={title || ''} className="dark">
                    <SearchBar setFilter={setFilter} path={changedPath} />
                </WindowTitle>
                <Table table={handleMessageTable(changedPath, messages, setListener)} />
                <PageSelector setChangePage={setIndex} path={changedPath} index={index} limit={limit} filter={filter} />
            </div>
            <Navigate to={`/${mainPath}/${index}`} />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
