import React, { ReactNode } from 'react';
import styled from 'styled-components';

const FormDivStyle = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: baseline;
    color: ${({ theme }) => theme.colors.primaryText};
`;

export function FormField({ label, children }: { label: string; children: ReactNode }): JSX.Element {
    return (
        <>
            <FormDivStyle>
                <label>{label}</label>
                {children}
            </FormDivStyle>
        </>
    );
}
