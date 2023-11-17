import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { theme } from './styles/Theme';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Content from './components/content/Content';
import Header from './components/header/Header';
import LeftBar from './components/leftBar/LeftBar';
import { RootState, User } from './config/types/types';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { Wrapper } from './components/Wrapper';

function App(props: User) {
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        setLogged(props.logged);
    }, [props]);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BrowserRouter>
                <ErrorBoundary>
                    <div>
                        <Header />
                        <Wrapper $displayFlex="flex-start">
                            {logged ? <LeftBar /> : null}
                            <Content />
                        </Wrapper>
                    </div>
                </ErrorBoundary>
            </BrowserRouter>
        </ThemeProvider>
    );
}

function mapStateToProps(state: RootState) {
    const { _id, name, section, level, logged } = state.user;
    return { _id, name, section, level, logged };
}

export default connect(mapStateToProps)(App);
