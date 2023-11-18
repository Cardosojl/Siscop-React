import React, { useContext, useEffect, useState } from 'react';
import { FileTypes, TableItem } from 'src/config/types/types';
import { generateBody, handleEvents } from './DocumentItemFunctions';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import DataContext from 'src/data/DataContext';

function DocumentItem({ element, setRefresh, path }: TableItem<FileTypes>): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const listenerState = useState('');
    const formState = useState<Partial<FileTypes>>({ filename: element.filename });
    const filenameState = useState<Partial<FileTypes>>({ filename: element.filename });
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(formState, listenerState, setRefresh, element, path as string, user).catch((error) => handleErros(error as Error, setUser, throwError));
    }, [listenerState[0]]);

    return <>{generateBody(filenameState, formState, listenerState, element, path as string)}</>;
}

export default DocumentItem;
