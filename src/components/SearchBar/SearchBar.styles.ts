import styled from 'styled-components';

export const InputStyle = styled.input`
    font-size: 13px;
    border: none;

    &:focus {
        outline: none;
    }
`;

export const SpanStyle = styled.span`
    margin-left: -5px;
    background-color: ${({ theme }) => theme.colors.inputBackground};
    padding-top: 1px;
    padding-bottom: 3px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
`;

export const ImageStyle = styled.img`
    margin-bottom: -7px;
    height: 21px;
    margin-left: -12px;

    &:hover {
        filter: brightness(5);
        cursor: pointer;
    }
`;
