import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderStyle = styled.div`
    padding-top: 10px;
    background-color: ${({ theme }) => theme.colors.tertiary};
    background-repeat: repeat-x;
    background-size: auto;
    min-width: 100vw;
    display: flex;
    justify-content: space-between;
`;

export const LogoStyle = styled(Link)`
    margin-left: 25px;
    text-decoration: none;
`;

export const ImgStyle = styled.img`
    width: 60px;
    padding-bottom: 20px;
`;

export const H3Style = styled.h3`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-weight: bolder;
    margin-left: 10px;
    font-size: 19px;
`;
