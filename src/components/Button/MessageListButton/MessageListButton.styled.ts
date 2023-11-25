import styled, { css } from 'styled-components';
import { MessageListButtonProps } from './types';

export const MessageListButtonStyle = styled.img<MessageListButtonProps>`
    margin-top: -5px;
    width: ${(props) => props.$width};
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.disable};
    border: 0px;
    border-radius: 3px;
    margin: 10px;

    ${(props) =>
        props.$yellow &&
        css`
            background-color: ${({ theme }) => theme.colors.yellow};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightYellow};
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
        props.$green &&
        css`
            background-color: ${({ theme }) => theme.colors.green};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightGreen};
            }
        `}
`;
