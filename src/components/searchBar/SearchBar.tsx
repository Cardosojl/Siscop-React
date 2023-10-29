import React, { useEffect, useRef, useState } from 'react';
import './SearchBar.css';
import searchImg from './images/lupa2.png';
import { handleSearch, handleSearchOptions } from './SearchBarFunctions';
import { SearchBarType } from 'src/config/types/types';

export default function SearchBar({ setFilter, path, optionValues, apiValues }: SearchBarType): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const filterRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        setFilter(handleSearch(search, filterRef));
    }, [search]);

    useEffect(() => {
        setSearch('');
    }, [path]);

    return (
        <div className="SearchBar">
            <select className="SearchBar__select" ref={filterRef}>
                {handleSearchOptions(optionValues, apiValues)}
            </select>
            <span className="SearchBar__itens">
                <input className="SearchBar__input" type="text" value={`${search}`} onChange={(e) => setSearch(e.target.value)} />
                <img src={searchImg} className="SearchBar__image" />
            </span>
        </div>
    );
}
