import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Process, ProcessState, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleForm, handleProcess } from './ProcessStatusFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { Window } from 'src/components/Window';
import { FormField } from 'src/components/FormField';
import { Select } from 'src/components/Select';
import { Button } from 'src/components/Button';
import { setInputs } from '../elementsCreator';
import Title from 'src/components/Title';

function ProcessStatus({ user, dispatchUser, path }: SimpleView): JSX.Element {
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
            handleErros(error as Error, dispatchUser, throwError);
        }
    };

    useEffect(() => {
        handleProcess(path as string, user, url)
            .then((data) => {
                setProcess(data);
                setForm((current) => ({ ...current, process: data._id, user: user._id }));
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    return (
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
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessStatus);
