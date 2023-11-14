import styled, { css } from 'styled-components';

type InputFormProps = {
    $small?: boolean;
    $medium?: boolean;
    $large?: boolean;
};

export const InputForm = styled.input<InputFormProps>`
    ${(props) =>
        props.$small &&
        css`
            width: 170px;
        `}

    ${(props) =>
        props.$medium &&
        css`
            width: 300px;
        `}

        ${(props) =>
        props.$large &&
        css`
            width: 600px;
        `}
`;
