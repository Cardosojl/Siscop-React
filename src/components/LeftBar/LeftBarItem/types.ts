import { MouseEventHandler, ReactNode } from 'react';

export type PositionTypes = 'up' | 'down';

export type LeftBarImageProps = {
    $position: PositionTypes;
};

export type LeftBarItemStyleProps = {
    $green?: boolean;
};

export type LeftBarItemProps = {
    title: string;
    children?: ReactNode;
    itemLevel?: number;
    active: boolean;
    onClick?: MouseEventHandler;
};
