import React from 'react';
import { WindowStyle } from './Window.styles';
import { WindowProps } from './types';

export function Window({ $login, $small, $medium, $large, children }: WindowProps): JSX.Element {
    const props = { $login, $small, $medium, $large };
    return <WindowStyle {...props}>{children}</WindowStyle>;
}
