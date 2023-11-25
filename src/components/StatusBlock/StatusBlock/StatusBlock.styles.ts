import styled, { css } from 'styled-components';
import { StatusBlockStyleProps } from './types';

export const DivStatusStyle = styled.div<StatusBlockStyleProps>`
    background-color: ${({ theme }) => theme.colors.fluorescent};
    margin-left: 20px;
    margin-top: 20px;
    padding: 20px;
    width: 330px;
    min-height: 180px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.primaryText};

    ${(props) =>
        props.$small &&
        css`
            width: 330px;
            background-color: ${({ theme }) => theme.colors.fluorescent};
            padding: 4px;
            height: 100px;
        `}
`;

export const LabelStatusStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
`;

export const ButtonStatusStyle = styled.div`
    text-align: center;
    button {
        background: none;
        border: none;
        color: ${({ theme }) => theme.colors.primaryText};
        &:hover {
            color: ${({ theme }) => theme.colors.lightGrayText};
        }
    }
`;
