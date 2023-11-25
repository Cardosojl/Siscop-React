import React, { useEffect, useState } from 'react';
import { SelctorText, SelectorDiv } from './IndexSelector.styles';
import { IndexSelectorProps } from './types';

export function IndexSelector({ index, value, setFilter, filter }: IndexSelectorProps): JSX.Element {
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
