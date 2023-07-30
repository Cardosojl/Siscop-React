import React from 'react';
import './IndexSelectors.css';
import { Year } from 'src/config/types/types';

export function IndexSelectors({ index, setFilter }: { index: Year[] | null; setFilter: CallableFunction }): JSX.Element {
    const selectors = index
        ? index.map((element, key) => (
              <div className="IndexSelectors__selector" onClick={() => setFilter({ year: element.year })} key={key}>
                  <p className="IndexSelectors__text">{element.year}</p>
              </div>
          ))
        : null;

    return <div className="IndexSelectors">{selectors}</div>;
}
