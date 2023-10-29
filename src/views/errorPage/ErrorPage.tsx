import React, { MouseEvent } from 'react';
import './ErrorPage.css';

export default function ErrorPage(props: { error: Error }): JSX.Element {
    const handleEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.reload();
    };

    const handleHome = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.href = '/caixaDeEntrada/0';
    };

    return (
        <div className="ErrorPage">
            <h4 className="ErrorPage__text">Error: {props.error.message}</h4>
            <div className="ErrorPage__buttons">
                <button className="Button--red ErrorPage__button" onClick={handleEvent}>
                    Tentar de novo
                </button>

                <button className="Button--blue ErrorPage__button" onClick={handleHome}>
                    Página inicial
                </button>
            </div>
        </div>
    );
}
