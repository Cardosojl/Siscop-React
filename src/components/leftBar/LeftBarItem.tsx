import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import arrow from '../../assets/leftbararrow.png';
import { SimpleView } from 'src/config/types/types';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import useColorVariation from 'src/hooks/useColorVariation';

type PositionTypes = 'up' | 'down';

type LeftBarImageProps = {
    $position: PositionTypes;
};

type LeftBarItemProps = {
    $green?: boolean;
};

const LeftBarItemStyle = styled.div<LeftBarItemProps>`
    padding-left: 15px;
    font-size: 12px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: bold;
    border-bottom: 1px solid rgb(49, 49, 49);
    position: relative;
    cursor: pointer;

    ${(props) =>
        props.$green &&
        css`
            background-image: linear-gradient(to right, ${({ theme }) => `${theme.colors.green}, ${useColorVariation(theme.colors.green, [-22, -27, -13])}`});
            border-bottom: 1px solid ${({ theme }) => useColorVariation(theme.colors.green, [-22, -27, -13])};
        `}
`;

const LeftBarImageStyle = styled.img<LeftBarImageProps>`
    margin-bottom: -5px;
    width: 25px;
    position: absolute;
    right: 25px;
    top: 30px;

    ${(props) =>
        props.$position == 'up' &&
        css`
            animation: rotate 0.15s 1 linear;
            animation-fill-mode: forwards;

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(180deg);
                }
            }
        `}
    ${(props) =>
        props.$position == 'down' &&
        css`
            animation: rotatedown 0.15s 1 linear;
            animation-fill-mode: forwards;

            @keyframes rotatedown {
                0% {
                    transform: rotate(180deg);
                }
                100% {
                    transform: rotate(0deg);
                }
            }
        `}
`;

function LeftBarItem({
    user,
    title,
    active,
    itemLevel,
    children,
    onClick,
}: { title: string; children?: ReactNode; itemLevel?: number; active: boolean; onClick?: MouseEventHandler } & SimpleView): JSX.Element {
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftBarItem);
