import { ObjFilter } from 'src/config/types/types';
import { FilterTypes } from './types';

export function handleSearch(search: string, filterRef: FilterTypes): ObjFilter | null {
    if (filterRef && search) {
        const filter: ObjFilter = { [filterRef.filter]: search };
        return filter;
    } else return null;
}
