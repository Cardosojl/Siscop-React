import axios, { AxiosResponse } from 'axios';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siscopIndex } from 'src/apis/siscopDB';
import { DispatchUser, ObjFilter, Process, TableType, User, Year } from 'src/config/types/types';

export async function handleYears(): Promise<Year[] | null> {
    const years = await siscopIndex('years', 0, 0, 0, { sort: '1' });
    const { response }: { response: Year[] | null } = years.data;
    return response;
}

export async function handleProcesses(path: string, limit: number, index: number, user: User, filter: ObjFilter | null): Promise<Process[] | null> {
    let process: AxiosResponse;
    if (path === 'myProcess') process = await siscopIndex('processes', limit, index, 0, { user: user._id }, filter);
    else if (path === 'receivedProcess') process = await siscopIndex('processes', limit, index, 0, { receiver: user._id, section: user.section }, filter);
    else if (path === 'doneProcess') process = await siscopIndex('processes', limit, index, [], { sender: user._id }, filter);
    else return null;
    const { response }: { response: Process[] | null } = process.data;
    return response;
}

function handleArrayProcesses(path: string, processes: Process[] | null, listener: CallableFunction): ReactNode {
    if (path === 'myProcess' || path === 'receivedProcess') return generateMyProcess(processes, path, listener);
    else if (path === 'doneProcess') return generateDonedProcess(processes);
    else return <></>;
}

function setUrl(path: string): string {
    if (path === 'myProcess') return `/meusProcessos/processo/`;
    else if (path === 'receivedProcess') return `/processosRecebidos/processo/`;
    else return '/null/';
}

function generateMyProcess(processes: Process[] | null, path: string, listener: CallableFunction): ReactNode {
    const href = setUrl(path);
    const deleteEvent = (itemId: string) => listener({ action: 'delete', itemId: itemId });
    const body = processes
        ? processes.map((element, index) => (
              <tr key={index}>
                  <td className="col-9">
                      <Link to={`${href}${element._id}`} className="Table__link">
                          <p className="Table__textP">{element.title}</p>
                          <small>{element.date}</small>
                      </Link>
                  </td>
                  <td className="col-1">
                      <Link to={`${href}editar/${element._id}`}>
                          <button key={2} value="editar" className="Button--green col-1">
                              Editar
                          </button>
                      </Link>
                  </td>
                  <td className="col-1">
                      <Link to={`${href}anotar/${element._id}`}>
                          <button key={3} value="anotação" className="Button--green col-1">
                              Anotação
                          </button>
                      </Link>
                  </td>
                  <td className="col-1">
                      <button key={4} value="deletar" className="Button--red col-1" onClick={() => deleteEvent(element._id)}>
                          Deletar
                      </button>
                  </td>
              </tr>
          ))
        : processes;
    return <tbody>{body}</tbody>;
}

function generateDonedProcess(processes: Process[] | null): ReactNode {
    const body = processes
        ? processes.map((element, index) => (
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
          ))
        : processes;
    return <tbody>{body}</tbody>;
}

export function handleProcessesTable(path: string, processes: Process[] | null, listener: CallableFunction): TableType {
    const table = {
        head: null,
        body: handleArrayProcesses(path, processes, listener),
    };
    return table;
}

export function handleErros(error: Error, dispatchUser: DispatchUser, throwError: CallableFunction): void {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) dispatchUser.logoffRedux();
        else throwError(new Error((error as Error).message));
    } else throwError(new Error((error as Error).message));
}
