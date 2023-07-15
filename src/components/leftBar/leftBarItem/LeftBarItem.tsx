import React, { useEffect, useState } from 'react';
import { LeftBarItens } from 'src/config/types/types';
import arrow from '../images/leftbararrow.png';
import '../LeftBar.css';
import { iconRotate, showSubitens } from '../leftBarFunction';

export default function LeftBarItem({ title, itemLevel, active, children }: LeftBarItens): JSX.Element {
    //Fazer a lógica de item level para o level dos usuários
    const [itemActive, setItemActive] = useState(false);
    const arrowDirection = itemActive ? 'LeftBar__arrow--up' : 'LeftBar__arrow--down';
    const [arrowRotate, setArrowRotate] = useState<string>(arrowDirection);

    useEffect(() => {
        setItemActive(active);
    }, []);

    useEffect(() => {
        setArrowRotate(iconRotate(itemActive));
    }, [itemActive, active]);

    const subitens = children ? <img className={arrowRotate} src={arrow} /> : '';
    return (
        <div>
            <div className="LeftBar__itens" onClick={() => setItemActive(!itemActive)}>
                <p className={`ps-4 pt-4 pb-2`}>
                    {title} {subitens}
                </p>
            </div>
            <div className={showSubitens(itemActive)}>{children}</div>
        </div>
    );
}
