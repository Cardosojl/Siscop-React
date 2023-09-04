import React, { Dispatch, SetStateAction } from 'react';
import { FileComponent } from '../fileComponent/FileComponent';
import { FileTypes } from 'src/config/types/types';
import { siscopDelete, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { AxiosResponse } from 'axios';

function formValidator(form: Partial<FileTypes>): boolean {
    let error = false;
    if (form.filename === null || form.filename?.trim() === '') {
        error = true;
    }
    return error;
}

function generateContent(filename: Partial<FileTypes>, element: FileTypes, setListener: CallableFunction) {
    return (
        <tr>
            <td className="col-10">
                <FileComponent name={`${filename.filename}${element.extension}`} id={element._id} />
            </td>
            <td className="col-1">
                <button type="submit" value="renomear" onClick={() => setListener('edit')} className="Button--green">
                    Renomear
                </button>
            </td>
            <td className="col-1">
                <button type="submit" value="deletar" onClick={() => setListener('delete')} className="Button--red">
                    Deletar
                </button>
            </td>
        </tr>
    );
}

function generateEdit(value: Partial<FileTypes>, setValue: CallableFunction, setListener: CallableFunction) {
    return (
        <tr className="DocumentItem__tr--green">
            <td colSpan={3}>
                <p className="DocumentItem__text">Renomear:</p>
                <input className="DocumentItem__input" type="text" value={value.filename} onChange={(e) => setValue({ filename: e.target.value })} />
                <button type="submit" value="deletar" onClick={() => setListener('editItem')} className="Button--green col-1">
                    Ok
                </button>
                <button type="submit" value="cancel" onClick={() => setListener('')} className="Button--red col-1">
                    Cancelar
                </button>
            </td>
        </tr>
    );
}

function generateDelete(element: FileTypes, setListener: CallableFunction) {
    return (
        <tr className="DocumentItem__tr--red">
            <td colSpan={3}>
                <p className="DocumentItem__text">{`Tem certeza que deseja apagar o arquivo: "${element.filename + element.extension}"`}</p>
                <button type="submit" value="deletar" onClick={() => setListener('deleteItem')} className="Button--green">
                    Ok
                </button>
                <button type="submit" value="cancel" onClick={() => setListener('')} className="Button--red">
                    Cancelar
                </button>
            </td>
        </tr>
    );
}

function generateLoading() {
    return (
        <tr className="DocumentItem__tr--load">
            <td colSpan={3}>
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </td>
        </tr>
    );
}

async function handleFile(id: string): Promise<FileTypes | null> {
    const file: AxiosResponse = await siscopShow(`files/file`, 0, { _id: id });
    const { response }: { response: FileTypes | null } = file.data;
    return response;
}

async function handleUpdateFile(id: string, form: Partial<FileTypes>): Promise<FileTypes | null> {
    if (!formValidator(form)) {
        await siscopUpdate('files', { _id: id }, form);
        return await handleFile(id);
    } else {
        return await handleFile(id);
    }
}

async function handleDeleteFile(id: string): Promise<void> {
    await siscopDelete('files', { _id: id });
}

export async function handleEvents(
    formState: [Partial<FileTypes>, Dispatch<SetStateAction<Partial<FileTypes>>>],
    listenerState: [string, Dispatch<SetStateAction<string>>],
    setRefresh: CallableFunction,
    element: FileTypes
) {
    const [listener] = listenerState;
    const [form] = formState;

    if (listener === 'editItem') {
        try {
            await handleUpdateFile(element._id, form);
            setRefresh(true);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    } else if (listener === 'deleteItem') {
        try {
            await handleDeleteFile(element._id);
            setRefresh(true);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export function generateBody(
    filenameState: [Partial<FileTypes>, Dispatch<SetStateAction<Partial<FileTypes>>>],
    formState: [Partial<FileTypes>, Dispatch<SetStateAction<Partial<FileTypes>>>],
    listenerState: [string, Dispatch<SetStateAction<string>>],
    element: FileTypes
) {
    const [listener, setListener] = listenerState;
    const [form, setForm] = formState;
    const [filename] = filenameState;
    if (listener === 'edit') return generateEdit(form, setForm, setListener);
    else if (listener === 'delete') return generateDelete(element, setListener);
    else if (listener === '' && Object.keys(filename).length === 0) return '';
    else if (listener === '') return generateContent(filename, element, setListener);
    else return generateLoading();
}
