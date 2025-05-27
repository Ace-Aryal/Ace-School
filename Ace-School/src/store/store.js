import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import inboxReducer from '@/features/inboxSlice'
import noticeReducer from "@/features/noticeSlice"
import loadingReducer from "@/features/loadingStateTrackerSlice"
import {
    persistReducer
} from 'redux-persist';
import storage, {

} from 'redux-persist/lib/storage';



// Optional: transform for inbox if needed



// ⬇️ Individual persist configs
const authPersistConfig = {
    key: 'auth',
    storage,
};

const inboxPersistConfig = {
    key: 'inbox',
    storage,

};

const noticePersistConfig = {
    key: 'notice',
    storage,
};
const loadingPersistConfig = {
    key: 'loading',
    storage,
};
// ⬇️ Combine reducers and wrap each one
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    inbox: persistReducer(inboxPersistConfig, inboxReducer),
    notice: persistReducer(noticePersistConfig, noticeReducer),
    loading: persistReducer(loadingPersistConfig, loadingReducer)
});

// ⬇️ Create store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Optional: suppress serializable warnings
        }),
});
