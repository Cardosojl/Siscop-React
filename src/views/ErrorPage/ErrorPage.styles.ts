import styled from 'styled-components';
import { ButtonStyle } from 'src/components/Button/Button.styles';

export const PageStyle = styled.div`
    margin-right: auto;
    margin-left: auto;
    background-color: ${({ theme }) => theme.colors.background};
    background-image: url(${require('../../assets/errorBackground.png')});
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-position: bottom -70px right 15px;
`;

export const TitleErrorStyle = styled.h4`
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
    font-weight: bolder;
    padding-top: 100px;
    font-size: 50px;
`;

export const WrapperErrorStyle = styled.div`
    padding-top: 100px;
    display: flex;
    justify-content: center;
`;

export const ButtonsErrorStyle = styled(ButtonStyle)`
    padding: 15px;
    font-weight: bolder;
    font-size: 20px;
`;
