import React, { ReactNode } from 'react';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { handleErros } from 'src/apis/siscopDB';
import { uploadCreate } from 'src/apis/siscopUpload';
import { FileTypes } from 'src/apis/types';
import { DefineUserTypes } from 'src/context/types';
import { Loading } from '../Load';

export function handleLoad(): ReactNode {
    return <Loading />;
}

export function handleFilename(value: string, length: number | undefined): string {
    if (length && length > 1) {
        return `${length} arquivos carregados`;
    } else {
        const [name] = value.split('\\').reverse();
        return name;
    }
}

export async function handleFileForm(
    e: FormEvent<HTMLFormElement>,
    setLoad: CallableFunction,
    setRefresh: CallableFunction,
    defineUser: DefineUserTypes,
    formState: [Partial<FileTypes>, CallableFunction],
    throwError: CallableFunction,
    setMessageError: Dispatch<SetStateAction<string>>
): Promise<void> {
    e.preventDefault();
    const [form, setForm] = formState;
    if (!validationForm(form)) {
        setMessageError('Apenas documentos de texto e imagens são suportados');
    } else {
        setLoad(handleLoad());
        try {
            if (form.file && form.file.length === undefined) {
                await uploadCreate('files/oneFile', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            if (form.file && form.file.length > 1) {
                await uploadCreate('files/manyFiles', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            setForm(undefined);
            setRefresh(true);
            setLoad('');
        } catch (error) {
            setLoad('');
            handleErros(error as Error, defineUser, throwError, setMessageError);
        }
    }
}

export function setFiles(uploaded: FileList | null): FileList | File | undefined {
    if (uploaded) {
        return uploaded.length > 1 ? uploaded : uploaded[0];
    }
    return undefined;
}

function validationForm(form: Partial<FileTypes>) {
    const arrayExtension = ['png', 'jpeg', 'jpg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'tar', 'rar', 'zip', 'odt', 'ods', 'txt'];
    if (form.file && form.file.length === undefined) {
        const extension = form.file.name.split('.').reverse()[0].toLowerCase();
        return arrayExtension.includes(extension);
    } else if (form.file && form.file.length > 1) {
        const arra: { name: string }[] = Array.from(form.file);
        return !arra.some((element) => !arrayExtension.includes(element.name.split('.').reverse()[0]));
    } else return false;
}
