import React, { useEffect, useState } from 'react';
import { Process, TableItem } from 'src/config/types/types';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { generateBody, handleEvents } from './ProcessItemFunction';

function ProcessItem({ element, setRefresh, path, user, dispatchUser }: TableItem<Process>): JSX.Element {
    const listenerState = useState('');
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(listenerState, element, path as string, user, setRefresh).catch((error) => handleErros(error as Error, dispatchUser, throwError));
    }, [listenerState[0]]);

    return <>{generateBody(listenerState, element, path as string)}</>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessItem);
