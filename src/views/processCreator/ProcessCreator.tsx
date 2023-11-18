import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcquisitionWay, Process, Section } from 'src/config/types/types';
import { handleAcquisitionWays, handleForm, handleSections } from './processCreatorFunction';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import { Window } from 'src/components/Window';
import { FormField } from 'src/components/FormField';
import { Select } from 'src/components/Select';
import { setInputs } from '../elementsCreator';
import { Button } from 'src/components/Button';
import Title from 'src/components/Title';
import { InputForm } from 'src/components/InputForm';
import DataContext from 'src/data/DataContext';

function ProcessCreator(): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [sections, setSections] = useState<Section[]>([]);
    const [acquisitionWays, setAcquisition] = useState<AcquisitionWay[]>([]);
    const [form, setForm] = useState<Partial<Process>>({});
    const [message, setMessage] = useState<ReactNode>('');
    const sectionArray = sections.map((element) => element.name);
    const sectionArrayID = sections.map((element) => element._id);
    const acquisitionArray = acquisitionWays.map((element) => element.name);
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, sections, acquisitionWays, setMessage, navigate);
        } catch (error) {
            handleErros(error as Error, setUser, throwError, setMessage);
        }
    };

    useEffect(() => {
        setForm((current) => ({ ...current, user: user._id }));
        handleSections()
            .then((data) => {
                if (data) setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
        handleAcquisitionWays()
            .then((data) => {
                if (data) setAcquisition(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    return (
        <Window $medium>
            <Title title="Novo Processo" />
            <hr />
            <form onSubmit={sendForm}>
                {message}
                <FormField label="Nome:">
                    <InputForm $medium name="title" type="text" value={form.title || ''} onChange={handleInput} />
                </FormField>
                <FormField label="Nup:">
                    <InputForm $medium name="nup" type="text" value={form.nup || ''} onChange={handleInput} />
                </FormField>
                <FormField label="Origem:">
                    <Select name="origin" sort={true} optionValues={sectionArray} elementValue="" alternativeValues={sectionArrayID} onChange={handleInput} />
                </FormField>
                <FormField label="Forma de Aquisição:">
                    <Select name="category" sort={false} optionValues={acquisitionArray} elementValue="" onChange={handleInput} />
                </FormField>
                <FormField label="Descrição:">
                    <textarea name="description" value={form.description || ''} onChange={handleInput} />
                </FormField>
                <Button $green>Enviar</Button>
            </form>
        </Window>
    );
}

export default ProcessCreator;
