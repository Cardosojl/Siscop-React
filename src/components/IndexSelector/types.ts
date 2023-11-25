import { ObjFilter } from 'src/config/types/types';

export type SelectorProps = {
    $selected?: boolean;
};

export type IndexSelectorProps = {
    index: string;
    value: string;
    setFilter: CallableFunction;
    filter: ObjFilter;
};
