import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import searchImg from '../../../assets/lupa2.png';
import { handleSearch, handleSearchOptions } from './SearchBarFunctions';
import { SearchBarType } from 'src/config/types/types';

const InputStyle = styled.input`
    font-size: 13px;
    border: none;

    &:focus {
        outline: none;
    }
`;

const SpanStyle = styled.span`
    margin-left: -5px;
    background-color: ${({ theme }) => theme.colors.inputBackground};
    padding-top: 1px;
    padding-bottom: 3px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
`;

const ImageStyle = styled.img`
    margin-bottom: -7px;
    height: 21px;
    margin-left: -12px;

    &:hover {
        filter: brightness(5);
        cursor: pointer;
    }
`;

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
        <div>
            <select ref={filterRef}>{handleSearchOptions(optionValues, apiValues)}</select>
            <SpanStyle>
                <InputStyle type="text" value={`${search}`} onChange={(e) => setSearch(e.target.value)} />
                <ImageStyle src={searchImg} />
            </SpanStyle>
        </div>
    );
}
