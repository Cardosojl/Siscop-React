import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from './Button';
import { Link } from 'react-router-dom';

const RoundButtonStyle = styled(Button)`
    border-radius: 18px;
    padding: 5px;
`;

const ImgButtonStyle = styled.img`
    width: 22px;
`;

export function RoundButton(props: { src: string; onClick?: MouseEventHandler; link?: string } & ButtonProps): JSX.Element {
    const { src, onClick, link, ...buttonProps } = props;
    return (
        <RoundButtonStyle {...buttonProps} onClick={onClick}>
            {link ? (
                <Link to={link}>
                    <ImgButtonStyle src={src} />
                </Link>
            ) : (
                <ImgButtonStyle src={src} />
            )}
        </RoundButtonStyle>
    );
}
