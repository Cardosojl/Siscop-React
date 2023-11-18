import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { Section, User } from 'src/config/types/types';
import { handleForm, handleSections } from './RegisterUserFunction';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { setInputs } from '../elementsCreator';
import { Select } from 'src/components/Select';
import { FormField } from 'src/components/FormField';
import { Window } from 'src/components/Window';
import { Button } from 'src/components/Button';
import Title from 'src/components/Title';
import { InputForm } from 'src/components/InputForm';
import DataContext from 'src/data/DataContext';

function RegisterUser(): JSX.Element {
    const { setUser } = useContext(DataContext);
    const [sections, setSections] = useState<Section[] | null>(null);
    const [form, setForm] = useState<Partial<User>>({});
    const [message, setMessage] = useState<ReactNode>('');
    const sectionArray = sections ? sections.map((element) => element.name) : [];
    const sectionArrayID = sections ? sections.map((element) => element._id) : [];
    const level = Array.from({ length: 10 }, (_, index) => `${index + 1}`);
    const throwError = useAsyncError();

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, setMessage, sections);
        } catch (error) {
            handleErros(error as Error, setUser, throwError, setMessage);
        }
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);

    useEffect(() => {
        handleSections()
            .then((data) => {
                setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, setUser, throwError);
            });
    }, []);

    return (
        <Window $small>
            <Title title="Cadastrar Usuário" />
            <hr />
            <form onSubmit={sendForm}>
                {message}
                <FormField label="Nome:">
                    <InputForm $small type="text" name="name" value={form.name} onChange={handleInput} />
                </FormField>
                <FormField label="Senha:">
                    <InputForm $small type="password" name="password" value={form.password} onChange={handleInput} />
                </FormField>
                <FormField label="Seção:">
                    <Select name="section" sort={true} optionValues={sectionArray} elementValue="" alternativeValues={sectionArrayID} onChange={handleInput} />
                </FormField>
                <FormField label="Level:">
                    <Select name="level" sort={false} optionValues={level} elementValue="" onChange={handleInput} />
                </FormField>
                <Button $green>Cadastrar</Button>
            </form>
        </Window>
    );
}

export default RegisterUser;
