import axios from 'axios';
import React, { ReactNode, createElement } from 'react';
import { Link } from 'react-router-dom';
import { siscopIndex } from 'src/apis/siscopDB';
import { DispatchUser, ObjFilter, Process, TableType, User, Year } from 'src/config/types/types';

async function IndexYears(): Promise<Year[]> {
    const response = (await siscopIndex('years', 0, 0, 0, { sort: '1' })) as Year[];
    return response;
}

async function IndexProcesses(path: string, limit: number, index: number, user: User, filter: ObjFilter | null): Promise<Process[]> {
    const response: Process[] = [];
    if (path === 'myProcess') response.push(...((await siscopIndex('processes', limit, index, 0, { user: user._id }, filter)) as Process[]));
    if (path === 'receivedProcess')
        response.push(...((await siscopIndex('processes', limit, index, 0, { receiver: user._id, section: user.section }, filter)) as Process[]));
    if (path === 'doneProcess') response.push(...((await siscopIndex('processes', limit, index, [], { sender: user._id }, filter)) as Process[]));
    return response;
}

export async function handleYears(): Promise<string[]> {
    const years = (await IndexYears()).map((element) => element.year as string);
    return years;
}

export async function handleProcesses(path: string, limit: number, index: number, user: User, filter: ObjFilter | null): Promise<TableType> {
    //alterar
    const processes = await IndexProcesses(path, limit, index, user, filter);
    const table = {
        head: null,
        body: handleArrayProcesses(path, processes),
    };
    return table;
}

export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction, setProcesses?: CallableFunction): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        if (error.response?.status === 404 && setProcesses) setProcesses(null);
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}

export function handleArrayProcesses(path: string, processes: Process[]): ReactNode {
    if (path === 'myProcess' || path === 'receivedProcess') return generateMyProcess(processes, path);
    if (path === 'doneProcess') return generateDonedProcess(processes);
    else return <></>;
}

export function generateMyProcess(processes: Process[], path: string): ReactNode {
    const href = (path: string) => {
        if (path === 'myProcess') return `/meusProcessos/processo/`;
        if (path === 'receivedProcess') return `/processosRecebidos/processo/`;
        else return '/null/';
    };
    const body = processes.map((element, index) => (
        <tr key={index}>
            <td className="col-9">
                <Link to={`${href(path)}${element._id}`} className="Table__link">
                    <p className="Table__textP">{element.title}</p>
                    <small>{element.date}</small>
                </Link>
            </td>
            <td className="col-1">
                <button key={2} type="submit" value="editar" className="Button--green col-1">
                    Editar
                </button>
            </td>
            <td className="col-1">
                <button key={3} type="submit" value="anotação" className="Button--green col-1">
                    Anotação
                </button>
            </td>
            <td className="col-1">
                <button key={4} type="submit" value="deletar" className="Button--red col-1">
                    Deletar
                </button>
            </td>
        </tr>
    ));
    return <tbody>{body}</tbody>;
}

function generateDonedProcess(processes: Process[]): ReactNode {
    const body = processes.map((element, index) => (
        <tr key={index}>
            <td className="col-11">
                <p>{element.title}</p>
                <small>{element.date}</small>
            </td>
            <td className="col-1">
                <button key={4} type="submit" value="retificar" className="Button--red col-1">
                    Retificar
                </button>
            </td>
        </tr>
    ));
    return <tbody>{body}</tbody>;
}

export function createE(type: string, props: Record<string, string>) {
    const element = createElement(type, props);
    return element;
}
