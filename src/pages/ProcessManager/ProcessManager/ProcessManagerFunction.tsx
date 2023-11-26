import React, { ReactNode } from 'react';
import { siscopIndex } from 'src/apis/siscopDB';
import { IndexSelector } from 'src/components/IndexSelector/index';
import { PageSelector } from 'src/components/PageSelector/index';
import { ProcessManagerItem } from '../components/Table/ProcessManagerItem';
import { Th } from 'src/components/Table/Th';
import { FilterTypes, ProcessTypes, SectionTypes, SiscopApiIndex, TableTypes } from 'src/apis/types';

export async function handleSections(): Promise<SectionTypes[] | null> {
    const section = await siscopIndex('sections', 0, 0, 0, { level: 1 });
    let { response }: { response: SectionTypes[] | null } = section.data;
    if (response) {
        response = response.sort((a, b) => a.name.localeCompare(b.name));
    }
    return response;
}

export function generateIndex(elements: SiscopApiIndex | null, filter: FilterTypes, setFilter: CallableFunction): ReactNode {
    return elements?.map((element, index) => (
        <IndexSelector key={index} index={(element as SectionTypes).name as string} value={(element as SectionTypes)._id as string} setFilter={setFilter} filter={filter} />
    ));
}

export async function handleProcesses(limit: number, index: number, parameter: Partial<ProcessTypes>, filter: FilterTypes | null): Promise<ProcessTypes[] | null> {
    const param = Object.values(parameter)[0] ? { ...parameter, aggregate: 'processstates' } : { aggregate: 'processstates' };
    const process = await siscopIndex('processes', limit, index, 0, param, filter);
    const { response }: { response: ProcessTypes[] | null } = process.data;
    return response;
}

export function handleProcessesTable(processes: ProcessTypes[] | null): TableTypes {
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

function handleArrayProcesses(processes: ProcessTypes[] | null): ReactNode {
    const body = processes ? processes.map((element, index) => <ProcessManagerItem key={index} process={element} />) : processes;
    return <tbody>{body}</tbody>;
}

export function generateSectionTitle(select: Partial<ProcessTypes>, sections: SectionTypes[] | null) {
    if (select.origin) {
        return sections ? sections.filter((element) => element._id === select.origin)[0].name : '';
    } else {
        return 'Busca Geral';
    }
}

export function generatePageSelector(itensLimit: number, index: number, section: Partial<ProcessTypes>, filter: Partial<ProcessTypes>, setIndex: CallableFunction, listener: boolean) {
    const objFilter = section.origin ? { ...section, ...filter } : filter;
    return <PageSelector limit={itensLimit} index={index} filter={objFilter} path={'processes'} setChangePage={setIndex} listener={listener} />;
}
