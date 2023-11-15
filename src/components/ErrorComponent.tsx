import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { Wrapper } from './Wrapper';

const PageStyle = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    background-image: url(${require('../assets/errorBackground.png')});
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-position: bottom -70px right 15px;
`;

const TitleErrorStyle = styled.h4`
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
    font-weight: bolder;
    padding-top: 70px;
    font-size: 50px;
`;

const WrapperErrorStyle = styled(Wrapper)`
    justify-content: center;
`;

const ButtonsErrorStyle = styled(Button)`
    padding: 15px;
    font-weight: bolder;
    font-size: 20px;
`;

export default function ErrorComponent({ error }: { error: Error }): JSX.Element {
    const handleEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.reload();
    };

    const handleHome = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.href = '/caixaDeEntrada/0';
    };

    return (
        <PageStyle>
            <TitleErrorStyle>Error: {error.message}</TitleErrorStyle>
            <WrapperErrorStyle $paddingTop="100px" $displayFlex="flex-start">
                <ButtonsErrorStyle $red onClick={handleEvent}>
                    Tentar de Novo
                </ButtonsErrorStyle>
                <ButtonsErrorStyle $blue onClick={handleHome}>
                    Página Inicial
                </ButtonsErrorStyle>
            </WrapperErrorStyle>
        </PageStyle>
    );
}
