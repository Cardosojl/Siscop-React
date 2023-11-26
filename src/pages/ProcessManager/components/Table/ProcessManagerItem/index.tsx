import React from 'react';
import { generateBody } from './ProcessManagerItemServices';
import { ProcessTypes } from 'src/apis/types';

export function ProcessManagerItem({ process }: { process: ProcessTypes | undefined }): JSX.Element {
    return <>{generateBody(process)}</>;
}
