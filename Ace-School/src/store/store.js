import authReducer from '@/features/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import inboxReducer from '@/features/inboxSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        inbox : inboxReducer,
        // add more slices here
    },
});
