import React, { useState } from 'react';
import DataContext, { dataUser } from './data/DataContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { theme } from './styles/Theme';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/content/Content';
import Header from './components/common/header/Header';
import LeftBar from './components/common/leftBar/LeftBar';
import { Section, User } from './config/types/types';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { Wrapper } from './components/common/Wrapper';

function App() {
    const [user, setUser] = useState<User<string, Section>>(dataUser.user);
    dataUser.setUser = setUser;
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
