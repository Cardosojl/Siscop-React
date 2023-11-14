import styled, { css } from 'styled-components';

type ImageIconProps = {
    $red?: boolean;
    $yellow?: boolean;
};

export const ImageIcon = styled.img<ImageIconProps>`
    margin-top: -5px;
    height: 28px;
    width: 28px;
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
`;
