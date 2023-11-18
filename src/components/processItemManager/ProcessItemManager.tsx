import React from 'react';
import { generateBody } from './ProcessItemManagerFunction';
import { Process } from 'src/config/types/types';

function ProcessItemManager({ process }: { process: Process | undefined }): JSX.Element {
    return <>{generateBody(process)}</>;
}

export default ProcessItemManager;
