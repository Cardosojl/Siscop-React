import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { siscopDelete, siscopShow } from 'src/apis/siscopDB';
import { Process, Section, User } from 'src/config/types/types';

async function validationEvents(path: string, processId: string, user: User<string, Section>): Promise<boolean> {
    let error = false;
    if (path === 'myProcess') {
        const process = (await siscopShow('processes', 0, { user: user._id, _id: processId })).data.response;
        if (!process) error = true;
    } else if (path === 'receivedProcess') {
        const process = (await siscopShow('processes', 0, { receiver: user._id, section: user.section._id, _id: processId })).data.response;
        if (!process) error = true;
    }
    //else if (path === 'doneProcess') await siscopDelete('processes', { sender: user._id });
    return error;
}

function generateContent(element: Process, setListener: CallableFunction, path: string) {
    const href = setHref(path);
    return (
        <tr>
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
                <button key={4} value="deletar" className="Button--red col-1" onClick={() => setListener('delete')}>
                    Deletar
                </button>
            </td>
        </tr>
    );
}

function generateDelete(element: Process, setListener: CallableFunction) {
    return (
        <tr className="Table__tr--red">
            <td colSpan={4}>
                <p className="Table__item__text ">{`Tem certeza que deseja apagar o processo: "${element.title}"`}</p>
                <button type="submit" value="deletar" onClick={() => setListener('deleteItem')} className="Button--green">
                    Ok
                </button>
                <button type="submit" value="cancel" onClick={() => setListener('')} className="Button--red">
                    Cancelar
                </button>
            </td>
        </tr>
    );
}

function generateLoading() {
    return (
        <tr className="Table__tr--load">
            <td colSpan={4}>
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </td>
        </tr>
    );
}

function setHref(path: string): string {
    if (path === 'myProcess') return `/meusProcessos/processo/`;
    else if (path === 'receivedProcess') return `/processosRecebidos/processo/`;
    else return '/null/';
}

export function generateBody(listenerState: [string, Dispatch<SetStateAction<string>>], element: Process | undefined, path: string) {
    const [listener, setListener] = listenerState;
    if (listener === 'delete' && element) return generateDelete(element, setListener);
    else if (listener == '' && !element) return '';
    else if (listener === '' && element) return generateContent(element, setListener, path);
    else return generateLoading();
}

// eslint-disable-next-line prettier/prettier
export async function handleEvents(listenerState: [string, Dispatch<SetStateAction<string>>], element: Process, path: string, user: User<string, Section>, setRefresh: CallableFunction) {
    const [listener, setListener] = listenerState;

    if (listener === 'deleteItem') {
        try {
            await handleDeleteProcess(path, element._id, user);
            setListener('');
            setRefresh(true);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export async function handleDeleteProcess(path: string, processId: string, user: User<string, Section>) {
    if (!(await validationEvents(path, processId, user))) {
        await siscopDelete('processes', { _id: processId });
    }
    //else if (path === 'doneProcess') await siscopDelete('processes', { sender: user._id });
}
