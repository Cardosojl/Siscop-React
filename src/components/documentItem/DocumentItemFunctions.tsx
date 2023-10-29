import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { FileComponent } from '../fileComponent/FileComponent';
import { FileTypes, Section, User } from 'src/config/types/types';
import { siscopDelete, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { AxiosResponse } from 'axios';

function formValidator(form: Partial<FileTypes>): boolean {
    let error = false;
    if (form.filename === null || form.filename?.trim() === '') {
        error = true;
    }
    return error;
}

async function validationEvents(file: FileTypes, path: string, user: User<string, Section>): Promise<boolean> {
    let error = false;
    if (path === 'myProcess') {
        const process = (await siscopShow('processes', 0, { user: user._id, _id: file.process })).data.response;
        if (!process) error = true;
    } else if (path === 'receivedProcess') {
        const process = (await siscopShow('processes', 0, { receiver: user._id, section: user.section._id, _id: file.process })).data.response;
        if (!process) error = true;
    }
    //else if (path === 'doneProcess') await siscopDelete('processes', { sender: user._id });
    return error;
}

function generateContent(filename: Partial<FileTypes>, element: FileTypes, setListener: CallableFunction, path: string) {
    if (path === 'myProcess' || path === 'receivedProcess') return generateUnfinished(filename, element, setListener);
    if (path === 'doneProcess') return generateDone(filename, element, setListener);
    else return <></>;
}

function generateUnfinished(filename: Partial<FileTypes>, element: FileTypes, setListener: CallableFunction) {
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

function generateDone(filename: Partial<FileTypes>, element: FileTypes, setListener: CallableFunction): ReactNode {
    return (
        <tr>
            <td className="col-11">
                <FileComponent name={`${filename.filename}${element.extension}`} id={element._id} />
            </td>
            <td className="col-1">
                <button type="submit" value="retificar" className="Button--red col-1">
                    Retificar
                </button>
            </td>
        </tr>
    );
}

function generateEdit(value: Partial<FileTypes>, setValue: CallableFunction, setListener: CallableFunction) {
    return (
        <tr className="Table__tr--green">
            <td colSpan={3}>
                <p className="Table__item__text">Renomear:</p>
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
        <tr className="Table__tr--red">
            <td colSpan={3}>
                <p className="Table__item__text">{`Tem certeza que deseja apagar o arquivo: "${element.filename + element.extension}"`}</p>
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
        <tr className="Table__tr--load">
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

export function generateBody(
    filenameState: [Partial<FileTypes>, Dispatch<SetStateAction<Partial<FileTypes>>>],
    formState: [Partial<FileTypes>, Dispatch<SetStateAction<Partial<FileTypes>>>],
    listenerState: [string, Dispatch<SetStateAction<string>>],
    element: FileTypes,
    path: string
) {
    const [listener, setListener] = listenerState;
    const [form, setForm] = formState;
    const [filename] = filenameState;
    if (listener === 'edit') return generateEdit(form, setForm, setListener);
    else if (listener === 'delete') return generateDelete(element, setListener);
    else if (listener === '' && Object.keys(filename).length === 0) return '';
    else if (listener === '') return generateContent(filename, element, setListener, path);
    else return generateLoading();
}

export async function handleEvents(
    formState: [Partial<FileTypes>, Dispatch<SetStateAction<Partial<FileTypes>>>],
    listenerState: [string, Dispatch<SetStateAction<string>>],
    setRefresh: CallableFunction,
    element: FileTypes,
    path: string,
    user: User<string, Section>
) {
    const [listener] = listenerState;
    const [form] = formState;

    if (listener === 'editItem') {
        try {
            await handleUpdateFile(element, form, path, user);
            setRefresh(true);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    } else if (listener === 'deleteItem') {
        try {
            await handleDeleteFile(element, path, user);
            setRefresh(true);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

async function handleFile(id: string): Promise<FileTypes | null> {
    const file: AxiosResponse = await siscopShow(`files/file`, 0, { _id: id });
    const { response }: { response: FileTypes | null } = file.data;
    return response;
}

async function handleUpdateFile(file: FileTypes, form: Partial<FileTypes>, path: string, user: User<string, Section>): Promise<FileTypes | null> {
    if (!(await validationEvents(file, path, user))) {
        if (!formValidator(form)) {
            await siscopUpdate('files', { _id: file._id }, form);
            return await handleFile(file._id);
        }
        return await handleFile(file._id);
    }
    return await handleFile(file._id);
}

async function handleDeleteFile(file: FileTypes, path: string, user: User<string, Section>): Promise<void> {
    if (!(await validationEvents(file, path, user))) {
        await siscopDelete('files', { _id: file._id });
    }
}
