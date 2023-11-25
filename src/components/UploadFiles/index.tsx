import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { handleFileForm, handleFilename, setFiles } from './UploadFilesServices';
import { useLocation } from 'react-router-dom';
import useAsyncError from 'src/hooks/useAsyncError';
import { Wrapper } from '../Wrapper/Wrapper/index';
import { Button } from '../Button/index';
import DataContext from 'src/data/DataContext';
import { InputStyle, LabelButtonStyle, SpanInputStyle } from './UploadFiles.style';
import { UploadFilesProps } from './types';

export function UploadFiles({ setRefresh }: UploadFilesProps): JSX.Element {
    const { setUser } = useContext(DataContext);
    const [process] = useLocation().pathname.split('/').reverse();
    const [filename, setFilename] = useState<string>('');
    const [sendComponent, setSendComponent] = useState<ReactNode>('');
    const formStates = useState({ process });
    const [form, setForm] = formStates;
    const [load, setLoad] = useState<ReactNode>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const throwError = useAsyncError();

    const sendForm = (e: ChangeEvent<HTMLFormElement>) => {
        handleFileForm(e, setLoad, setRefresh, setUser, formStates, throwError, setErrorMessage);
    };

    useEffect(() => {
        if (filename) setSendComponent(<Button $blue>Enviar</Button>);
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
            <Wrapper $displayFlex="flex-start" $aling="center">
                <LabelButtonStyle htmlFor="file">Upload</LabelButtonStyle>
                <SpanInputStyle>{filename}</SpanInputStyle>
                <InputStyle
                    type="file"
                    id="file"
                    onChange={(e) => {
                        setFilename(handleFilename(e.target.value, e.target.files?.length));
                        setForm((current) => ({ ...current, file: setFiles(e.target.files) }));
                    }}
                    multiple
                />
                {load}
            </Wrapper>
            <Wrapper $paddingLeft="15px">
                <p>{errorMessage}</p>
            </Wrapper>
            {sendComponent}
        </form>
    );
}

UploadFiles;
