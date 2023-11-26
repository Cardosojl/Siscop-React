import React, { ChangeEvent, ReactNode, useContext, useState } from 'react';
import { ProfileTypes } from 'src/apis/types';
import { handleForm } from './EditProfileFunction';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError';
import { useNavigate } from 'react-router-dom';
import { Window } from 'src/components/Wrapper/Window/index';
import { FormField } from 'src/components/Form/FormField/index';
import { Title } from 'src/components/Title/index';
import { Button } from 'src/components/Button/index';
import { setInputs } from 'src/pages/PagesFunctions';
import { InputForm } from 'src/components/Form/InputForm/index';
import UserContext from 'src/context/UserContext';
import { LayoutDefault } from 'src/components/Layout/LayoutDefault';

function EditProfile(): JSX.Element {
    const { user, setUser } = useContext(UserContext);
    const [message, setMessage] = useState<ReactNode>('');
    const [form, setForm] = useState<Partial<ProfileTypes>>({});
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
        <LayoutDefault>
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
        </LayoutDefault>
    );
}

export default EditProfile;
