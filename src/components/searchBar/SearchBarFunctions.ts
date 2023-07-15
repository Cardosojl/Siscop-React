import { ObjFilter, Searcher } from 'src/config/types/types';

export function handleSearch(search: string, filterRef: React.MutableRefObject<HTMLSelectElement | null>): ObjFilter | null {
    const filter: ObjFilter = {};
    if (filterRef.current && filterRef.current.value && search) {
        filter[filterRef.current.value as keyof Searcher] = search;
        return filter;
    } else return null;
}
