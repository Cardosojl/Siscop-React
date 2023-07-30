import React, { useEffect, useState } from 'react';
import right from './images/seta.png';
import left from './images/seta2.png';
import './PageSelector.css';
import { PageSelectorType } from 'src/config/types/types';
import { connect } from 'react-redux';
import useAsyncError from '../../hooks/useAsyncError/UseAsyncError';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { buttonActiveClass, leftArrowActive, handleApiLength, rightArrowActive, handleErros } from './PageSelectorFunction';

function PageSelector({ path, setChangePage, index, limit, user, filter, dispatchUser }: PageSelectorType): JSX.Element {
    const [indexPage, setIndexPage] = useState<number>(1);
    const [length, setLength] = useState<number>(0);
    const [leftD, setLeftD] = useState<boolean>(true);
    const [rightD, setRightD] = useState<boolean>(true);
    const throwError = useAsyncError();

    useEffect(() => {
        setIndexPage(index + 1);
    }, [index]);

    useEffect(() => {
        // eslint-disable-next-line prettier/prettier
        handleApiLength(path, user, filter).then((data) => {
                setLength(data);
                setLeftD(leftArrowActive(indexPage));
                // eslint-disable-next-line prettier/prettier
            }).catch((error) => handleErros(error, dispatchUser, throwError, setLength));
    }, [indexPage, path, filter]);

    useEffect(() => {
        setRightD(rightArrowActive(indexPage, limit, length));
    }, [length, indexPage, path, filter]);

    return (
        <div className="PageSelector">
            <button className={`${buttonActiveClass('left', indexPage, limit)} PageSelector__button`} onClick={() => setChangePage(index - 1)} disabled={leftD}>
                <img className="PageSelector__arrow" src={left} />
            </button>
            <p className="PageSelector__index">{indexPage}</p>
            <button
                className={`${buttonActiveClass('right', indexPage, limit, length)} PageSelector__button`}
                onClick={() => setChangePage(index + 1)}
                disabled={rightD}
            >
                <img className="PageSelector__arrow" src={right} />
            </button>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSelector);
