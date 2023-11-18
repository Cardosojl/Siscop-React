import styled, { css } from 'styled-components';

type ImageIconProps = {
    $red?: boolean;
    $yellow?: boolean;
    $green?: boolean;
    $width: string;
};

export const ImageIcon = styled.img<ImageIconProps>`
    margin-top: -5px;
    width: ${(props) => props.$width};
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.disable};
    border: 0px;
    border-radius: 3px;
    margin: 10px;

    ${(props) =>
        props.$yellow &&
        css`
            background-color: ${({ theme }) => theme.colors.yellow};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightYellow};
            }
        `}

    ${(props) =>
        props.$red &&
        css`
            background-color: ${({ theme }) => theme.colors.red};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightRed};
            }
        `}

        ${(props) =>
        props.$green &&
        css`
            background-color: ${({ theme }) => theme.colors.green};
            &:hover {
                background-color: ${({ theme }) => theme.colors.lightGreen};
            }
        `}
`;
