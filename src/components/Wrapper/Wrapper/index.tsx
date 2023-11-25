import React from 'react';
import { WrapperStyle } from './Wrapper.styles';
import { WrapperProps } from './types';

export function Wrapper({
    $backgroundColor,
    $spaceRight,
    $aling,
    $position,
    $paddingTop,
    $paddingBottom,
    $paddingLeft,
    $paddingRight,
    width,
    height,
    $displayFlex,
    children,
}: WrapperProps): JSX.Element {
    const props = { $backgroundColor, $spaceRight, $aling, $position, $paddingTop, $paddingBottom, $paddingLeft, $paddingRight, width, height, $displayFlex };
    return <WrapperStyle {...props}>{children}</WrapperStyle>;
}
