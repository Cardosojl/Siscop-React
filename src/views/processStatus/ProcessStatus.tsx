import React, { FormEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import WindowTitle from 'src/components/windowTitle/WindowTitle';
import { Process, ProcessState, SimpleView } from 'src/config/types/types';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { generateForm, handleForm, handleProcess } from './ProcessStatusFunction';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';
import { handleErros } from 'src/apis/siscopDB';

function ProcessStatus({ user, dispatchUser, path }: SimpleView): JSX.Element {
    const [url] = useLocation().pathname.split('/').reverse();
    const [process, setProcess] = useState<Partial<Process>>({});
    const [errorMessage, setErrorMessage] = useState<string>();
    const [form, setForm] = useState<Partial<ProcessState<string, string>>>({ anotation: '', state: '' });
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const sendForm = async (e: FormEvent) => {
        try {
            await handleForm(e, form, setErrorMessage, navigate);
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
        <div className="MainWindow">
            <div className="Window">
                <WindowTitle title={process.title || ''} />
                <hr />
                <form className="Form" onSubmit={sendForm}>
                    <div>{errorMessage}</div>
                    {generateForm(form, setForm)}
                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessStatus);
