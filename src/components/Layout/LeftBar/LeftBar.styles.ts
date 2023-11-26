import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useColorVariation from 'src/hooks/useColorVariation';

export const LeftBarStyle = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    width: 250px;
    background-image: linear-gradient(to right, ${({ theme }) => `${theme.colors.secondary}, ${useColorVariation(theme.colors.secondary, [1, 1, 4])}`});
    background-repeat: repeat-y;
    background-size: auto;
    min-height: 100vh;
    font-size: 13px;
`;

export const LinkStyle = styled(Link)`
    color: ${({ theme }) => theme.colors.secondaryText};
    text-decoration: none;
`;
