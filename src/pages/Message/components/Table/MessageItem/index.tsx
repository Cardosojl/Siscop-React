import React, { useContext, useEffect, useState } from 'react';
import { MessageTypes } from 'src/apis/types';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { generateBody, handleEvents } from './MessageItemServices';
import UserContext from 'src/context/UserContext';
import { TableItemProps } from 'src/components/Table/types';

export function MessageItem({ element, setRefresh, path }: TableItemProps<MessageTypes>): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const listenerState = useState('');
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(listenerState, setRefresh, element, user, path as string).catch((error) => handleErros(error as Error, setUser, throwError));
    }, [listenerState[0]]);

    return <>{generateBody(listenerState, element, path as string)}</>;
}
