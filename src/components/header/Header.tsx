import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import UserLogged from './UserLogged';
import { Wrapper } from '../Wrapper';
import DataContext from 'src/data/DataContext';

const HeaderStyle = styled.div`
    padding-top: 10px;
    background-color: ${({ theme }) => theme.colors.tertiary};
    background-repeat: repeat-x;
    background-size: auto;
    min-width: 100vw;
    display: flex;
    justify-content: space-between;
`;

const LinkStyle = styled(Link)`
    margin-left: 25px;
    text-decoration: none;
`;

const ImgStyle = styled.img`
    width: 60px;
    padding-bottom: 20px;
`;

const H3Style = styled.h3`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-weight: bolder;
    margin-left: 10px;
    font-size: 19px;
`;

function Header(): JSX.Element {
    const { user } = useContext(DataContext);
    const logged = user.logged ? <UserLogged /> : '';
    return (
        <HeaderStyle>
            <LinkStyle to="/" className="">
                <Wrapper $displayFlex="flex-start">
                    <ImgStyle src={logo} alt="logo" className=" Header__logo" />
                    <H3Style>SisCoP</H3Style>
                </Wrapper>
            </LinkStyle>
            {logged}
        </HeaderStyle>
    );
}

export default Header;
