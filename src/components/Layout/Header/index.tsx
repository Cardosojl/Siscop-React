import React, { useContext } from 'react';
import { H3Style, HeaderStyle, ImgStyle, LogoStyle } from './Header.styles';
import { Wrapper } from '../../Wrapper/Wrapper/index';
import logo from 'src/assets/logo.png';
import UserContext from 'src/context/UserContext';
import { UserInfo } from './UserInfo';

export function Header(): JSX.Element {
    const { user } = useContext(UserContext);
    const logged = user.logged ? <UserInfo /> : '';
    return (
        <HeaderStyle>
            <LogoStyle to="/" className="">
                <Wrapper $displayFlex="flex-start">
                    <ImgStyle src={logo} alt="logo" className=" Header__logo" />
                    <H3Style>SisCoP</H3Style>
                </Wrapper>
            </LogoStyle>
            {logged}
        </HeaderStyle>
    );
}
