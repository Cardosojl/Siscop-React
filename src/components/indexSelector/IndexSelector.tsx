import React, { useEffect, useState } from 'react';
import './IndexSelector.css';
import { ObjFilter } from 'src/config/types/types';

// eslint-disable-next-line prettier/prettier
export function IndexSelector({ index, value, setFilter, filter }: { index: string; value: string; setFilter: CallableFunction; filter: ObjFilter }): JSX.Element {
    const [selected, setSelected] = useState('');

    useEffect(() => {
        setSelected(Object.values(filter)[0] as string);
    }, [filter]);

    const selectors =
        value === selected ? (
            <div className="IndexSelectors__selector__selected" onClick={() => setFilter({ [Object.keys(filter)[0]]: value })}>
                <p className="IndexSelectors__text">{index}</p>
            </div>
        ) : (
            <div className="IndexSelectors__selector" onClick={() => setFilter({ [Object.keys(filter)[0]]: value })}>
                <p className="IndexSelectors__text">{index}</p>
            </div>
        );

    return <div className="IndexSelectors">{selectors}</div>;
}
