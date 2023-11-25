import React, { MouseEvent } from 'react';
import { ButtonsErrorStyle, PageStyle, TitleErrorStyle, WrapperErrorStyle } from './ErrorPage.styles';
import { ErroPageProps } from './types';

export default function ErrorPage({ error }: ErroPageProps): JSX.Element {
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
            <WrapperErrorStyle>
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
