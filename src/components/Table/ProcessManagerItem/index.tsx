import React from 'react';
import { generateBody } from './ProcessManagerItemServices';
import { Process } from 'src/config/types/types';

export function ProcessManagerItem({ process }: { process: Process | undefined }): JSX.Element {
    return <>{generateBody(process)}</>;
}
