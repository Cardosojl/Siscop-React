import React from 'react';
import { ProcessState } from 'src/config/types/types';
import './StatusBlockSmall.css';

export function StatusBlockSmall({ processState }: { processState: ProcessState }): JSX.Element {
    return (
        <div className="StatusBlockSmall">
            <p className="StatusBlockSmall__state">{processState.state}</p>
            <small>Atualizado em: {processState.date}</small>
        </div>
    );
}
