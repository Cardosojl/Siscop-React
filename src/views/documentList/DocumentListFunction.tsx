import React, { ReactNode } from 'react';
import { siscopIndex, siscopShow } from 'src/apis/siscopDB';
import DocumentItem from 'src/components/documentItem/DocumentItem';
import { FileTypes, Process, Section, TableType, User } from 'src/config/types/types';

export async function handleProcess(path: string, user: User<string, Section>, processId: string): Promise<Process> {
    const process = await siscopShow('processes/process', 0, { _id: processId, aggregate: 'processstates' });
    const { response }: { response: Process | null } = process.data;
    if (path === 'myProcess' && response && response.user === user._id) return response;
    if (path === 'receivedProcess' && response && (response.receiver === user._id || response.section_receiver === user.section._id)) return response;
    else throw { statusCode: 404, message: `404 Não Encontrado` };
}

export async function handleFiles(process: Process): Promise<FileTypes[] | null> {
    const files = await siscopIndex('files', 0, 0, 0, { process: process._id, select: '-file' });
    const { response }: { response: FileTypes[] | null } = files.data;
    return response;
}

export function handleTableFiles(path: string, files: FileTypes[] | null, setRefresh: CallableFunction): TableType {
    const table = {
        head: null,
        body: handleDocuments(path, files, setRefresh),
    };
    return table;
}

function handleDocuments(path: string, files: FileTypes[] | null, setRefresh: CallableFunction): ReactNode {
    let body: ReactNode;
    if (files && files.length > 0) {
        body = files.map((element, index) => <DocumentItem setRefresh={setRefresh} element={element} key={index} path={path} />);
    } else {
        body = (
            <tr>
                <td>
                    <p className="DocumentList__text">Processo sem documentos</p>
                </td>
            </tr>
        );
    }
    return <tbody className="DocumentList__body">{body}</tbody>;
}
