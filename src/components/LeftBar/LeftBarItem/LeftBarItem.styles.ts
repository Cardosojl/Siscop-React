import styled, { css } from 'styled-components';
import useColorVariation from 'src/hooks/useColorVariation';
import { LeftBarImageProps, LeftBarItemStyleProps } from './types';

export const LeftBarItemStyle = styled.div<LeftBarItemStyleProps>`
    padding-left: 15px;
    font-size: 12px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: bold;
    border-bottom: 1px solid ${({ theme }) => useColorVariation(theme.colors.secondary, [-9, -12, -12])};
    position: relative;
    cursor: pointer;

    ${(props) =>
        props.$green &&
        css`
            background-image: linear-gradient(to right, ${({ theme }) => `${theme.colors.green}, ${useColorVariation(theme.colors.green, [-22, -27, -13])}`});
            border-bottom: 1px solid ${({ theme }) => useColorVariation(theme.colors.green, [-22, -27, -13])};
        `}
`;

export const LeftBarImageStyle = styled.img<LeftBarImageProps>`
    margin-bottom: -5px;
    width: 25px;
    position: absolute;
    right: 25px;
    top: 30px;

    ${(props) =>
        props.$position == 'up' &&
        css`
            animation: rotate 0.15s 1 linear;
            animation-fill-mode: forwards;

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(180deg);
                }
            }
        `}
    ${(props) =>
        props.$position == 'down' &&
        css`
            animation: rotatedown 0.15s 1 linear;
            animation-fill-mode: forwards;

            @keyframes rotatedown {
                0% {
                    transform: rotate(180deg);
                }
                100% {
                    transform: rotate(0deg);
                }
            }
        `}
`;
