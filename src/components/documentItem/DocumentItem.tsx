import React, { useEffect, useState } from 'react';
import { FileTypes, SimpleView } from 'src/config/types/types';
import { generateBody, handleEvents } from './DocumentItemFunctions';
import './DocumentItem.css';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';

function DocumentItem({ element, setRefresh, dispatchUser }: { element: FileTypes; setRefresh: CallableFunction } & SimpleView): JSX.Element {
    const listenerState = useState('');
    const formState = useState<Partial<FileTypes>>({ filename: element.filename });
    const filenameState = useState<Partial<FileTypes>>({ filename: element.filename });
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(formState, listenerState, setRefresh, element).catch((error) => handleErros(error as Error, dispatchUser, throwError));
    }, [listenerState[0]]);

    return <>{generateBody(filenameState, formState, listenerState, element)}</>;
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentItem);
