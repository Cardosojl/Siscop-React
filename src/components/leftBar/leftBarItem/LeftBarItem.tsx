import React, { useEffect, useState } from 'react';
import { LeftBarItens, SimpleView } from 'src/config/types/types';
import arrow from '../images/leftbararrow.png';
import '../LeftBar.css';
import { iconRotate } from '../leftBarFunction';
import { handleLeftBarBody } from './LeftBarItemFunction';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import { connect } from 'react-redux';

function LeftBarItem({ user, title, itemLevel, active, children }: LeftBarItens & SimpleView): JSX.Element {
    const activeItem = useState(false);
    const [itemActive, setItemActive] = activeItem;
    const arrowDirection = itemActive ? 'LeftBar__arrow--up' : 'LeftBar__arrow--down';
    const [arrowRotate, setArrowRotate] = useState<string>(arrowDirection);
    const [style, setStyle] = useState('');

    useEffect(() => {
        setItemActive(active);
    }, []);

    useEffect(() => {
        setArrowRotate(iconRotate(itemActive));
        setStyle(!subitens && active ? 'LeftBar__itens--selected' : '');
    }, [itemActive, active]);

    const subitens = children ? <img className={arrowRotate} src={arrow} /> : '';
    return <div>{handleLeftBarBody(user, itemLevel, children, arrowRotate, style, title, activeItem)}</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftBarItem);
