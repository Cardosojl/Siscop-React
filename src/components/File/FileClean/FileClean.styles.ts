import styled from 'styled-components';

export const FileStyle = styled.div`
    border: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 15px;

    &:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.lightGrayText};
    }
`;

export const TextStyle = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
`;
