import { FilterTypes } from 'src/apis/types';

export function ObjectToQueryString(object: FilterTypes): string {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const queryString = values.map((element, index) => `${keys[index]}=${element}&`).join('');
    return queryString;
}

export function generateIndexRequest(baseUrl: string, limit: number, index: number, includes: string[] | number, parameters?: FilterTypes, filter?: FilterTypes | null): string {
    const population = typeof includes === 'number' ? '' : includes.map((element, index) => `include[${index}]=${element}&`).join('');
    const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
    const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
    const url = `/${baseUrl}?${population}limit=${limit}&page=${index}&${queryParameters}${queryFilter}`;
    return url;
}

export function generateShowRequest(baseUrl: string, includes: string[] | number, parameters: FilterTypes, filter?: FilterTypes | null): string {
    const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
    const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
    const population = typeof includes === 'number' ? '' : includes.map((element, index) => `include[${index}]=${element}&`).join('');
    const url = `/${baseUrl}?${population}&${queryParameters}${queryFilter}`;
    return url;
}
