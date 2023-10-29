import React, { ReactNode } from 'react';
import arrow from '../images/leftbararrow.png';
import { showSubitens } from '../leftBarFunction';
import { User } from 'src/config/types/types';

function generateLeftBar(children: ReactNode, arrowRotate: string, style: string, title: string, setItemActive: CallableFunction, itemActive: boolean) {
    const subitens = children ? <img className={arrowRotate} src={arrow} /> : '';
    return (
        <div>
            <div className={`LeftBar__itens ${style}`} onClick={() => setItemActive(!itemActive)}>
                <p className={`ps-4 pt-4 pb-2`}>
                    {title} {subitens}
                </p>
            </div>
            <div className={showSubitens(itemActive)}>{children}</div>
        </div>
    );
}

export function handleLeftBarBody(user: User, level: string | number, children: ReactNode, arrowRotate: string, style: string, title: string, activeItem: [boolean, CallableFunction]) {
    const [itemActive, setItemActive] = activeItem;
    if (level === user.level || user.level > level) {
        return generateLeftBar(children, arrowRotate, style, title, setItemActive, itemActive);
    } else return '';
}
