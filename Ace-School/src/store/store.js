import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import inboxReducer from '@/features/inboxSlice'
import noticeReducer from "@/features/noticeSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        inbox: inboxReducer,
        notice: noticeReducer,
        // add more slices here
    },
});
