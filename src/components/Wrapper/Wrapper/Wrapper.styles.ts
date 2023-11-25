import styled from 'styled-components';
import { WrapperStyleProps } from './types';

export const WrapperStyle = styled.div<WrapperStyleProps>`
    background-color: ${({ theme, $backgroundColor }) => ($backgroundColor ? theme.colors[$backgroundColor] : '')};
    align-items: ${(props) => props.$aling};
    display: ${(props) => (props.$displayFlex ? 'flex' : '')};
    position: ${(props) => props.$position};
    justify-content: ${(props) => props.$displayFlex};
    padding-top: ${(props) => props.$paddingTop};
    padding-bottom: ${(props) => props.$paddingBottom};
    padding-left: ${(props) => props.$paddingLeft};
    padding-right: ${(props) => props.$paddingRight};
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    & > * {
        padding-right: ${(props) => props.$spaceRight};
    }
`;
