import React, { ReactNode } from 'react';
import { siscopIndex } from 'src/apis/siscopDB';
import { IndexSelector } from 'src/components/IndexSelector/index';
import { PageSelector } from 'src/components/PageSelector/index';
import { ProcessManagerItem } from 'src/components/Table/ProcessManagerItem';
import { Th } from 'src/components/Table/Th';
import { ObjFilter, Process, Section, SiscopApiIndex, TableType } from 'src/config/types/types';

export async function handleSections(): Promise<Section[] | null> {
    const section = await siscopIndex('sections', 0, 0, 0, { level: 1 });
    let { response }: { response: Section[] | null } = section.data;
    if (response) {
        response = response.sort((a, b) => a.name.localeCompare(b.name));
    }
    return response;
}

export function generateIndex(elements: SiscopApiIndex | null, filter: ObjFilter, setFilter: CallableFunction): ReactNode {
    return elements?.map((element, index) => (
        <IndexSelector key={index} index={(element as Section).name as string} value={(element as Section)._id as string} setFilter={setFilter} filter={filter} />
    ));
}

export async function handleProcesses(limit: number, index: number, parameter: Partial<Process>, filter: ObjFilter | null): Promise<Process[] | null> {
    const param = Object.values(parameter)[0] ? { ...parameter, aggregate: 'processstates' } : { aggregate: 'processstates' };
    const process = await siscopIndex('processes', limit, index, 0, param, filter);
    const { response }: { response: Process[] | null } = process.data;
    return response;
}

export function handleProcessesTable(processes: Process[] | null): TableType {
    const table = {
        head: createHead(),
        body: handleArrayProcesses(processes),
    };
    return table;
}

function createHead(): ReactNode {
    return (
        <tr>
            <Th $size={5}>Process</Th>
            <Th $size={5}>Forma de Aquisição</Th>
            <Th $size={2}>Status</Th>
        </tr>
    );
}

function handleArrayProcesses(processes: Process[] | null): ReactNode {
    const body = processes ? processes.map((element, index) => <ProcessManagerItem key={index} process={element} />) : processes;
    return <tbody>{body}</tbody>;
}

export function generateSectionTitle(select: Partial<Process>, sections: Section[] | null) {
    if (select.origin) {
        return sections ? sections.filter((element) => element._id === select.origin)[0].name : '';
    } else {
        return 'Busca Geral';
    }
}

export function generatePageSelector(itensLimit: number, index: number, section: Partial<Process>, filter: Partial<Process>, setIndex: CallableFunction, listener: boolean) {
    const objFilter = section.origin ? { ...section, ...filter } : filter;
    return <PageSelector limit={itensLimit} index={index} filter={objFilter} path={'processes'} setChangePage={setIndex} listener={listener} />;
}
