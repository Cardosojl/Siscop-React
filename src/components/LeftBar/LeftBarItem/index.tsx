import React, { useContext, useEffect, useState } from 'react';
import arrow from '../../../assets/leftbararrow.png';
import DataContext from 'src/data/DataContext';
import { LeftBarItemProps, PositionTypes } from './types';
import { LeftBarImageStyle, LeftBarItemStyle } from './LeftBarItem.styles';

export function LeftBarItem({ title, active, itemLevel, children, onClick }: LeftBarItemProps): JSX.Element {
    const { user } = useContext(DataContext);
    const [position, setPosition] = useState<PositionTypes>('down');
    const [background, setBackground] = useState<boolean>(false);

    useEffect(() => {
        if (active) {
            if (children) {
                setPosition('up');
            } else {
                setBackground(true);
            }
        } else {
            if (children) {
                setPosition('down');
            } else {
                setBackground(false);
            }
        }
    }, [active]);

    if (!itemLevel || itemLevel <= (user.level as number))
        return (
            <>
                <LeftBarItemStyle $green={background} onClick={onClick}>
                    <p>{title}</p>
                    {children ? <LeftBarImageStyle $position={position} src={arrow} /> : null}
                </LeftBarItemStyle>
                {children && active ? children : ''}
            </>
        );
    else return <></>;
}
