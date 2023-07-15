import React from 'react';
import './ErrorPage.css';

export default function ErrorPage(props: { error: Error }): JSX.Element {
    return (
        <div className="ErrorPage">
            <h4 className="ErrorPage__text">Error: {props.error.message}</h4>
            <div>
                <button>Tentar de novo</button>
                <button>Página inicial</button>
            </div>
        </div>
    );
}
