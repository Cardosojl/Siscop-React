import styled from 'styled-components';
import { theme } from 'src/styles/Theme';

const { colors } = theme;

type BackgroundColors = keyof typeof colors;

type WrapperProps = {
    $backgroundColor?: BackgroundColors;
    $spaceRight?: string;
    $aling?: 'baseline' | 'center' | 'end';
    $position?: 'relative' | 'fixed' | 'static' | 'sticky' | 'absolute';
    $paddingTop?: string;
    $paddingBottom?: string;
    $paddingLeft?: string;
    $paddingRight?: string;
    width?: string;
    height?: string;
    $displayFlex?: 'space-between' | 'flex-start' | 'flex-end' | 'space-around';
};

export const Wrapper = styled.div<WrapperProps>`
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
