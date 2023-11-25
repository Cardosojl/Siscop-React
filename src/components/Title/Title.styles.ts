import styled, { css } from 'styled-components';
import { TitleStyleProps } from './types';

export const DivStyle = styled.div<TitleStyleProps>`
    width: auto;
    border-radius: 2px 2px 0px 0px;
    padding: 20px 0px 0px 0px;
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme, $dark }) => ($dark ? theme.colors.secondary : '')};
`;

export const TitleStyle = styled.h4<TitleStyleProps>`
    margin-left: 15px;
    ${(props) =>
        props.$dark &&
        css`
            color: ${({ theme }) => theme.colors.secondaryText};
        `}
`;

export const ChildrenStyle = styled.span<TitleStyleProps>`
    margin-right: 15px;
    h3 {
        ${(props) =>
            props.$dark &&
            css`
                color: ${({ theme }) => theme.colors.secondaryText};
            `}
    }
    small {
        color: ${({ theme }) => theme.colors.lightGrayText};
        font-size: 11.5px;
    }
`;
