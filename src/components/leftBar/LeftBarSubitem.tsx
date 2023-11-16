import React from 'react';
import styled, { css } from 'styled-components';
import { LeftBarSubitens } from 'src/config/types/types';

type LeftBarSubitemProps = {
    $selected: boolean;
};

const LeftBarSubitemStyle = styled.div<LeftBarSubitemProps>`
    font-size: 10px;
    padding-left: 15px;
    padding-top: 15px;
    background-size: 250px, auto;
    background-color: rgb(70, 74, 78);
    font-weight: bold;
    border-top: 1px solid rgb(76, 76, 77);
    border-bottom: 1px solid rgb(62, 63, 63);
    border-right: solid 8px rgb(133, 180, 57);
    border-radius: 0px 6px 6px 0px;

    &:hover {
        background-image: linear-gradient(to right, rgb(183, 190, 178), rgb(170, 173, 168));
        border-bottom: 1px solid rgb(170, 173, 168);
        border-right: solid 8px rgb(172, 211, 111);
        cursor: pointer;
    }

    ${(props) =>
        props.$selected &&
        css`
            background-color: rgb(133, 180, 57);
            border-bottom: solid 1px rgb(133, 180, 57);
            border-top: 1px solid rgb(63, 63, 65);
            border-right: solid 8px rgb(133, 180, 57);
        `}
`;

export default function LeftBarSubitem(props: LeftBarSubitens): JSX.Element {
    return (
        <LeftBarSubitemStyle $selected={props.active}>
            <p>{props.title}</p>
        </LeftBarSubitemStyle>
    );
}
