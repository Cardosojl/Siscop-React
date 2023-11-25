import React, { useEffect, useState } from 'react';
import DataContext, { dataUser } from './data/DataContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { theme } from './styles/Theme';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/content/Content';
import { Header } from './components/Header/index';
import LeftBar from './components/LeftBar/index';
import { Section, User } from './config/types/types';
import ErrorBoundary from './components/ErrorBoundary';
import { Wrapper } from './components/Wrapper/Wrapper/index';

function App() {
    const [user, setUser] = useState<User<string, Section>>(dataUser.user);
    dataUser.setUser = setUser;

    useEffect(() => {
        const storage = localStorage.getItem('user');
        const localUser = storage ? JSON.parse(storage) : null;
        if (localUser && localUser.logged) {
            setUser(localUser);
        }
    }, []);

    return (
        <DataContext.Provider value={{ user, setUser }}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <BrowserRouter>
                    <ErrorBoundary>
                        <div>
                            <Header />
                            <Wrapper $displayFlex="flex-start">
                                {user.logged ? <LeftBar /> : null}
                                <Content />
                            </Wrapper>
                        </div>
                    </ErrorBoundary>
                </BrowserRouter>
            </ThemeProvider>
        </DataContext.Provider>
    );
}

export default App;
