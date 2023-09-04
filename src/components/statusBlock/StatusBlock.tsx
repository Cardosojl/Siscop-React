import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ProcessState, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import './StatusBlock.css';
import { generateBody, handleEvents } from './StatusBlockFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';

function StatusBlock({ processState, user, dispatchUser }: { processState: ProcessState } & SimpleView): JSX.Element {
    const state = useState<ProcessState>(processState);
    const listenerState = useState<string>('');
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents(listenerState, state).catch((error) => handleErros(error as Error, dispatchUser, throwError));
    }, [listenerState[0]]);

    return generateBody(state, listenerState, user);
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBlock);
