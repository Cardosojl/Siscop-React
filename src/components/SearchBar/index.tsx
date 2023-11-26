import React, { ChangeEvent, useEffect, useState } from 'react';
import searchImg from '../../assets/lupa2.png';
import { handleSearch } from './SearchBarFunctions';
import { StringFilterTypes, SearchBarProps } from './types';
import { ImageStyle, InputStyle, SpanStyle } from './SearchBar.styles';
import { Select } from '../Select';
import { setInputs } from 'src/pages/PagesFunctions';

export function SearchBar({ setFilter, path, optionValues, apiValues }: SearchBarProps): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const [selectFilter, setSelectFilter] = useState<StringFilterTypes>({ filter: apiValues[0] });
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setSelectFilter);

    useEffect(() => {
        setFilter(handleSearch(search, selectFilter));
    }, [search]);

    useEffect(() => {
        setSearch('');
    }, [path]);

    return (
        <div>
            <Select name="filter" sort={false} onChange={handleInput} optionValues={optionValues} elementValue={optionValues[0]} alternativeValues={apiValues}></Select>
            <SpanStyle>
                <InputStyle type="text" value={`${search}`} onChange={(e) => setSearch(e.target.value)} />
                <ImageStyle src={searchImg} />
            </SpanStyle>
        </div>
    );
}
