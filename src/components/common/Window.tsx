import styled, { css } from 'styled-components';

type WindowProps = {
    $login?: boolean;
    $small?: boolean;
    $medium?: boolean;
    $large?: boolean;
};

const sizes = [
    `@media (max-width: 1450px) { 
    width: 1000px;
}`,
    `

@media (max-width: 1300px) {
    width: 900px;
}`,

    `@media (max-width: 1200px) {
    width: 700px;
}`,

    `@media (max-width: 1000px) {
    width: 600px;
}`,

    `@media (max-width: 900px) {
    width: 500px;
}`,
];

export const Window = styled.div<WindowProps>`
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 0px 0px 20px 0px;
    height: fit-content;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    min-height: 180px;
    box-shadow: 6px 6px 10px 1px ${({ theme }) => theme.colors.darkness};
    padding-bottom: 20px;
    color: ${({ theme }) => theme.colors.primaryText};

    ${(props) =>
        props.$large &&
        css`
            width: 1170px;
            ${sizes.join('')}
        `}
    ${(props) =>
        props.$medium &&
        css`
            width: 770px;
            ${sizes.slice(2).join('')}
        `}

    ${(props) =>
        props.$small &&
        css`
            width: 570px;
            ${sizes[4]}
        `}

    ${(props) =>
        props.$login &&
        css`
            padding: 0px 0px 10px 0px;
            width: 500px;
            label {
                font-size: 15px;
            }
            button {
                margin-top: -10px;
            }
            ${sizes[4]}
        `}
`;
