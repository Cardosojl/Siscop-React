import React, { ChangeEvent, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProcessTypes, ProcessStateTypes } from 'src/apis/types';
import { handleForm, handleProcess } from './ProcessStatusFunction';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/Wrapper/Window/index';
import { FormField } from 'src/components/Form/FormField/index';
import { Select } from 'src/components/Select/index';
import { Button } from 'src/components/Button/index';
import { setInputs } from 'src/pages/PagesFunctions';
import { Title } from 'src/components/Title/index';
import UserContext from 'src/context/UserContext';
import { ProcessStatusProps } from './types';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function ProcessStatus({ path }: ProcessStatusProps): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const [url] = useLocation().pathname.split('/').reverse();
    const [process, setProcess] = useState<Partial<ProcessTypes>>({});
    const [message, setMessage] = useState<ReactNode>();
    const [form, setForm] = useState<Partial<ProcessStateTypes<string, string>>>({ anotation: '', state: '' });
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
        <LayoutDefault>
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
        </LayoutDefault>
    );
}

export default ProcessStatus;
