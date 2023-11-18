import React, { ChangeEvent, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Process, ProcessState } from 'src/config/types/types';
import { handleForm, handleProcess } from './ProcessStatusFunction';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/common/Window';
import { FormField } from 'src/components/common/FormField';
import { Select } from 'src/components/common/Select';
import { Button } from 'src/components/common/Button';
import { setInputs } from '../elementsCreator';
import Title from 'src/components/common/Title';
import DataContext from 'src/data/DataContext';
import { DefaultLayout } from 'src/components/common/DefaultLayout';

function ProcessStatus({ path }: { path: string | undefined }): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [url] = useLocation().pathname.split('/').reverse();
    const [process, setProcess] = useState<Partial<Process>>({});
    const [message, setMessage] = useState<ReactNode>();
    const [form, setForm] = useState<Partial<ProcessState<string, string>>>({ anotation: '', state: '' });
    const stateOptions = ['Coletando Orçamentos', 'Em Montagem', 'Montagem Finalizada', 'Em Análise', 'Outro'];
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const sendForm = async (e: FormEvent) => {
        try {
            await handleForm(e, form, setMessage, navigate);
        } catch (error) {
            handleErros(error as Error, setUser, throwError);
        }
    };

    useEffect(() => {
        handleProcess(path as string, user, url)
            .then((data) => {
                setProcess(data);
                setForm((current) => ({ ...current, process: data._id, user: user._id }));
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    return (
        <DefaultLayout>
            <Window $medium>
                <Title title={process.title || ''} />
                <hr />
                <form onSubmit={sendForm}>
                    {message}
                    <FormField label="Anotação:">
                        <textarea name="anotation" value={form.anotation} onChange={handleInput}></textarea>
                    </FormField>
                    <FormField label="Status:">
                        <Select name="state" sort={false} optionValues={stateOptions} elementValue="" onChange={handleInput} />
                    </FormField>
                    <Button $green>Enviar</Button>
                </form>
            </Window>
        </DefaultLayout>
    );
}

export default ProcessStatus;
