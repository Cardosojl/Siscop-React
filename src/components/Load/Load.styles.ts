import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
`;

export const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid ${({ theme }) => theme.colors.green};
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;
