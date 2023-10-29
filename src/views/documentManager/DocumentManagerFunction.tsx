import React, { ReactNode } from 'react';
import { siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { FileComponent } from 'src/components/fileComponent/FileComponent';
import StatusBlock from 'src/components/statusBlock/StatusBlock';
import { FileTypes, Process, ProcessState, Section } from 'src/config/types/types';

export async function handleProcess(parameter: Partial<Process>): Promise<Process | null> {
    const process = await siscopShow('processes/process', ['origin'], parameter);
    const { response }: { response: Process | null } = process.data;
    return response;
}

export async function handleFiles(processId: string): Promise<FileTypes[] | null> {
    const files = await siscopIndex('files', 0, 0, 0, { process: processId, select: '-file' });
    const { response }: { response: FileTypes[] | null } = files.data;
    return response;
}

export async function handleStates(processId: string): Promise<ProcessState[] | null> {
    const states = await siscopIndex('processstates', 0, 0, 0, { process: processId });
    const { response }: { response: ProcessState[] | null } = states.data;
    return response;
}

export function generateContent(process: Process | null): ReactNode {
    if (process) {
        return (
            <>
                <div className="DocumentManager__details">
                    <h5 className="DocumentManager__details__topic">Nup:</h5>
                    <p className="DocumentManager__details__text">{process.nup}</p>
                </div>
                <div className="DocumentManager__details">
                    <h5 className="DocumentManager__details__topic">Forma de Aquisição:</h5>
                    <p className="DocumentManager__details__text">{process.category}</p>
                </div>
                <div className="DocumentManager__details">
                    <h5 className="DocumentManager__details__topic">Origem:</h5>
                    <p className="DocumentManager__details__text">{(process?.origin as Section).name}</p>
                </div>
                <div className="DocumentManager__details">
                    <h5 className="DocumentManager__details__topic">Data de Inicio:</h5>
                    <p className="DocumentManager__details__text">{process?.date || ''}</p>
                </div>
                <hr />
                <span className="DocumentManager__details">
                    <h5 className="DocumentManager__details__topic">Descrição:</h5>
                    <div>
                        <p className="DocumentManager__details__text">{process?.description || ''}</p>
                    </div>
                </span>
            </>
        );
    } else return '';
}

export function generateFiles(files: FileTypes[] | null): ReactNode {
    if (files) {
        const file = files.map((element, index) => (
            <div key={index} className="DocumentManager__files">
                <FileComponent name={`${element.filename}${element.extension}`} id={element._id} />
            </div>
        ));
        return (
            <>
                <span className="DocumentManager__details">
                    <h5 className="DocumentManager__details__topic">Documentos:</h5>
                    {file}
                </span>
            </>
        );
    } else {
        return (
            <>
                <span className="DocumentManager__details">
                    <h5 className="DocumentManager__details__topic">Documentos:</h5>
                    <div>
                        <p className="DocumentManager__details__text">Nenhum arquivo carregado neste processo</p>
                    </div>
                </span>
            </>
        );
    }
}

export function generateStates(states: ProcessState[] | null): ReactNode {
    if (states) {
        const state = states.map((element, index) => <StatusBlock key={index} processState={element} />);
        return (
            <>
                <h5 className="DocumentManager__details__topic">Anotações:</h5>
                {state}
            </>
        );
    } else return '';
}
