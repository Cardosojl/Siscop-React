import styled from 'styled-components';

export const MessageContentStyle = styled.div`
    min-height: 300px;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.messageContentText};
    background-color: ${({ theme }) => theme.colors.messageContentBackground};
`;
