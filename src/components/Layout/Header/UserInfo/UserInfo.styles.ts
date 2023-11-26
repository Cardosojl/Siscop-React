import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkStyle = styled(Link)`
    text-decoration: none;
`;

export const TextStyle = styled.p`
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.secondaryText};
    margin-left: 7px;
    font-size: 12px;

    &:hover {
        color: ${({ theme }) => theme.colors.lightGrayText};
    }
`;
