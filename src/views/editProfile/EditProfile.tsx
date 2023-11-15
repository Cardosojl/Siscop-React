import React, { ChangeEvent, ReactNode, useState } from 'react';
import { connect } from 'react-redux';
import { Profile, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleForm } from './EditProfileFunction';
import { handleErros } from 'src/apis/siscopDB';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { useNavigate } from 'react-router-dom';
import { Window } from 'src/components/Window';
import { FormField } from 'src/components/FormField';
import Title from 'src/components/Title';
import { Button } from 'src/components/Button';
import { setInputs } from '../elementsCreator';
import { InputForm } from 'src/components/InputForm';

function EditProfile({ user, dispatchUser }: SimpleView): JSX.Element {
    const [message, setMessage] = useState<ReactNode>('');
    const [form, setForm] = useState<Partial<Profile>>({});
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setInputs(e, setForm);
    const navigate = useNavigate();
    const throwError = useAsyncError();
    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, user, setMessage, navigate, dispatchUser);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError, setMessage);
        }
    };

    return (
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
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
