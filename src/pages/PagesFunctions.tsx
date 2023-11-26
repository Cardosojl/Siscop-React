import React, { ChangeEvent } from 'react';
import { ProcessTypes } from 'src/apis/types';

export function setInputs(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setForm: CallableFunction) {
    const { name, value } = e.target;
    setForm((current: Partial<ProcessTypes>) => ({ ...current, [name]: value ? value : undefined }));
}
