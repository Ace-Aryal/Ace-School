import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import inboxReducer from '@/features/inboxSlice'
import noticeReducer from "@/features/noticeSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedNoticeReducer = persistReducer(persistConfig, noticeReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedInboxReducer = persistReducer(persistConfig, inboxReducer);


export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        inbox: persistedInboxReducer,
        notice: persistedNoticeReducer,
        // add more slices here
    },
});
export const persistor = persistStore(store);
