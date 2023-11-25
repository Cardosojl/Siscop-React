import React, { ChangeEvent, ReactNode } from 'react';
import { Process } from 'src/config/types/types';

export function setInputs(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setForm: CallableFunction) {
    const { name, value } = e.target;
    setForm((current: Partial<Process>) => ({ ...current, [name]: value ? value : undefined }));
}
