import { FilterTypes } from 'src/apis/types';
import { StringFilterTypes } from './types';

export function handleSearch(search: string, filterRef: StringFilterTypes): FilterTypes | null {
    if (filterRef && search) {
        const filter: FilterTypes = { [filterRef.filter]: search };
        return filter;
    } else return null;
}
