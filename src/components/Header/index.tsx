import React, { useContext } from 'react';
import { H3Style, HeaderStyle, ImgStyle, LogoStyle } from './Header.styles';
import { Wrapper } from '../Wrapper/Wrapper/index';
import logo from '../../assets/logo.png';
import DataContext from 'src/data/DataContext';
import { UserInfo } from './UserInfo';

export function Header(): JSX.Element {
    const { user } = useContext(DataContext);
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
