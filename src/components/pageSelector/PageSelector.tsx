import React, { useContext, useEffect, useState } from 'react';
import right from '../../assets/seta.png';
import left from '../../assets/seta2.png';
import { PageSelectorType } from 'src/config/types/types';
import useAsyncError from '../../hooks/useAsyncError';
import { leftArrowActive, handleApiLength, rightArrowActive, handleErros } from './PageSelectorFunction';
import { Wrapper } from '../Wrapper';
import { RoundButton } from '../RoundButton';
import DataContext from 'src/data/DataContext';

function PageSelector({ path, setChangePage, index, limit, filter, listener }: PageSelectorType): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [indexPage, setIndexPage] = useState<number>(1);
    const [length, setLength] = useState<number>(0);
    const [leftD, setLeftD] = useState<boolean>(true);
    const [rightD, setRightD] = useState<boolean>(true);
    const back = () => (leftD ? setChangePage(index - 1) : null);
    const next = () => (rightD ? setChangePage(index + 1) : null);
    const throwError = useAsyncError();

    useEffect(() => {
        setIndexPage(index + 1);
    }, [index]);

    useEffect(() => {
        handleApiLength(path, user, filter)
            .then((data) => {
                setLength(data);
                setLeftD(leftArrowActive(indexPage));
            })
            .catch((error) => handleErros(error, setUser, throwError, setLength));
    }, [indexPage, path, filter, listener]);

    useEffect(() => {
        setRightD(rightArrowActive(indexPage, limit, length));
    }, [length, indexPage, path, filter, listener]);

    return (
        <Wrapper $displayFlex="space-around" $aling="baseline">
            <RoundButton $green={leftD} src={left} onClick={back} />
            <p>{indexPage}</p>
            <RoundButton $green={rightD} src={right} onClick={next} />
        </Wrapper>
    );
}

export default PageSelector;
