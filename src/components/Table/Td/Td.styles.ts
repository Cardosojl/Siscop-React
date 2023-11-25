import styled from 'styled-components';
import { ElementTableProps } from '../types';

export const TdStyle = styled.td<ElementTableProps>`
    font-size: 13px;
    padding-left: 15px;
    padding-right: 15px;
    flex: 0 0 auto;
    width: ${(props) => `${(props.$size || 1) * 8.333333333}%`};
    padding-top: 20px;
    padding-bottom: 10px;
`;
