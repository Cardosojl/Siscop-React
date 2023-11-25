import styled from 'styled-components';
import { ButtonStyle } from '../Button.styles';

export const FormMessageStyle = styled.form`
    padding: 20px 45px 0px 45px;
    border-left: solid 1.5px ${({ theme }) => theme.colors.gray};
`;

export const ButtonMessageStyle = styled(ButtonStyle)`
    padding: 10px;
    margin-top: 25px;
    font-weight: bolder;
`;
