import styled, { css } from 'styled-components';

export const DivStyle = styled.div`
    overflow-x: auto;
`;

export const HeadStyle = styled.thead`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 12px;
    height: 40px;
    font-weight: 400;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const TableStyle = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;
