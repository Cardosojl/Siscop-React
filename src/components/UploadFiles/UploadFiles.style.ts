import styled from 'styled-components';

export const LabelButtonStyle = styled.label`
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.green};
    border: 0px;
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 12.5px;
    margin: 10px;
    width: fit-content;
    height: fit-content;
    text-decoration: none;

    &:hover {
        background-color: ${({ theme }) => theme.colors.lightGreen};
    }
`;

export const SpanInputStyle = styled.span`
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    background-color: ${({ theme }) => theme.colors.inputBackground};
    min-width: 250px;
    padding: 4px 4px 20px 4px;
    height: 21px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.inputText};
`;

export const InputStyle = styled.input`
    display: none;
`;
