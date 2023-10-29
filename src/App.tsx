import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Content from './components/content/Content';
import Header from './components/header/Header';
import LeftBar from './components/leftBar/LeftBar';
import { RootState, User } from './config/types/types';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

function App(props: User) {
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        setLogged(props.logged);
    }, [props]);
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <div>
                    <Header />
                    <div className="d-flex flex-row">
                        {logged ? <LeftBar /> : null}
                        <Content />
                    </div>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

function mapStateToProps(state: RootState) {
    const { _id, name, pg, section, level, logged } = state.user;
    return { _id, name, pg, section, level, logged };
}

export default connect(mapStateToProps)(App);
