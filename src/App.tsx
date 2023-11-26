import React, { useEffect, useState } from 'react';
import DataContext, { dataUser } from './context/UserContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { theme } from './styles/Theme';
import { BrowserRouter } from 'react-router-dom';
import { SectionTypes, UserTypes } from './apis/types';
import ErrorBoundary from './pages/Error/components/ErrorBoundary';
import { MessageRoutes } from './routes/MessageRoutes';
import { ADMRoutes } from './routes/ADMRoutes';
import { ProcessRoutes } from './routes/ProcessRoutes';
import { ProfileRoutes } from './routes/ProfileRoutes';
import { ProcessManagerRoutes } from './routes/ProcessManagerRoutes';
import { LoginRoutes } from './routes/LoginRoutes';

function App() {
    const [user, setUser] = useState<UserTypes<string, SectionTypes>>(dataUser.user);
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
                        <LoginRoutes />
                        <MessageRoutes />
                        <ADMRoutes />
                        <ProcessRoutes />
                        <ProfileRoutes />
                        <ProcessManagerRoutes />
                    </ErrorBoundary>
                </BrowserRouter>
            </ThemeProvider>
        </DataContext.Provider>
    );
}

export default App;
