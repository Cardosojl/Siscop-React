import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { SectionTypes, UserTypes } from 'src/apis/types';
import { handleForm, handleSections } from './RegisterUserFunction';
import useAsyncError from 'src/hooks/useAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { setInputs } from 'src/pages/PagesFunctions';
import { Select } from 'src/components/Select/index';
import { FormField } from 'src/components/Form/FormField/index';
import { Window } from 'src/components/Wrapper/Window/index';
import { Button } from 'src/components/Button/index';
import { Title } from 'src/components/Title/index';
import { InputForm } from 'src/components/Form/InputForm/index';
import UserContext from 'src/context/UserContext';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function RegisterUser(): JSX.Element {
    const { setUser } = useContext(UserContext);
    const [sections, setSections] = useState<SectionTypes[] | null>(null);
    const [form, setForm] = useState<Partial<UserTypes>>({});
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
        <LayoutDefault>
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
        </LayoutDefault>
    );
}

export default RegisterUser;
