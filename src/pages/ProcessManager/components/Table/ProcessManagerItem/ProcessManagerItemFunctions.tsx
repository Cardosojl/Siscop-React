import React from 'react';
import { ProcessTypes } from 'src/apis/types';
import { StatusBlockSmall } from 'src/components/StatusBlock/StatusBlockSmall';
import { Tr } from 'src/components/Table/Tr';
import { Td } from 'src/components/Table/Td';
import { LinkStyled } from 'src/components/Link/LinkStyled';

function generateContent(element: ProcessTypes) {
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

export function generateBody(element: ProcessTypes | undefined) {
    if (element) return generateContent(element);
    else return generateLoading();
}
