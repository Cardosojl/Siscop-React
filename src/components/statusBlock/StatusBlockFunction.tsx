import React from 'react';
import { siscopDelete } from 'src/apis/siscopDB';
import { ProcessState } from 'src/config/types/types';

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
