import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { Section, SimpleView, User } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';
import { connect } from 'react-redux';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import { generateBody, handleFind, handleForm, handleSections } from './ChangeUserFunction';

function ChangeUser({ dispatchUser }: SimpleView): JSX.Element {
    const [user, setUser] = useState<User<string, Section> | null>(null);
    const [sections, setSections] = useState<Section[] | null>(null);
    const [name, setName] = useState<string>('');
    const [form, setForm] = useState<Partial<User>>({});
    const [errorMessage, setErrorMessage] = useState<ReactNode>('');
    const throwError = useAsyncError();

    const findUser = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            handleFind(e, name, setErrorMessage, setUser, setForm);
        } catch (error) {
            handleErros(error as Error, dispatchUser, throwError);
        }
    };

    const sendForm = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            if (user) await handleForm(e, form, setErrorMessage, sections, user);
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
                <WindowTitle title="Alterar Usuário" />
                <hr />
                <form className="Form" onSubmit={findUser}>
                    <div>
                        <label>Nome do Usuário:</label>
                        <input type="text" className="Form--input__small" value={name} onChange={(e) => setName(e.target.value)} />
                        <button className="Button--green">Procurar</button>
                    </div>
                </form>
                {errorMessage}
                <form className="Form" onSubmit={sendForm}>
                    {user ? generateBody(sections, form, setForm, user) : ''}
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUser);
