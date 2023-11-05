import React from 'react';
import { siscopDelete } from 'src/apis/siscopDB';
import { ProcessState, User } from 'src/config/types/types';

export async function DeleteState(id: string): Promise<void> {
    await siscopDelete('processStates', { _id: id });
}

export async function handleEvents(listenerState: [string, CallableFunction], state: [ProcessState, CallableFunction]): Promise<void> {
    const [listener, setListener] = listenerState;
    const [processState, setProcessState] = state;
    if (listener === 'Delete') {
        await DeleteState(processState._id);
        setListener('');
        setProcessState('');
    }
}

export function generateBody(stateState: [ProcessState, CallableFunction], listenerState: [string, CallableFunction], user: User): JSX.Element {
    const [state] = stateState;
    const [, setListener] = listenerState;
    if (state) {
        return (
            <div className="StatusBlock">
                <div className="StatusBlock__information">
                    <small>
                        <b>Status:</b>
                    </small>
                    <label>&nbsp;{state.state}</label>
                </div>
                <div className="StatusBlock__information">
                    <small>
                        <b>OBS:</b>
                    </small>
                    <label>&nbsp;{state.anotation}</label>
                </div>
                <div className="StatusBlock__information">
                    <small>
                        <b>De:</b> {state.user ? `${(state as ProcessState<string, User>).user.pg} ${(state as ProcessState<string, User>).user.name}` : 'Sistema'}
                        {' - '}
                        {state.date}
                    </small>
                </div>
                <div className="StatusBlock__delete">
                    {state.user ? (state as ProcessState<string, User>).user._id === user._id ? <button onClick={() => setListener('Delete')}>Apagar</button> : '' : ''}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
