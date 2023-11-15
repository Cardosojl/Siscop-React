import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './images/logo.png';
import './Header.css';
import { UserRedux } from 'src/config/types/types';
import UserLogged from './userLogged/UserLogged';
import mapStateToProps from 'src/redux/selectors/selectorUsers';

function Header({ user }: UserRedux): JSX.Element {
    const logged = user.logged ? <UserLogged /> : '';
    return (
        <div className="Header">
            <header className="d-flex flex-wrap justify-content-between pt-2 pb-1 Header__bar">
                <Link to="/" className="d-flex align-items-start ms-4 pt-1 link-body-emphasis text-decoration-none">
                    <img src={logo} alt="logo" className="ms-1 Header__logo" />
                    <h3 className="Header__siscoplogo">SisCoP</h3>
                </Link>
                {logged}
            </header>
        </div>
    );
}

export default connect(mapStateToProps)(Header);
