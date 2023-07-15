import React from 'react';
import './IndexSelectors.css';

export function IndexSelectors({ index, setFilter }: { index: string[] | null; setFilter: CallableFunction }): JSX.Element {
    const selectors = index
        ? index.map((element, key) => (
              <div className="IndexSelectors__selector" onClick={() => setFilter({ year: element })} key={key}>
                  <p className="IndexSelectors__text">{element}</p>
              </div>
          ))
        : null;

    return <div className="IndexSelectors">{selectors}</div>;
}
