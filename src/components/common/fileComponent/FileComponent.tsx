import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { AxiosResponse } from 'axios';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleFile, openFile } from './FileComponentFunction';

type ExtensionProps = {
    $extension: string;
};

const extensionValue = (value: string) => {
    const [extension] = value.split('.').reverse();
    return extension;
};

const comparison = (extensions: string[], extension: string) => {
    const extensionVal = extensionValue(extension);
    return extensions.some((element) => element === extensionVal);
};

const FileButtonStyle = styled.button<ExtensionProps>`
    border: none;
    border-right: 8px solid ${({ theme }) => theme.colors.yellow};
    background-color: ${({ theme }) => theme.colors.gray};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 15px;

    &:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.lightGrayText};
    }

    ${(props) =>
        comparison(['png', 'jpeg', 'jpg'], props.$extension) &&
        css`
            border-right: 8px solid ${({ theme }) => theme.colors.green};
        `}

    ${(props) =>
        extensionValue(props.$extension) == 'pdf' &&
        css`
            border-right: 8px solid ${({ theme }) => theme.colors.red};
        `}

    ${(props) =>
        comparison(['ods', 'xlsx', 'xls'], props.$extension) &&
        css`
            border-right: 8px solid ${({ theme }) => theme.colors.red};
        `}
    
        ${(props) =>
        comparison(['odt', 'txt', 'docx', 'doc'], props.$extension) &&
        css`
            border-right: 8px solid ${({ theme }) => theme.colors.blue};
        `}
`;

const TextStyle = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
`;

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
        <FileButtonStyle $extension={name} onClick={() => getFile(id)}>
            <TextStyle>{name}</TextStyle>
        </FileButtonStyle>
    );
}
