import styled from 'styled-components';
import { SelectorProps } from './types';

export const SelectorDiv = styled.div<SelectorProps>`
    display: inline-block;
    cursor: pointer;
    background-color: ${({ theme, $selected }) => ($selected ? theme.colors.lightGray : theme.colors.gray)};
    margin-left: 15px;
    margin-bottom: 10px;
    padding: 1px 5px 1px 5px;
    border-right: solid 12px ${({ theme, $selected }) => ($selected ? theme.colors.fluorescent : theme.colors.darkGray)};
    min-width: 75px;
    height: 35px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.lightGray};
        border-right: solid 12px ${({ theme }) => theme.colors.darkFluorescent};
    }
`;

export const SelctorText = styled.p`
    color: ${({ theme }) => theme.colors.primaryText};
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
`;
