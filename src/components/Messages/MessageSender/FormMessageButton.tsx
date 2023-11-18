import React, { FormEventHandler } from 'react';
import styled from 'styled-components';
import { Button } from '../../common/Button';

const FormMessageStyle = styled.form`
    padding: 20px 45px 0px 45px;
    border-left: solid 1.5px ${({ theme }) => theme.colors.gray};
`;

const ButtonMessageStyle = styled(Button)`
    padding: 10px;
    margin-top: 25px;
    font-weight: bolder;
`;

export function FormMessageButton({ onSubmit }: { onSubmit: FormEventHandler }): JSX.Element {
    return (
        <>
            <FormMessageStyle onSubmit={onSubmit}>
                <ButtonMessageStyle $blue>Enviar</ButtonMessageStyle>
            </FormMessageStyle>
        </>
    );
}
