import React, { useContext, useEffect, useState } from 'react';
import { FileTypes } from 'src/apis/types';
import { generateBody, handleEvents } from './DocumentItemFunctions';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import UserContext from 'src/context/UserContext';
import { TableItemProps } from 'src/components/Table/types';

export function DocumentItem({ element, setRefresh, path }: TableItemProps<FileTypes>): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const listenerState = useState('');
    const formState = useState<Partial<FileTypes>>({ filename: element.filename });
    const filenameState = useState<Partial<FileTypes>>({ filename: element.filename });
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(formState, listenerState, setRefresh, element, path as string, user).catch((error) => handleErros(error as Error, setUser, throwError));
    }, [listenerState[0]]);

    return <>{generateBody(filenameState, formState, listenerState, element, path as string)}</>;
}
