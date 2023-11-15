import React, { ReactNode } from 'react';
import { siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { Wrapper } from 'src/components/Wrapper';
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
                <Wrapper $spaceRight="15px" $paddingLeft="15px" $displayFlex="flex-start" $aling="baseline">
                    <h6>Nup:</h6>
                    <p>{process.nup}</p>
                </Wrapper>
                <Wrapper $spaceRight="15px" $paddingLeft="15px" $displayFlex="flex-start" $aling="baseline">
                    <h6>Forma de Aquisição:</h6>
                    <p>{process.category}</p>
                </Wrapper>
                <Wrapper $spaceRight="15px" $paddingLeft="15px" $displayFlex="flex-start" $aling="baseline">
                    <h6>Origem:</h6>
                    <p>{(process?.origin as Section).name}</p>
                </Wrapper>
                <Wrapper $spaceRight="15px" $paddingLeft="15px" $displayFlex="flex-start" $aling="baseline">
                    <h6>Data de Inicio:</h6>
                    <p>{process?.date || ''}</p>
                </Wrapper>
                <hr />
                <Wrapper $spaceRight="15px" $paddingLeft="15px" $aling="baseline">
                    <h6>Descrição:</h6>
                    <div>
                        <p>{process?.description || ''}</p>
                    </div>
                </Wrapper>
            </>
        );
    } else return '';
}

export function generateFiles(files: FileTypes[] | null): ReactNode {
    if (files) {
        const file = files.map((element, index) => (
            <Wrapper key={index} $paddingTop="3px" $paddingLeft="16px">
                <FileComponent name={`${element.filename}${element.extension}`} id={element._id} />
            </Wrapper>
        ));
        return (
            <>
                <Wrapper $paddingLeft="15px">
                    <h6>Documentos:</h6>
                    {file}
                </Wrapper>
            </>
        );
    } else {
        return (
            <>
                <Wrapper $paddingLeft="15px">
                    <h6>Documentos:</h6>
                    <div>
                        <p>Nenhum arquivo carregado neste processo</p>
                    </div>
                </Wrapper>
            </>
        );
    }
}

export function generateStates(states: ProcessState[] | null): ReactNode {
    if (states) {
        const state = states.map((element, index) => <StatusBlock key={index} processState={element} />);
        return (
            <>
                <h5>Anotações:</h5>
                {state}
            </>
        );
    } else return '';
}
