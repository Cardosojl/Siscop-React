import React from 'react';
import { ButtonProps } from '../types';
import { Link } from 'react-router-dom';
import { ImgButtonStyle, RoundButtonStyle } from './RoundButton.styles';
import { RoundButtonProps } from './types';

export function RoundButton(props: RoundButtonProps & ButtonProps): JSX.Element {
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
