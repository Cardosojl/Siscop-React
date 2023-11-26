import React, { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import { FileTypes, SectionTypes, UserTypes } from 'src/apis/types';
import { siscopDelete, siscopShow, siscopUpdate } from 'src/apis/siscopDB';
import { AxiosResponse } from 'axios';
import { Tr } from 'src/components/Table/Tr';
import { Td } from 'src/components/Table/Td';
import { InputForm } from 'src/components/Form/InputForm';
import { Button } from 'src/components/Button';
import { FileClean } from 'src/components/File/FileClean';
import { Loading } from 'src/components/Load';

function formValidator(form: Partial<FileTypes>): boolean {
    let error = false;
    if (form.filename === null || form.filename?.trim() === '') {
        error = true;
    }
    return error;
}

async function validationEvents(file: FileTypes, path: string, user: UserTypes<string, SectionTypes>): Promise<boolean> {
    let error = false;
    if (path === 'myProcess') {
        const process = (await siscopShow('processes', 0, { user: user._id, _id: file.process })).data.response;
        if (!process) error = true;
    } else if (path === 'receivedProcess') {
        const process = (await siscopShow('processes', 0, { receiver: user._id, section: user.section._id, _id: file.process })).data.response;
        if (!process) error = true;
    }
    return error;
}

function generateContent(filename: Partial<FileTypes>, element: FileTypes, setListener: CallableFunction, path: string) {
    if (path === 'myProcess' || path === 'receivedProcess') return generateUnfinished(filename, element, setListener);
    if (path === 'doneProcess') return generateDone(filename, element, setListener);
    else return <></>;
}

function generateUnfinished(filename: Partial<FileTypes>, element: FileTypes, setListener: CallableFunction) {
    return (
        <Tr>
            <Td $size={10}>
                <FileClean name={`${filename.filename}${element.extension}`} id={element._id} />
            </Td>
            <Td $size={1}>
                <Button $green type="submit" value="renomear" onClick={() => setListener('edit')}>
                    Renomear
                </Button>
            </Td>
            <Td $size={1}>
                <Button $red type="submit" value="deletar" onClick={() => setListener('delete')}>
                    Deletar
                </Button>
            </Td>
        </Tr>
    );
}

function generateDone(filename: Partial<FileTypes>, element: FileTypes, setListener: CallableFunction): ReactNode {
    return (
        <Tr>
            <Td $size={11}>
                <FileClean name={`${filename.filename}${element.extension}`} id={element._id} />
            </Td>
            <Td $size={1}>
                <Button $red type="submit" value="retificar">
                    Retificar
                </Button>
            </Td>
        </Tr>
    );
}

function generateEdit(value: Partial<FileTypes>, setValue: CallableFunction, setListener: CallableFunction) {
    return (
        <Tr $edit>
            <Td $size={3} colSpan={3}>
                <p>Renomear:</p>
                <InputForm name="" $medium type="text" value={value.filename} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue({ filename: e.target.value })} />
                <Button $green type="submit" value="deletar" onClick={() => setListener('editItem')}>
                    Ok
                </Button>
                <Button $red type="submit" value="cancel" onClick={() => setListener('')}>
                    Cancelar
                </Button>
            </Td>
        </Tr>
    );
}

function generateDelete(element: FileTypes, setListener: CallableFunction) {
    return (
        <Tr $delete>
            <Td $size={3} colSpan={3}>
                <p>{`Tem certeza que deseja apagar o arquivo: "${element.filename + element.extension}"`}</p>
                <Button $green type="submit" value="deletar" onClick={() => setListener('deleteItem')}>
                    Ok
                </Button>
                <Button $red type="submit" value="cancel" onClick={() => setListener('')}>
                    Cancelar
                </Button>
            </Td>
        </Tr>
    );
}

function generateLoading() {
    return (
        <Tr>
            <Td $size={12} colSpan={12}>
                <Loading />
            </Td>
        </Tr>
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
    user: UserTypes<string, SectionTypes>
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

async function handleUpdateFile(file: FileTypes, form: Partial<FileTypes>, path: string, user: UserTypes<string, SectionTypes>): Promise<FileTypes | null> {
    if (!(await validationEvents(file, path, user))) {
        if (!formValidator(form)) {
            await siscopUpdate('files', { _id: file._id }, form);
            return await handleFile(file._id);
        }
        return await handleFile(file._id);
    }
    return await handleFile(file._id);
}

async function handleDeleteFile(file: FileTypes, path: string, user: UserTypes<string, SectionTypes>): Promise<void> {
    if (!(await validationEvents(file, path, user))) {
        await siscopDelete('files', { _id: file._id });
    }
}
