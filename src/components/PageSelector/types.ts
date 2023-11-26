import { FilterTypes } from 'src/apis/types';

export type PageSelectorTypes = {
    path: string;
    setChangePage: CallableFunction;
    index: number;
    limit: number;
    filter: FilterTypes | null;
    listener: boolean;
};
