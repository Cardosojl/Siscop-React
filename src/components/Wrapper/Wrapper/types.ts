import { ReactNode } from 'react';
import { theme } from 'src/styles/Theme';

type BackgroundColorsTypes = keyof typeof theme.colors;

export type WrapperStyleProps = {
    $backgroundColor?: BackgroundColorsTypes;
    $spaceRight?: string;
    $aling?: 'baseline' | 'center' | 'end';
    $position?: 'relative' | 'fixed' | 'static' | 'sticky' | 'absolute';
    $paddingTop?: string;
    $paddingBottom?: string;
    $paddingLeft?: string;
    $paddingRight?: string;
    width?: string;
    height?: string;
    $displayFlex?: 'space-between' | 'flex-start' | 'flex-end' | 'space-around';
};

export type WrapperProps = WrapperStyleProps & {
    children: ReactNode;
};
