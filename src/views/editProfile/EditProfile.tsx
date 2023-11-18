import React, { ChangeEvent, ReactNode, useContext, useState } from 'react';
import { Profile } from 'src/config/types/types';
import { handleForm } from './EditProfileFunction';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import { useNavigate } from 'react-router-dom';
import { Window } from 'src/components/common/Window';
import { FormField } from 'src/components/common/FormField';
import Title from 'src/components/common/Title';
import { Button } from 'src/components/common/Button';
import { setInputs } from '../elementsCreator';
import { InputForm } from 'src/components/common/InputForm';
import DataContext from 'src/data/DataContext';
import { DefaultLayout } from 'src/components/common/DefaultLayout';

function EditProfile(): JSX.Element {
    const { user, setUser } = useContext(DataContext);
    const [message, setMessage] = useState<ReactNode>('');
    const [form, setForm] = useState<Partial<Profile>>({});
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const navigate = useNavigate();
    const throwError = useAsyncError();
    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, user, setMessage, navigate, setUser);
        } catch (error) {
            handleErros(error as Error, setUser, throwError, setMessage);
        }
    };

    return (
        <DefaultLayout>
            <Window $small>
                <Title title="Alterar Senha" />
                <hr />
                <form onSubmit={sendForm}>
                    {message}
                    <FormField label="Senha Atual:">
                        <InputForm name="current" type="password" value={form.current || ''} onChange={handleInput} />
                    </FormField>
                    <FormField label="Senha Nova:">
                        <InputForm name="password" type="password" value={form.password || ''} onChange={handleInput} />
                    </FormField>
                    <FormField label="Repetir Senha:">
                        <InputForm name="confirm" type="password" value={form.confirm || ''} onChange={handleInput} />
                    </FormField>
                    <Button $green>Alterar</Button>
                </form>
            </Window>
        </DefaultLayout>
    );
}

export default EditProfile;
