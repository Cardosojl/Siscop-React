import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { Section, SimpleView, User } from 'src/config/types/types';
import { generateBody, handleForm, handleSections } from './RegisterUserFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import './RegisterUser.css';

function RegisterUser({ dispatchUser }: SimpleView): JSX.Element {
    const [sections, setSections] = useState<Section[] | null>(null);
    const [form, setForm] = useState<Partial<User>>({});
    const [errorMessage, setErrorMessage] = useState<ReactNode>('');
    const throwError = useAsyncError();
    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            await handleForm(e, form, setErrorMessage, sections);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError, setErrorMessage);
        }
    };

    useEffect(() => {
        handleSections()
            .then((data) => {
                setSections(data);
            })
            .catch((error) => {
                handleErros(error as Error, dispatchUser, throwError);
            });
    }, []);

    return (
        <div className="SmallWindow container">
            <div className="Window--small">
                <WindowTitle title="Cadastrar Usuário" />
                <hr />
                {errorMessage}
                <form className="Form" onSubmit={sendForm}>
                    {generateBody(sections, form, setForm)}
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
