import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import MessageTable from 'src/components/messageTable/MessageTable';
import PageSelector from 'src/components/pageSelector/PageSelector';
import SearchBar from 'src/components/searchBar/SearchBar';
import { MessageBoxType, ObjFilter } from 'src/config/types/types';
import WindowTitle from 'src/components/windowTitle/WindowTitle';

function MessageBox({ title, path }: MessageBoxType): JSX.Element {
    const pathPage = useLocation().pathname.split('/');
    const mainPath = pathPage[1];
    const numberPage = +pathPage[pathPage.length - 1];
    const [page, setPage] = useState(numberPage || 0);
    const [index, setIndex] = useState(page);
    const [changePage, setChangePage] = useState(0);
    const [filter, setFilter] = useState<ObjFilter | null>(null);
    const [search, setSearch] = useState<ObjFilter | null>(null);
    const limit = 2;

    useEffect(() => {
        setIndex(0);
        setPage(0);
        setChangePage(0);
        setFilter(search);
    }, [path, search]);

    useEffect(() => {
        setIndex(changePage);
        setPage(numberPage);
    }, [changePage, search]);

    return (
        <div className="MainWindow container">
            <div className="Window">
                <WindowTitle title={title} className="dark">
                    <SearchBar setFilter={setSearch} path={path} />
                </WindowTitle>
                <MessageTable index={index} filter={filter} path={path} limit={limit} />
                <PageSelector setChangePage={setChangePage} path={path} index={index} limit={limit} filter={filter} />
            </div>
            <Navigate to={`/${mainPath}/${index}`} />
        </div>
    );
}

export default MessageBox;
