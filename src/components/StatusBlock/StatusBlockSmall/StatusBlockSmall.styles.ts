import styled from 'styled-components';

export const DivStatusStyle = styled.div`
    width: 330px;
    background-color: ${({ theme }) => theme.colors.fluorescent};
    color: ${({ theme }) => theme.colors.primaryText};
    padding: 1px 10px 0px 10px;
    height: 100px;
`;

export const TextStatusStyle = styled.p`
    font-weight: bolder;
    margin-bottom: -2px;
`;
