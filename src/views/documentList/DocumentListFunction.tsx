import axios from 'axios';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siscopDelete, siscopIndex, siscopShow } from 'src/apis/siscopDB';
import DocumentItem from 'src/components/documentItem/DocumentItem';
import { DispatchUser, FileTypes, Process, TableType, User } from 'src/config/types/types';

export async function handleProcess(path: string, user: User, processId: string): Promise<Process> {
    const process = await siscopShow('processes/process', 0, { _id: processId, aggregate: 'processstates' });
    const { response }: { response: Process | null } = process.data;
    if (path === 'myProcess' && response && response.user === user._id) return response;
    if (path === 'receivedProcess' && response && (response.receiver === user._id || response.section_receiver === user.section)) return response;
    else throw { isAxiosError: true, response: { data: null, status: 404, statusText: 'Not Found', headers: {} } };
}

export async function handleFiles(process: Process): Promise<FileTypes[] | null> {
    const files = await siscopIndex('files', 0, 0, 0, { process: process._id, select: '-file' });
    const { response }: { response: FileTypes[] | null } = files.data;
    return response;
}

export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction, setProcess?: CallableFunction): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        if (error.response?.status === 404 && setProcess) setProcess(null);
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}

export function handleTableFiles(path: string, files: FileTypes[] | null, setRefresh: CallableFunction): TableType {
    const table = {
        head: null,
        body: handleArrayFile(path, files, setRefresh),
    };
    return table;
}

function handleArrayFile(path: string, files: FileTypes[] | null, setRefresh: CallableFunction): ReactNode {
    if (path === 'myProcess' || path === 'receivedProcess') return generateUnfinished(files, setRefresh);
    if (path === 'doneProcess') return generateDonedProcess(files);
    else return <></>;
}

function generateUnfinished(files: FileTypes[] | null, setRefresh: CallableFunction): ReactNode {
    let body: ReactNode;
    if (files && files.length > 0) {
        body = files.map((element, index) => <DocumentItem setRefresh={setRefresh} element={element} key={index} />);
    } else {
        body = (
            <tr>
                <td>
                    <p className="DocumentList__text">Processo sem documentos</p>
                </td>
            </tr>
        );
    }
    return <tbody className="DocumentList__body">{body}</tbody>;
}

function generateDonedProcess(file: FileTypes[] | null): ReactNode {
    let body: ReactNode;
    if (file && file.length > 0) {
        body = file.map((element, index) => (
            <tr key={index}>
                <td className="col-11">
                    <Link to={``} className="Table__link">
                        <p className="Table__textP">{`${element.filename}${element.extension}`}</p>
                    </Link>
                </td>
                <td className="col-1">
                    <button type="submit" value="retificar" className="Button--red col-1">
                        Retificar
                    </button>
                </td>
            </tr>
        ));
    } else {
        body = (
            <tr>
                <td>
                    <p className="DocumentList__text">Processo sem documentos</p>
                </td>
            </tr>
        );
    }
    return <tbody className="DocumentList__body">{body}</tbody>;
}

export async function handleDelete(id: string) {
    !id || id === '' || id === null ? 0 : await siscopDelete('files', { _id: id });
}
