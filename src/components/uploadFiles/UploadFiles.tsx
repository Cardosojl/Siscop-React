import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import { handleFileForm, handleFilename, setFiles } from './UploadFilesFunction';
import './UploadFiles.css';
import { useLocation } from 'react-router-dom';
import { SimpleView } from 'src/config/types/types';
import useAsyncError from 'src/hooks/useAsyncError/UseAsyncError';

function UploadFiles({ dispatchUser, setRefresh }: SimpleView & { setRefresh: CallableFunction }): JSX.Element {
    const [process] = useLocation().pathname.split('/').reverse();
    const [filename, setFilename] = useState<string>('');
    const [sendComponent, setSendComponent] = useState<ReactNode>('');
    const formStates = useState({ process });
    const [form, setForm] = formStates;
    const [load, setLoad] = useState<ReactNode>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const throwError = useAsyncError();
    const sendForm = (e: ChangeEvent<HTMLFormElement>) => {
        handleFileForm(e, setLoad, setRefresh, dispatchUser, formStates, throwError, setErrorMessage);
    };
    useEffect(() => {
        if (filename) setSendComponent(<input type="submit" className="Button--blue" value="Enviar" />);
        if (!filename) setSendComponent('');
    }, [filename]);

    useEffect(() => {
        if (!form) {
            setForm({ process });
            setFilename('');
            setErrorMessage('');
        }
    }, [form]);
    return (
        <form onSubmit={sendForm}>
            <div className="UploadFiles">
                <label className="Button--green" htmlFor="file">
                    Upload
                </label>
                <div className="UploadFiles__span">{filename}</div>
                <input
                    type="file"
                    id="file"
                    className="UploadFiles__input"
                    onChange={(e) => {
                        setFilename(handleFilename(e.target.value, e.target.files?.length));
                        setForm((current) => ({ ...current, file: setFiles(e.target.files) }));
                    }}
                    multiple
                />
                {load}
            </div>
            <p className="UploadFiles__message">{errorMessage}</p>
            {sendComponent}
        </form>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);
