import React, { ReactNode } from 'react';
import { AxiosResponse } from 'axios';
import { siscopDelete, siscopIndex } from 'src/apis/siscopDB';
import ProcessItem from 'src/components/processItem/ProcessItem';
import { ObjFilter, Process, Section, SiscopApiIndex, TableType, User, Year } from 'src/config/types/types';
import { IndexSelector } from 'src/components/indexSelector/IndexSelector';

export function generateIndex(elements: SiscopApiIndex | null, filter: ObjFilter, setFilter: CallableFunction): ReactNode {
    return elements?.map((element, index) => <IndexSelector key={index} index={(element as Year).year as string} value={(element as Year).year as string} setFilter={setFilter} filter={filter} />);
}

export async function handleYears(): Promise<Year[] | null> {
    const years = await siscopIndex('years', 0, 0, 0, { sort: '1' });
    const { response }: { response: Year[] | null } = years.data;
    return response;
}

export async function handleProcesses(path: string, limit: number, index: number, user: User<string, Section>, filter: ObjFilter | null): Promise<Process[] | null> {
    let process: AxiosResponse;
    if (path === 'myProcess') process = await siscopIndex('processes', limit, index, 0, { user: user._id }, filter);
    else if (path === 'receivedProcess') process = await siscopIndex('processes', limit, index, 0, { receiver: user._id, section: user.section._id }, filter);
    //else if (path === 'doneProcess') process = await siscopIndex('processes', limit, index, [], { sender: user._id }, filter);
    else return null;
    const { response }: { response: Process[] | null } = process.data;
    return response;
}

export async function handleDeleteProcess(path: string, processId: string, user: User<string, Section>) {
    if (path === 'myProcess') await siscopDelete('processes', { user: user._id, _id: processId });
    else if (path === 'receivedProcess') await siscopDelete('processes', { receiver: user._id, section: user.section._id });
}

function handleArrayProcesses(path: string, processes: Process[] | null, listener: CallableFunction): ReactNode {
    if (path === 'myProcess' || path === 'receivedProcess') return generateMyProcess(processes, path, listener);
    else if (path === 'doneProcess') return generateDonedProcess(processes);
    else return <></>;
}

function generateMyProcess(processes: Process[] | null, path: string, setRefresh: CallableFunction): ReactNode {
    const body = processes ? processes.map((element, index) => <ProcessItem key={index} path={path} element={element} setRefresh={setRefresh} />) : processes;
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

export function handleUrl(path: string): string {
    if (path === 'myProcess') return `meusProcessos`;
    else if (path === 'receivedProcess') return `processosRecebidos`;
    else return '/null/';
}

export function handleProcessesTable(path: string, processes: Process[] | null, listener: CallableFunction): TableType {
    const table = {
        head: null,
        body: handleArrayProcesses(path, processes, listener),
    };
    return table;
}
