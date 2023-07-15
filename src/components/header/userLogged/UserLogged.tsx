import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ReduxUser, User } from 'src/config/types/types';
import '../Header.css';
import mapStateToProps from 'src/redux/selectors/selectorUsers';
import mapDispatchToProps from 'src/redux/actions/actionUsers';
import useAsyncError from 'src/components/useAsyncError/UseAsyncError';
import { siscopLogoffDelete } from 'src/apis/siscopDB';

function UserLogged({ user, dispatchUser }: ReduxUser): JSX.Element {
    const [userOn, setUserOn] = useState<User>(user);
    const throwError = useAsyncError();
    const navigate = useNavigate();

    useEffect(() => {
        setUserOn(user);
    }, [user]);

    const handleLogoff = async (): Promise<void> => {
        try {
            dispatchUser.logoffRedux();
            await siscopLogoffDelete();
            navigate('/');
            setUserOn(user);
        } catch (error) {
            throwError(new Error((error as Error).message));
        }
    };

    return (
        <div className="Header__profile mt-5">
            <Link to="/" className="Header__text mt-2">
                <p>{`${userOn.pg} ${userOn.name}`}</p>
            </Link>
            <p className="Header__text mt-2 ms-3 me-1">|</p>
            <Link to="/" className="Header__text mt-2">
                <p onClick={handleLogoff}>Sair</p>
            </Link>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogged);
