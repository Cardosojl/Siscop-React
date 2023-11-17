import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleFile, openFile } from './FileComponentFunction';

const FileStyle = styled.div`
    border: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 15px;

    &:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.lightGrayText};
    }
`;

const TextStyle = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
`;

export function FileComponentClean({ name, id }: { name: string; id: string }): JSX.Element {
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
        <FileStyle onClick={() => getFile(id)}>
            <TextStyle>{name}</TextStyle>
        </FileStyle>
    );
}
