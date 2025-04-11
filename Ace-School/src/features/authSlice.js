import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        isLoggedIn: false
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = {
                isLogginIn: false
            };
        },
        setLoggedIn(state) {
            state.user.isLoggedIn = true
        }
    },
});

export const { setUser, clearUser, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
