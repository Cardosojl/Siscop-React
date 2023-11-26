import React, { useContext, useEffect, useState } from 'react';
import { ProcessStateTypes, UserTypes } from 'src/apis/types';
import { handleEvents } from './StatusBlockServices';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import UserContext from 'src/context/UserContext';
import { ButtonStatusStyle, DivStatusStyle, LabelStatusStyle } from './StatusBlock.styles';
import { StatusBlockProps } from './types';

export function StatusBlock({ $small, processState }: StatusBlockProps): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const [state, setState] = useState<ProcessStateTypes>(processState);
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
                    <b>De:</b> {state.user ? `${(state as ProcessStateTypes<string, UserTypes>).user.name}` : 'Sistema'}
                    {' - '}
                    {state.date}
                </small>
            </LabelStatusStyle>
            <ButtonStatusStyle>
                {state.user ? (state as ProcessStateTypes<string, UserTypes>).user._id === user._id ? <button onClick={() => setListenerState('Delete')}>Apagar</button> : '' : ''}
            </ButtonStatusStyle>
        </DivStatusStyle>
    );
}
