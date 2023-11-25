import React, { useContext, useEffect, useState } from 'react';
import { Process } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { generateBody, handleEvents } from './ProcessItemServices';
import DataContext from 'src/data/DataContext';
import { TableItemProps } from '../types';

export function ProcessItem({ element, setRefresh, path }: TableItemProps<Process>): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const listenerState = useState('');
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(listenerState, element, path as string, user, setRefresh).catch((error) => handleErros(error as Error, setUser, throwError));
    }, [listenerState[0]]);

    return <>{generateBody(listenerState, element, path as string)}</>;
}
