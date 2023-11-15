import React from 'react';
import styled, { css } from 'styled-components';
import { TableType } from 'src/config/types/types';

type ElementsTableProps = {
    $size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    $delete?: boolean;
    $edit?: boolean;
};

const DivStyle = styled.div`
    overflow-x: auto;
`;

const HeadStyle = styled.thead`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 12px;
    height: 40px;
    font-weight: 400;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const TableStyle = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

export const Tr = styled.tr<ElementsTableProps>`
    flex: 1;
    &:hover {
        background-color: rgba(0, 0, 0, 0.075);
    }

    ${(props) =>
        props.$edit &&
        css`
            transition: 0.4s;
            color: ${({ theme }) => theme.colors.primaryText};
            font-weight: bold;
            background-color: ${({ theme }) => theme.colors.lightsuccessBackground};
            &:hover {
                background-color: ${({ theme }) => theme.colors.successBackground};
            }
        `}

    ${(props) =>
        props.$delete &&
        css`
            transition: 0.4s;
            color: ${({ theme }) => theme.colors.primaryText};
            font-weight: bold;
            background-color: ${({ theme }) => theme.colors.lightdangerBackground};
            &:hover {
                background-color: ${({ theme }) => theme.colors.dangerBackground};
            }
        `}
`;

export const Th = styled.th<ElementsTableProps>`
    padding-left: 15px;
    padding-right: 15px;
    flex: 0 0 auto;
    width: ${(props) => `${(props.$size || 1) * 8.333333333}%`};
`;

export const Td = styled.td<ElementsTableProps>`
    font-size: 13px;
    padding-left: 15px;
    padding-right: 15px;
    flex: 0 0 auto;
    width: ${(props) => `${(props.$size || 1) * 8.333333333}%`};
    padding-top: 20px;
    padding-bottom: 10px;
`;

export default function Table({ table }: { table: TableType }): JSX.Element {
    return (
        <DivStyle>
            <TableStyle>
                <HeadStyle>{table.head}</HeadStyle>
                {table.body}
            </TableStyle>
        </DivStyle>
    );
}
