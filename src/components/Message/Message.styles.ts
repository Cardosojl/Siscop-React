import styled, { css } from 'styled-components';
import { MessageStylesProps } from './types';

export const MessageStyle = styled.p<MessageStylesProps>`
    font-size: 15px;
    color: ${({ theme }) => theme.colors.primaryText};

    ${(props) =>
        props.$error &&
        css`
            color: ${({ theme }) => theme.colors.errorText};
        `}

    ${(props) =>
        props.$success &&
        css`
            color: ${({ theme }) => theme.colors.successText};
        `}
`;
