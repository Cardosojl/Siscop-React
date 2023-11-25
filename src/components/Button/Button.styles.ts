import styled, { css } from 'styled-components';
import { ButtonProps } from './types';

export const ButtonStyle = styled.button<ButtonProps>`
    cursor: pointer;

    ${(props) =>
        props.$green &&
        css`
            background-color: ${({ theme }) => theme.colors.green};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightGreen};
            }
        `}

    ${(props) =>
        props.$blue &&
        css`
            background-color: ${({ theme }) => theme.colors.blue};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightBlue};
            }
        `}
    ${(props) =>
        props.$red &&
        css`
            background-color: ${({ theme }) => theme.colors.red};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightRed};
            }
        `}
    ${(props) =>
        props.$yellow &&
        css`
            background-color: ${({ theme }) => theme.colors.yellow};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightYellow};
            }
        `}
`;
