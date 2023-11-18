import React from 'react';
import styled, { css } from 'styled-components';
import { LeftBarSubitens } from 'src/config/types/types';
import useColorVariation from 'src/hooks/useColorVariation';

type LeftBarSubitemProps = {
    $selected: boolean;
};

const LeftBarSubitemStyle = styled.div<LeftBarSubitemProps>`
    font-size: 10px;
    padding-left: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-size: 250px, auto;
    background-color: ${({ theme }) => theme.colors.tertiary};
    font-weight: bold;
    border-top: 1px solid ${({ theme }) => useColorVariation(theme.colors.tertiary, [12, 7, 4])};
    border-bottom: 1px solid ${({ theme }) => useColorVariation(theme.colors.tertiary, [-5, -14, -18])};
    border-right: solid 8px ${({ theme }) => theme.colors.green};
    border-radius: 0px 6px 6px 0px;

    &:hover {
        background-image: linear-gradient(to right, ${({ theme }) => `${useColorVariation(theme.colors.grey, [6, 15, 3])}, ${theme.colors.grey}`});
        border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
        border-right: solid 8px ${({ theme }) => theme.colors.fluorescent};
        cursor: pointer;
    }

    ${(props) =>
        props.$selected &&
        css`
            background-color: ${({ theme }) => theme.colors.green};
            border-bottom: solid 1px ${({ theme }) => theme.colors.green};
            border-top: 1px solid ${({ theme }) => useColorVariation(theme.colors.tertiary, [-5, -14, -18])};
            border-right: solid 8px ${({ theme }) => theme.colors.green};
        `}
`;

export default function LeftBarSubitem(props: LeftBarSubitens): JSX.Element {
    return (
        <LeftBarSubitemStyle $selected={props.active}>
            <p>{props.title}</p>
        </LeftBarSubitemStyle>
    );
}
