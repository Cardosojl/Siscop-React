import React, { ReactNode } from 'react';
import { siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { Wrapper } from 'src/components/Wrapper/Wrapper/index';
import { File } from 'src/components/File/File/index';
import { StatusBlock } from 'src/components/StatusBlock/StatusBlock/index';
import { FileTypes, ProcessTypes, ProcessStateTypes, SectionTypes } from 'src/apis/types';

export async function handleProcess(parameter: Partial<ProcessTypes>): Promise<ProcessTypes | null> {
    const process = await siscopShow('processes/process', ['origin'], parameter);
    const { response }: { response: ProcessTypes | null } = process.data;
    return response;
}

export async function handleFiles(processId: string): Promise<FileTypes[] | null> {
    const files = await siscopIndex('files', 0, 0, 0, { process: processId, select: '-file' });
    const { response }: { response: FileTypes[] | null } = files.data;
    return response;
}

export async function handleStates(processId: string): Promise<ProcessStateTypes[] | null> {
    const states = await siscopIndex('processstates', 0, 0, 0, { process: processId });
    const { response }: { response: ProcessStateTypes[] | null } = states.data;
    return response;
}

export function generateContent(process: ProcessTypes | null): ReactNode {
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
                    <p>{(process?.origin as SectionTypes).name}</p>
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
                <File name={`${element.filename}${element.extension}`} id={element._id} />
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

export function generateStates(states: ProcessStateTypes[] | null): ReactNode {
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
