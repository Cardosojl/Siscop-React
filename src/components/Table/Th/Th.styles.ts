import styled from 'styled-components';
import { ElementTableProps } from '../types';

export const ThStyle = styled.th<ElementTableProps>`
    padding-left: 15px;
    padding-right: 15px;
    flex: 0 0 auto;
    width: ${(props) => `${(props.$size || 1) * 8.333333333}%`};
`;
