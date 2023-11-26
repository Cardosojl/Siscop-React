import React, { ReactNode } from 'react';
import { AxiosResponse } from 'axios';
import { siscopDelete, siscopIndex } from 'src/apis/siscopDB';
import { ProcessItem } from '../components/Table/ProcessItem';
import { FilterTypes, ProcessTypes, SectionTypes, SiscopApiIndex, TableTypes, UserTypes, YearTypes } from 'src/apis/types';
import { IndexSelector } from 'src/components/IndexSelector/index';
import { Tr } from 'src/components/Table/Tr';
import { Td } from 'src/components/Table/Td';
import { Button } from 'src/components/Button/index';

export function generateIndex(elements: SiscopApiIndex | null, filter: FilterTypes, setFilter: CallableFunction): ReactNode {
    return elements?.map((element, index) => (
        <IndexSelector key={index} index={(element as YearTypes).year as string} value={(element as YearTypes).year as string} setFilter={setFilter} filter={filter} />
    ));
}

export async function handleYears(): Promise<YearTypes[] | null> {
    const years = await siscopIndex('years', 0, 0, 0, { sort: '1' });
    const { response }: { response: YearTypes[] | null } = years.data;
    return response;
}

export async function handleProcesses(path: string, limit: number, index: number, user: UserTypes<string, SectionTypes>, filter: FilterTypes | null): Promise<ProcessTypes[] | null> {
    let process: AxiosResponse;
    if (path === 'myProcess') process = await siscopIndex('processes', limit, index, 0, { user: user._id }, filter);
    else if (path === 'receivedProcess') process = await siscopIndex('processes', limit, index, 0, { receiver: user._id, section: user.section._id }, filter);
    else return null;
    const { response }: { response: ProcessTypes[] | null } = process.data;
    return response;
}

export async function handleDeleteProcess(path: string, processId: string, user: UserTypes<string, SectionTypes>) {
    if (path === 'myProcess') await siscopDelete('processes', { user: user._id, _id: processId });
    else if (path === 'receivedProcess') await siscopDelete('processes', { receiver: user._id, section: user.section._id });
}

function handleArrayProcesses(path: string, processes: ProcessTypes[] | null, listener: CallableFunction): ReactNode {
    if (path === 'myProcess' || path === 'receivedProcess') return generateMyProcess(processes, path, listener);
    else if (path === 'doneProcess') return generateDonedProcess(processes);
    else return <></>;
}

function generateMyProcess(processes: ProcessTypes[] | null, path: string, setRefresh: CallableFunction): ReactNode {
    const body = processes ? processes.map((element, index) => <ProcessItem key={index} path={path} element={element} setRefresh={setRefresh} />) : processes;
    return <tbody>{body}</tbody>;
}

function generateDonedProcess(processes: ProcessTypes[] | null): ReactNode {
    const body = processes
        ? processes.map((element, index) => (
              <Tr key={index}>
                  <Td $size={11}>
                      <p>{element.title}</p>
                      <small>{element.date}</small>
                  </Td>
                  <Td $size={1}>
                      <Button $red key={4} type="submit" value="retificar">
                          Retificar
                      </Button>
                  </Td>
              </Tr>
          ))
        : processes;
    return <tbody>{body}</tbody>;
}

export function handleUrl(path: string): string {
    if (path === 'myProcess') return `meusProcessos`;
    else if (path === 'receivedProcess') return `processosRecebidos`;
    else return '/null/';
}

export function handleProcessesTable(path: string, processes: ProcessTypes[] | null, listener: CallableFunction): TableTypes {
    const table = {
        head: null,
        body: handleArrayProcesses(path, processes, listener),
    };
    return table;
}
