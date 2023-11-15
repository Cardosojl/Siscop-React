import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkStyled = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryText};
    &:hover {
        color: ${({ theme }) => theme.colors.lightGrayText};
    }
`;
