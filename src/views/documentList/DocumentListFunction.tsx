import axios from 'axios';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { DispatchUser, File, FilesList, Process, User } from 'src/config/types/types';

async function showProcess(path: string, user: User, processId: string): Promise<Process> {
    const process = (await siscopShow('processes/process', 0, { _id: processId, aggregate: 'processstates' })) as Process;
    if (path === 'myProcess' && process.user === user._id) return process;
    if (path === 'receivedProcess' && (process.receiver === user._id || process.section_receiver === user.section)) return process;
    else throw { isAxiosError: true, response: { data: null, status: 404, statusText: 'Not Found', headers: {} } };
}

async function showFiles(path: string, process: Process): Promise<File[]> {
    return (await siscopIndex('files/file', 0, 0, 0, { process: process._id, select: '-file' })) as File[];
}

export async function handleProcessFiles(path: string, user: User, processId: string): Promise<FilesList> {
    const process = await showProcess(path, user, processId);
    const files = await showFiles(path, process);
    const processFiles: FilesList = { process, files };
    return processFiles;
}

export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction, setProcess?: CallableFunction): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        if (error.response?.status === 404 && setProcess) setProcess(null);
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}
//-------------------------------------------------------------------------------------------------------------------------

/*export async function handleProcesses(path: string, limit: number, index: number, user: User, filter: ObjFilter | null): Promise<TableType> {
    const processes = await IndexProcesses(path, limit, index, user, filter);
    const table = {
        head: null,
        body: handleArrayProcesses(path, processes),
    };
    return table;
}*/

export function handleArrayFile(path: string, files: File[]): ReactNode {
    if (path === 'myProcess' || path === 'receivedProcess') return generateUnfinishedProcess(files, path);
    if (path === 'doneProcess') return generateDonedProcess(files);
    else return <></>;
}

function generateUnfinishedProcess(files: File[], path: string): ReactNode {
    const href = (path: string) => {
        if (path === 'myProcess') return `/meusProcessos/processo/`;
        if (path === 'receivedProcess') return `/processosRecebidos/processo/`;
        else return '/null/';
    };
    const body = files.map((element, index) => (
        <tr key={index}>
            <td className="col-10">
                <Link to={``} className="Table__link">
                    <p className="Table__textP">{`${element.filename}${element.extension}`}</p>
                </Link>
            </td>
            <td className="col-1">
                <button type="submit" value="editar" className="Button--green col-1">
                    Editar
                </button>
            </td>
            <td className="col-1">
                <button type="submit" value="deletar" className="Button--red col-1">
                    Deletar
                </button>
            </td>
        </tr>
    ));
    return <tbody>{body}</tbody>;
}

function generateDonedProcess(file: File[]): ReactNode {
    const body = file.map((element, index) => (
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
    return <tbody>{body}</tbody>;
}
