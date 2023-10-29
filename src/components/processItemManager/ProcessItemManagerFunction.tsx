import React from 'react';
import { Link } from 'react-router-dom';
import { Process } from 'src/config/types/types';
import { StatusBlockSmall } from '../statusBlockSmall/StatusBlockSmall';

function generateContent(element: Process) {
    return (
        <tr>
            <td className="col-4">
                <Link to={`/acompanharProcessos/processo/${element._id}`} className="Table__link">
                    <p className="Table__textP">{element.title}</p>
                    <small>inicio: {element.date}</small>
                </Link>
            </td>
            <td className="col-4">
                <small>{element.category}</small>
            </td>
            <td className="col-4">
                <StatusBlockSmall processState={element.processstates[0]} />
            </td>
        </tr>
    );
}

function generateLoading() {
    return (
        <tr className="Table__tr--load">
            <td colSpan={4}>
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </td>
        </tr>
    );
}

export function generateBody(element: Process | undefined) {
    if (element) return generateContent(element);
    else return generateLoading();
}
