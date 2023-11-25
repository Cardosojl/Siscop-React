import { ReactNode } from 'react';

export type ElementTableProps = {
    $size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    $delete?: boolean;
    $edit?: boolean;
};

export type TableProps = {
    head: ReactNode | null;
    body: ReactNode | null;
};

export type TableItemProps<T> = {
    element: T;
    setRefresh: CallableFunction;
    href?: string;
    path?: string;
};

export type TdProps = ElementTableProps & {
    colSpan?: number;
    children: ReactNode;
};

export type ThProps = ElementTableProps & {
    children: ReactNode;
};

export type TrProps = ElementTableProps & {
    children: ReactNode;
};
