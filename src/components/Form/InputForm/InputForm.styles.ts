import styled, { css } from 'styled-components';
import { InputFormStyleProps } from './types';

export const InputFormStyle = styled.input<InputFormStyleProps>`
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
