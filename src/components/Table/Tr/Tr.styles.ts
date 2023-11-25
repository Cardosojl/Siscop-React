import styled, { css } from 'styled-components';
import { ElementTableProps } from '../types';

export const TrStyle = styled.tr<ElementTableProps>`
    &:hover {
        background-color: rgba(0, 0, 0, 0.075);
    }

    ${(props) =>
        props.$edit &&
        css`
            transition: 0.4s;
            color: ${({ theme }) => theme.colors.primaryText};
            font-weight: bold;
            background-color: ${({ theme }) => theme.colors.lightsuccessBackground};
            &:hover {
                background-color: ${({ theme }) => theme.colors.successBackground};
            }
        `}

    ${(props) =>
        props.$delete &&
        css`
            transition: 0.4s;
            color: ${({ theme }) => theme.colors.primaryText};
            font-weight: bold;
            background-color: ${({ theme }) => theme.colors.lightdangerBackground};
            &:hover {
                background-color: ${({ theme }) => theme.colors.dangerBackground};
            }
        `}
`;
