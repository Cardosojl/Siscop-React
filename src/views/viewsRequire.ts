import { ObjFilter } from 'src/config/types/types';

export function ObjectToQueryString(object: ObjFilter): string {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const queryString = values.map((element, index) => `${keys[index]}=${element}&`).join('');
    return queryString;
}

function generateUrlRequest(path: string, includes: string[] | number, parameters: ObjFilter, filter?: ObjFilter | null) {
    const queryParameters = parameters ? ObjectToQueryString(parameters) : '';
    const queryFilter = filter && filter !== null ? ObjectToQueryString(filter) : '';
    const population = typeof includes === 'number' ? '' : includes.map((element, index) => `include[${index}]=${element}&`).join('');
    const url = `/${path}?${population}&${queryParameters}${queryFilter}`;
    return url;
}
