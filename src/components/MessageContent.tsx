import styled from 'styled-components';

export const MessageContent = styled.div`
    min-height: 300px;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.messageContentText};
    background-color: ${({ theme }) => theme.colors.messageContentBackground};
`;
