import styled, { css } from 'styled-components';
import { ExtensionProps } from '../types';

export const extensionValue = (value: string) => {
    const [extension] = value.split('.').reverse();
    return extension;
};

export const comparison = (extensions: string[], extension: string) => {
    const extensionVal = extensionValue(extension);
    return extensions.some((element) => element === extensionVal);
};

export const FileButtonStyle = styled.button<ExtensionProps>`
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

export const TextStyle = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
`;
