import React, { useContext, useEffect, useState } from 'react';
import { Process, TableItem } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { generateBody, handleEvents } from './ProcessItemFunction';
import DataContext from 'src/data/DataContext';

function ProcessItem({ element, setRefresh, path }: TableItem<Process>): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const listenerState = useState('');
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(listenerState, element, path as string, user, setRefresh).catch((error) => handleErros(error as Error, setUser, throwError));
    }, [listenerState[0]]);

    return <>{generateBody(listenerState, element, path as string)}</>;
}

export default ProcessItem;
