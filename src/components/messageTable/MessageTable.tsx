import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Message, MessageTableType } from 'src/config/types/types';
import useAsyncError from '../useAsyncError/UseAsyncError';
import './MessageTable.css';
import { handleApiMessages, handleErros, handleTableBody, thMessage } from './MessageTableFunctions';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import mapStateToProps from 'src/redux/selectors/selectorUsers';

function MessageTable({ path, limit, index, user, filter, dispatchUser }: MessageTableType): JSX.Element {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [page, setPage] = useState<number>(index);
    const [type, setType] = useState<string>(path);
    const [counter, setCounter] = useState<number>(0);
    const throwError = useAsyncError();

    useEffect(() => {
        setPage(index);
        setType(path);
    }, [index, path]);

    useEffect(() => {
        handleApiMessages(path, limit, index, user, filter)
            .then((data) => setMessages(data))
            .catch((error) => handleErros(error, dispatchUser, throwError, setMessages));
    }, [page, type, filter, counter]);

    return (
        <div className="table-responsive">
            <table className="MessageTable__table table table-borderless table-hover">
                <thead>{thMessage(path)}</thead>
                <tbody>{messages !== null ? handleTableBody(messages, path, setCounter, dispatchUser, throwError) : null}</tbody>
            </table>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTable);
