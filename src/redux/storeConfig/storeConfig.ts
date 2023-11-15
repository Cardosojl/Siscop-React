import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from 'src/redux/reducers/users';

const reducer = { user: userReducer };
const rootReducer = combineReducers(reducer);

const persistConfig = {
    key: 'siscop',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer, middleware: [thunk] });
export const persistor = persistStore(store);
