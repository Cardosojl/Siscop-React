import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import './FileComponent.css';
import { handleFile, openFile } from './FileComponentFunction';

export function FileComponent({ name, id }: { name: string; id: string }): JSX.Element {
    const [fileBuffer, setFileBuffer] = useState<AxiosResponse>();
    const throwError = useAsyncError();

    const getFile = async (id: string) => {
        try {
            setFileBuffer(await handleFile(id));
        } catch (error) {
            throwError(error as Error);
        }
    };

    useEffect(() => {
        if (fileBuffer) openFile(fileBuffer);
    }, [fileBuffer]);

    return (
        <button className="FileComponent__button" onClick={() => getFile(id)}>
            <p>{name}</p>
        </button>
    );
}
