import styled from 'styled-components';

export const InfoWrapperStyle = styled.div`
    background-color: ${({ theme }) => theme.colors.lightGray};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 5px;
    padding-left: 15px;
    padding-top: 15px;
`;
