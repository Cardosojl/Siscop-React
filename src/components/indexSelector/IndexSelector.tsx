import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ObjFilter } from 'src/config/types/types';

type SelectorProps = {
    $selected?: boolean;
};

const SelectorDiv = styled.div<SelectorProps>`
    display: inline-block;
    cursor: pointer;
    background-color: ${({ theme, $selected }) => ($selected ? theme.colors.lightGray : theme.colors.gray)};
    margin-left: 15px;
    margin-bottom: 10px;
    padding: 1px 5px 1px 5px;
    border-right: solid 12px ${({ theme, $selected }) => ($selected ? theme.colors.fluorescent : theme.colors.darkGray)};
    min-width: 75px;
    height: 35px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.lightGray};
        border-right: solid 12px ${({ theme }) => theme.colors.darkFluorescent};
    }
`;

const SelctorText = styled.p`
    color: ${({ theme }) => theme.colors.primaryText};
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
