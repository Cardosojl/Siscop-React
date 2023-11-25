import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleFile, openFile } from '../FileServices';
import { FileButtonStyle, TextStyle } from './File.styles';
import { FileProps } from '../types';

export function File({ name, id }: FileProps): JSX.Element {
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
        <FileButtonStyle $extension={name} onClick={() => getFile(id)}>
            <TextStyle>{name}</TextStyle>
        </FileButtonStyle>
    );
}
