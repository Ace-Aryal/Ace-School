import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inbox: []
};

const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        setInbox(state, action) {
            state.inbox = action.payload;
        },
        deleteInbox(state, action) {
            state.inbox = state.inbox.filter(message => message.id !== action.payload)
        },
        setLoggedIn(state) {
            state.user.isLoggedIn = true
        }
    },
});

export const { setUser, clearUser, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
