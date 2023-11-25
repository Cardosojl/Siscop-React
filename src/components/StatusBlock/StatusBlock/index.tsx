import React, { useContext, useEffect, useState } from 'react';
import { ProcessState, User } from 'src/config/types/types';
import { handleEvents } from './StatusBlockServices';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import DataContext from 'src/data/DataContext';
import { ButtonStatusStyle, DivStatusStyle, LabelStatusStyle } from './StatusBlock.styles';
import { StatusBlockProps } from './types';

export function StatusBlock({ $small, processState }: StatusBlockProps): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [state, setState] = useState<ProcessState>(processState);
    const [listenerState, setListenerState] = useState<string>('');
    const throwError = useAsyncError();

    useEffect(() => {
        handleEvents([listenerState, setListenerState], [state, setState]).catch((error) => handleErros(error as Error, setUser, throwError));
    }, [listenerState[0]]);

    return (
        <DivStatusStyle $small={$small || false}>
            <LabelStatusStyle>
                <small>
                    <b>Status:</b>
                </small>
                <label>&nbsp;{state.state}</label>
            </LabelStatusStyle>
            <LabelStatusStyle>
                <small>
                    <b>OBS:</b>
                </small>
                <label>&nbsp;{state.anotation}</label>
            </LabelStatusStyle>
            <LabelStatusStyle>
                <small>
                    <b>De:</b> {state.user ? `${(state as ProcessState<string, User>).user.name}` : 'Sistema'}
                    {' - '}
                    {state.date}
                </small>
            </LabelStatusStyle>
            <ButtonStatusStyle>
                {state.user ? (state as ProcessState<string, User>).user._id === user._id ? <button onClick={() => setListenerState('Delete')}>Apagar</button> : '' : ''}
            </ButtonStatusStyle>
        </DivStatusStyle>
    );
}
