import React, { ReactNode } from 'react';
import { siscopIndex, siscopShow } from 'src/apis/siscopDB';
import { Process, Section, User } from 'src/config/types/types';

export async function handleUsers(user: User): Promise<User[] | null> {
    const users = await siscopIndex('users', 0, 0, 0, { select: '-password' });
    const { response }: { response: User[] | null } = users.data;
    const usersArray = response ? response.filter((element) => element._id !== user._id) : null;
    return usersArray;
}

export async function handleSections(): Promise<Section[] | null> {
    const sections = await siscopIndex('sections', 0, 0, 0);
    const { response }: { response: Section[] | null } = sections.data;
    const sectionsArray = response ? response.filter((element) => element.level !== 10) : null;
    return sectionsArray;
}

export async function handleProcesses(user: User, processId?: string | null): Promise<Process[] | null> {
    if (processId) {
        const process = await siscopShow('processes/process', 0, { _id: processId });
        const { response }: { response: Process } = process.data;
        if (response.user === user._id || response.receiver === user._id) {
            return [response];
        } else {
            return null;
        }
    }
    const processesDone = await siscopIndex('processes', 0, 0, 0, { user: user._id });
    const processesReceived = await siscopIndex('processes', 0, 0, 0, { receiver: user._id });
    const done: Process[] | null = processesDone.data.response;
    const received: Process[] | null = processesReceived.data.response;
    let processArray: Process[] | null = null;
    if (done !== null) processArray = [...done];
    if (received !== null) processArray = processArray ? [...processArray, ...received] : [...received];
    return processArray;
}

export function generateUserSelect(users: User[] | null): ReactNode {
    if (users) {
        const options = users
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((element) => element.name !== 'ADM')
            .map((element, index) => <option key={index} value={`${element._id}`}>{`${element.pg} ${element.name}`}</option>);
        return (
            <>
                <label className="MessageSender__labels">Usuário:</label>
                <select>{options}</select>
            </>
        );
    } else {
        return '';
    }
}

export function generateSectionSelect(section: Section[] | null): ReactNode {
    if (section) {
        const options = section
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((element) => element.name !== 'ADM')
            .map((element, index) => <option key={index} value={`${element._id}`}>{`${element.name}`}</option>);
        return (
            <>
                <label className="MessageSender__labels">Seção:</label>
                <select>{options}</select>
            </>
        );
    } else {
        return '';
    }
}

export function generateProcessSelect(process: Process[] | null, processId?: string | null): ReactNode {
    if (process) {
        if (processId) {
            const options = process
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((element, index) => <option key={index} value={`${element._id}`}>{`${element.title}`}</option>);
            return (
                <>
                    <select>{options}</select>
                </>
            );
        } else {
            const options = process
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((element, index) => <option key={index} value={`${element._id}`}>{`${element.title}`}</option>);
            return (
                <>
                    <select>
                        <option value=""></option>
                        {options}
                    </select>
                </>
            );
        }
    } else {
        return (
            <>
                <label className="MessageSender__labels">Seção:</label>
                <select>
                    <option value=""></option>
                </select>
            </>
        );
    }
}
