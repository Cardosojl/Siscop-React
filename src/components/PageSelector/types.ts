import { ObjFilter } from 'src/config/types/types';

export type PageSelectorTypes = {
    path: string;
    setChangePage: CallableFunction;
    index: number;
    limit: number;
    filter: ObjFilter | null;
    listener: boolean;
};
