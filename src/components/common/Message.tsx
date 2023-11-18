import styled, { css } from 'styled-components';

type MessageProps = {
    $error?: boolean;
    $success?: boolean;
};

export const Message = styled.p<MessageProps>`
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
