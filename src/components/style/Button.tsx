import styled from 'styled-components';

interface ButtonProps {
    background: 'green' | 'red' | 'yellow' | 'blue' | 'disable';
}

const backgroundColor = {
    green: 'rgb(131, 185, 43)',
    red: 'rgb(211, 58, 58)',
    yellow: 'rgb(202, 191, 30)',
    blue: 'rgb(45, 133, 216)',
    disable: 'rgb(160, 160, 160)',
};

const backgroundColorHover = {
    green: 'rgb(156, 221, 52)',
    red: 'rgb(241, 36, 36)',
    yellow: 'rgb(224, 222, 72)',
    blue: 'rgb(33, 163, 223)',
    disable: 'rgb(160, 160, 160)',
};

export const Button = styled.button<ButtonProps>`
    padding: 5px;
    background-color: ${(props) => backgroundColor[props.background]};
    border: 0px;
    border-radius: 3px;
    color: rgb(253, 253, 253);
    font-size: 12.5px;
    margin: 10px;
    width: fit-content;
    height: fit-content;
    text-decoration: none;

    &:hover {
        background-color: ${(props) => backgroundColorHover[props.background]};
        cursor: pointer;
    }
`;
