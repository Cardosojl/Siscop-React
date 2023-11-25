import React from 'react';
import { InputFormProps } from './types';
import { InputFormStyle } from './InputForm.styles';

export function InputForm({ $small, $medium, $large, value, onChange, type, name }: InputFormProps): JSX.Element {
    const props = { $small, $medium, $large, value, onChange, type, name };
    return <InputFormStyle {...props} />;
}
