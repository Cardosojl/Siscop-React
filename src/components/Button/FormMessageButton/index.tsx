import React from 'react';
import { ButtonMessageStyle, FormMessageStyle } from './FormMesssageButton.styles';
import { FormMessageButtonProps } from './types';

export function FormMessageButton({ onSubmit }: FormMessageButtonProps): JSX.Element {
    return (
        <>
            <FormMessageStyle onSubmit={onSubmit}>
                <ButtonMessageStyle $blue>Enviar</ButtonMessageStyle>
            </FormMessageStyle>
        </>
    );
}
