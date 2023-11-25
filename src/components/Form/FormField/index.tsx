import React from 'react';
import { FormDivStyle } from './FormField.styles';
import { FormFieldProps } from './types';

export function FormField({ label, children }: FormFieldProps): JSX.Element {
    return (
        <>
            <FormDivStyle>
                <label>{label}</label>
                {children}
            </FormDivStyle>
        </>
    );
}
