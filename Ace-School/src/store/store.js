import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import inboxReducer from '@/features/inboxSlice'
import noticeReducer from "@/features/noticeSlice"
import { persistStore, persistReducer, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    inbox: inboxReducer,
    notice: noticeReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer
});
export const persistor = persistStore(store);
