import { FilterTypes } from 'src/apis/types';

export type SelectorProps = {
    $selected?: boolean;
};

export type IndexSelectorProps = {
    index: string;
    value: string;
    setFilter: CallableFunction;
    filter: FilterTypes;
};
