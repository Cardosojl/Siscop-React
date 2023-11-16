import React from 'react';
import { Process } from 'src/config/types/types';
import { StatusBlockSmall } from '../StatusBlockSmall';
import { Td, Tr } from '../Table';
import { LinkStyled } from '../LinkStyled';

function generateContent(element: Process) {
    return (
        <Tr>
            <Td $size={5}>
                <LinkStyled to={`/acompanharProcessos/processo/${element._id}`}>
                    <p>{element.title}</p>
                    <small>inicio: {element.date}</small>
                </LinkStyled>
            </Td>
            <Td $size={5}>
                <small>{element.category}</small>
            </Td>
            <Td $size={2}>
                <StatusBlockSmall processState={element.processstates[0]} />
            </Td>
        </Tr>
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
