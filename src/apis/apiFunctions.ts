import { ObjFilter } from 'src/config/types/types';

export function ObjectToQueryString(object: ObjFilter): string {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const queryString = values.map((element, index) => `${keys[index]}=${element}&`).join('');
    return queryString;
}
