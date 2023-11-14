import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ObjFilter } from 'src/config/types/types';

type SelectorProps = {
    $selected?: boolean;
};

const SelectorDiv = styled.div<SelectorProps>`
    display: inline-block;
    cursor: pointer;
    background-color: ${(props) => (props.$selected ? 'rgb(223, 223, 223)' : 'rgb(212, 212, 212)')};
    margin-left: 15px;
    margin-bottom: 10px;
    padding: 1px 5px 1px 5px;
    border-right: solid 12px ${(props) => (props.$selected ? 'rgb(168, 216, 113)' : 'rgb(141, 141, 141)')};
    min-width: 75px;
    height: 35px;

    &:hover {
        background-color: rgb(223, 223, 223);
        border-right: solid 12px rgb(166, 233, 127);
    }
`;

const SelctorText = styled.p`
    color: rgb(105, 105, 105);
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
`;

export function IndexSelector({ index, value, setFilter, filter }: { index: string; value: string; setFilter: CallableFunction; filter: ObjFilter }): JSX.Element {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (value === Object.values(filter)[0]) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [filter]);

    return (
        <SelectorDiv $selected={selected} onClick={() => setFilter({ [Object.keys(filter)[0]]: value })}>
            <SelctorText>{index}</SelctorText>
        </SelectorDiv>
    );
}
