import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import jobSlice from "./jobSlice.js"
import companySlice from "./companySlice.js"
import applicationSlice from "./applicationSlice.js"
import { createRoot } from 'react-dom/client'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Companies from "@/components/admin/Companies.jsx";
import CompanyCreate from "@/components/admin/CompanyCreate.jsx";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export default store;
